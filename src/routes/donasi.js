const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../lib/prisma');

// GET /api/donasi/program - list donation programs (public)
router.get('/program', async (req, res) => {
  try {
    const { status } = req.query;
    const where = {};
    if (status) where.status = status;

    const programs = await prisma.programDonasi.findMany({
      where,
      orderBy: { createdAt: 'desc' },
      include: { _count: { select: { transaksi: true } } },
    });

    res.json({ success: true, data: programs });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/donasi/program - create program (admin only)
router.post('/program', authenticateToken, async (req, res) => {
  try {
    const body = req.body;
    if (body.target) body.target = parseFloat(body.target);
    if (body.deadline) body.deadline = new Date(body.deadline);

    const program = await prisma.programDonasi.create({ data: body });
    res.status(201).json({ success: true, data: program });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/donasi/program/:id - update program (admin only)
router.put('/program/:id', authenticateToken, async (req, res) => {
  try {
    const body = { ...req.body };
    delete body.id;
    delete body.createdAt;
    delete body.updatedAt;

    if (body.target) body.target = parseFloat(body.target);
    if (body.terkumpul) body.terkumpul = parseFloat(body.terkumpul);
    if (body.deadline) body.deadline = new Date(body.deadline);

    const program = await prisma.programDonasi.update({
      where: { id: req.params.id },
      data: body,
    });

    res.json({ success: true, data: program });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Program donasi tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// DELETE /api/donasi/program/:id - delete program (admin only)
router.delete('/program/:id', authenticateToken, async (req, res) => {
  try {
    await prisma.programDonasi.delete({ where: { id: req.params.id } });
    res.json({ success: true, message: 'Program donasi berhasil dihapus' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Program donasi tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/donasi/transaksi - list transactions (admin only)
router.get('/transaksi', authenticateToken, async (req, res) => {
  try {
    const { programId, status, page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);
    const where = {};
    if (programId) where.programId = programId;
    if (status) where.status = status;

    const [total, data] = await Promise.all([
      prisma.transaksiDonasi.count({ where }),
      prisma.transaksiDonasi.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        include: {
          program: { select: { judul: true } },
          alumni: { select: { namaLengkap: true, nia: true } },
        },
      }),
    ]);

    res.json({
      success: true,
      data,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/donasi/transaksi - create donation transaction (public)
router.post('/transaksi', async (req, res) => {
  try {
    const { programId, alumniId, namaDonatur, nominal, metode } = req.body;

    if (!programId || !nominal) {
      return res.status(400).json({ success: false, message: 'programId dan nominal wajib diisi' });
    }

    const program = await prisma.programDonasi.findUnique({ where: { id: programId } });
    if (!program) {
      return res.status(404).json({ success: false, message: 'Program donasi tidak ditemukan' });
    }
    if (program.status !== 'aktif') {
      return res.status(400).json({ success: false, message: 'Program donasi tidak aktif' });
    }

    const transaksi = await prisma.transaksiDonasi.create({
      data: {
        programId,
        alumniId: alumniId || null,
        namaDonatur: namaDonatur || 'Anonim',
        nominal: parseFloat(nominal),
        metode: metode || 'Transfer Bank',
        status: 'pending',
      },
    });

    res.status(201).json({
      success: true,
      data: transaksi,
      message: 'Donasi berhasil dicatat. Menunggu konfirmasi admin.',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/donasi/transaksi/:id/status - update transaction status (admin only)
router.put('/transaksi/:id/status', authenticateToken, async (req, res) => {
  try {
    const { status } = req.body;
    const validStatuses = ['pending', 'berhasil', 'gagal'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ success: false, message: 'Status tidak valid' });
    }

    const transaksi = await prisma.transaksiDonasi.findUnique({ where: { id: req.params.id } });
    if (!transaksi) {
      return res.status(404).json({ success: false, message: 'Transaksi tidak ditemukan' });
    }

    const updated = await prisma.transaksiDonasi.update({
      where: { id: req.params.id },
      data: { status },
    });

    // Update terkumpul if confirmed
    if (status === 'berhasil' && transaksi.status !== 'berhasil') {
      await prisma.programDonasi.update({
        where: { id: transaksi.programId },
        data: { terkumpul: { increment: transaksi.nominal } },
      });
    } else if (transaksi.status === 'berhasil' && status !== 'berhasil') {
      await prisma.programDonasi.update({
        where: { id: transaksi.programId },
        data: { terkumpul: { decrement: transaksi.nominal } },
      });
    }

    res.json({ success: true, data: updated, message: 'Status transaksi berhasil diupdate' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/donasi/summary - summary stats for dashboard
router.get('/summary', authenticateToken, async (req, res) => {
  try {
    const [programs, transaksiStats] = await Promise.all([
      prisma.programDonasi.findMany({
        include: { _count: { select: { transaksi: true } } },
      }),
      prisma.transaksiDonasi.aggregate({
        _sum: { nominal: true },
        _count: { id: true },
        where: { status: 'berhasil' },
      }),
    ]);

    const totalTerkumpul = programs.reduce((sum, p) => sum + p.terkumpul, 0);
    const totalTarget = programs.reduce((sum, p) => sum + p.target, 0);
    const programAktif = programs.filter((p) => p.status === 'aktif').length;

    const pendingCount = await prisma.transaksiDonasi.count({ where: { status: 'pending' } });

    res.json({
      success: true,
      data: {
        totalTerkumpul,
        totalTarget,
        programAktif,
        totalDonatur: transaksiStats._count.id,
        transaksiPending: pendingCount,
        persentase: totalTarget > 0 ? Math.round((totalTerkumpul / totalTarget) * 100) : 0,
        programs,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
