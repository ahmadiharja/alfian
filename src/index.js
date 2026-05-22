require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));
app.use(express.static(path.join(__dirname, '../public')));

// API routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/alumni', require('./routes/alumni'));
app.use('/api/kegiatan', require('./routes/kegiatan'));
app.use('/api/donasi', require('./routes/donasi'));
app.use('/api/verifikasi', require('./routes/verifikasi'));
app.use('/api/analytics', require('./routes/analytics'));
app.use('/api/pengaturan', require('./routes/pengaturan'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ success: true, message: 'IKA-PMII API running', timestamp: new Date().toISOString() });
});

// Serve frontend for all non-API routes
app.get('*', (req, res) => {
  const indexPath = path.join(__dirname, '../public/index.html');
  const fs = require('fs');
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath);
  } else {
    res.json({
      success: true,
      message: 'IKA-PMII Kediri API Server',
      version: '1.0.0',
      endpoints: {
        auth: '/api/auth',
        alumni: '/api/alumni',
        kegiatan: '/api/kegiatan',
        donasi: '/api/donasi',
        verifikasi: '/api/verifikasi',
        analytics: '/api/analytics',
        pengaturan: '/api/pengaturan',
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`╔════════════════════════════════════════╗`);
  console.log(`║   IKA-PMII Kediri API Server           ║`);
  console.log(`║   Running on http://localhost:${PORT}     ║`);
  console.log(`╚════════════════════════════════════════╝`);
});

module.exports = app;
