const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authenticateToken = require('../middleware/auth');
const prisma = require('../lib/prisma');

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email dan password wajib diisi' });
    }

    const admin = await prisma.admin.findUnique({ where: { email } });
    if (!admin) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Email atau password salah' });
    }

    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );

    res.json({
      success: true,
      message: 'Login berhasil',
      token,
      admin: {
        id: admin.id,
        nama: admin.nama,
        email: admin.email,
        jabatan: admin.jabatan,
        foto: admin.foto,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/auth/logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logout berhasil' });
});

// GET /api/auth/me
router.get('/me', authenticateToken, async (req, res) => {
  try {
    const admin = await prisma.admin.findUnique({
      where: { id: req.admin.id },
      select: { id: true, nama: true, email: true, jabatan: true, foto: true, createdAt: true },
    });
    res.json({ success: true, data: admin });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/auth/me - update admin profile
router.put('/me', authenticateToken, async (req, res) => {
  try {
    const { nama, jabatan } = req.body;
    const updated = await prisma.admin.update({
      where: { id: req.admin.id },
      data: { nama, jabatan },
      select: { id: true, nama: true, email: true, jabatan: true, foto: true },
    });
    res.json({ success: true, data: updated });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/auth/change-password
router.put('/change-password', authenticateToken, async (req, res) => {
  try {
    const { passwordLama, passwordBaru } = req.body;
    const admin = await prisma.admin.findUnique({ where: { id: req.admin.id } });

    const isMatch = await bcrypt.compare(passwordLama, admin.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: 'Password lama tidak sesuai' });
    }

    const hashed = await bcrypt.hash(passwordBaru, 10);
    await prisma.admin.update({ where: { id: req.admin.id }, data: { password: hashed } });

    res.json({ success: true, message: 'Password berhasil diubah' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
