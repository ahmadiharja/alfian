const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/auth');
const prisma = require('../lib/prisma');

// Helper: groupBy using raw aggregation (SQLite compatible)
async function groupByField(field, whereClause = {}) {
  const results = await prisma.alumni.findMany({
    where: whereClause,
    select: { [field]: true },
  });

  const counts = {};
  for (const r of results) {
    const val = r[field] || 'Tidak Diketahui';
    counts[val] = (counts[val] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count);
}

// GET /api/analytics/sebaran - alumni count by kecamatan & wilayah
router.get('/sebaran', authenticateToken, async (req, res) => {
  try {
    const [byKecamatan, byWilayah] = await Promise.all([
      groupByField('kecamatan'),
      groupByField('wilayah'),
    ]);

    res.json({
      success: true,
      data: { byKecamatan, byWilayah },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/analytics/kampus - alumni count by kampus
router.get('/kampus', authenticateToken, async (req, res) => {
  try {
    const data = await groupByField('kampus');
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/analytics/jurusan - alumni count by jurusan
router.get('/jurusan', authenticateToken, async (req, res) => {
  try {
    const data = await groupByField('jurusan');
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/analytics/pekerjaan - alumni count by pekerjaan
router.get('/pekerjaan', authenticateToken, async (req, res) => {
  try {
    const data = await groupByField('pekerjaanUtama');
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/analytics/angkatan - alumni count by angkatan
router.get('/angkatan', authenticateToken, async (req, res) => {
  try {
    const data = await groupByField('angkatan');
    res.json({ success: true, data });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/analytics/dashboard - all dashboard stats combined
router.get('/dashboard', authenticateToken, async (req, res) => {
  try {
    const [
      totalAlumni,
      alumniVerified,
      alumniPending,
      alumniRejected,
      totalKegiatan,
      kegiatanMendatang,
      programDonasi,
      transaksiDonasi,
      byKecamatan,
      byPekerjaan,
      byKampus,
      byKader,
      recentAlumni,
    ] = await Promise.all([
      prisma.alumni.count(),
      prisma.alumni.count({ where: { statusVerifikasi: 'verified' } }),
      prisma.alumni.count({ where: { statusVerifikasi: 'pending' } }),
      prisma.alumni.count({ where: { statusVerifikasi: 'rejected' } }),
      prisma.kegiatan.count(),
      prisma.kegiatan.count({ where: { status: 'mendatang' } }),
      prisma.programDonasi.findMany({ select: { terkumpul: true, target: true, status: true } }),
      prisma.transaksiDonasi.aggregate({ _sum: { nominal: true }, where: { status: 'berhasil' } }),
      groupByField('kecamatan'),
      groupByField('pekerjaanUtama'),
      groupByField('kampus'),
      groupByField('statusKader'),
      prisma.alumni.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: { id: true, nia: true, namaLengkap: true, kampus: true, createdAt: true, statusVerifikasi: true },
      }),
    ]);

    const totalTerkumpul = programDonasi.reduce((sum, p) => sum + p.terkumpul, 0);
    const totalTarget = programDonasi.reduce((sum, p) => sum + p.target, 0);
    const programAktif = programDonasi.filter((p) => p.status === 'aktif').length;

    res.json({
      success: true,
      data: {
        alumni: {
          total: totalAlumni,
          verified: alumniVerified,
          pending: alumniPending,
          rejected: alumniRejected,
        },
        kegiatan: {
          total: totalKegiatan,
          mendatang: kegiatanMendatang,
        },
        donasi: {
          totalTerkumpul,
          totalTarget,
          programAktif,
          persentase: totalTarget > 0 ? Math.round((totalTerkumpul / totalTarget) * 100) : 0,
        },
        charts: {
          byKecamatan: byKecamatan.slice(0, 10),
          byPekerjaan: byPekerjaan.slice(0, 10),
          byKampus: byKampus.slice(0, 10),
          byKader,
        },
        recentAlumni,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
