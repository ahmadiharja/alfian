const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');

const prisma = new PrismaClient();

// GET /api/verifikasi - list pending alumni verifications (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const { status = 'pending', page = 1, limit = 20 } = req.query;
    const skip = (parseInt(page) - 1) * parseInt(limit);

    const where = { statusVerifikasi: status };

    const [total, data] = await Promise.all([
      prisma.alumni.count({ where }),
      prisma.alumni.findMany({
        where,
        skip,
        take: parseInt(limit),
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          nia: true,
          namaLengkap: true,
          noHp: true,
          email: true,
          wilayah: true,
          kecamatan: true,
          kampus: true,
          jurusan: true,
          angkatan: true,
          komisariat: true,
          statusVerifikasi: true,
          dataLengkap: true,
          createdAt: true,
          foto: true,
        },
      }),
    ]);

    const counts = await prisma.alumni.groupBy({
      by: ['statusVerifikasi'],
      _count: { id: true },
    });

    const summary = counts.reduce((acc, c) => {
      acc[c.statusVerifikasi] = c._count.id;
      return acc;
    }, {});

    res.json({
      success: true,
      data,
      meta: { total, page: parseInt(page), limit: parseInt(limit), totalPages: Math.ceil(total / parseInt(limit)) },
      summary,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/verifikasi/:id - get detail for verification (admin only)
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const alumni = await prisma.alumni.findUnique({ where: { id: req.params.id } });
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }
    res.json({ success: true, data: alumni });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/verifikasi/:id/approve - approve alumni (admin only)
router.put('/:id/approve', authenticateToken, async (req, res) => {
  try {
    const alumni = await prisma.alumni.findUnique({ where: { id: req.params.id } });
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }
    if (alumni.statusVerifikasi === 'verified') {
      return res.status(400).json({ success: false, message: 'Alumni sudah diverifikasi' });
    }

    const updated = await prisma.alumni.update({
      where: { id: req.params.id },
      data: {
        statusVerifikasi: 'verified',
        statusAktif: true,
      },
    });

    res.json({
      success: true,
      data: updated,
      message: `Alumni ${alumni.namaLengkap} berhasil diverifikasi`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/verifikasi/:id/reject - reject alumni (admin only)
router.put('/:id/reject', authenticateToken, async (req, res) => {
  try {
    const { alasan } = req.body;

    const alumni = await prisma.alumni.findUnique({ where: { id: req.params.id } });
    if (!alumni) {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }

    const updated = await prisma.alumni.update({
      where: { id: req.params.id },
      data: {
        statusVerifikasi: 'rejected',
        statusAktif: false,
      },
    });

    res.json({
      success: true,
      data: updated,
      message: `Data ${alumni.namaLengkap} ditolak${alasan ? ': ' + alasan : ''}`,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/verifikasi/:id/reset - reset to pending (admin only)
router.put('/:id/reset', authenticateToken, async (req, res) => {
  try {
    const updated = await prisma.alumni.update({
      where: { id: req.params.id },
      data: { statusVerifikasi: 'pending' },
    });
    res.json({ success: true, data: updated, message: 'Status verifikasi direset ke pending' });
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {
      return res.status(404).json({ success: false, message: 'Alumni tidak ditemukan' });
    }
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
