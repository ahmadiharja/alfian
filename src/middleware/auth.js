const jwt = require('jsonwebtoken');
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

const authenticateToken = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ success: false, message: 'Token tidak ditemukan' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await prisma.admin.findUnique({ where: { id: decoded.id } });

    if (!admin) {
      return res.status(401).json({ success: false, message: 'Admin tidak ditemukan' });
    }

    req.admin = admin;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: 'Token tidak valid atau sudah kadaluarsa' });
  }
};

module.exports = authenticateToken;
