const express = require('express');
const router = express.Router();
const { PrismaClient } = require('@prisma/client');
const authenticateToken = require('../middleware/auth');
const upload = require('../middleware/upload');

const prisma = new PrismaClient();

const SETTINGS_ID = 'settings-main';

async function getOrCreateSettings() {
  let settings = await prisma.pengaturan.findFirst();
  if (!settings) {
    settings = await prisma.pengaturan.create({
      data: {
        id: SETTINGS_ID,
        namaCabang: 'Ikatan Alumni PMII Kediri Raya',
        singkatan: 'IKA-PMII Kediri',
      },
    });
  }
  return settings;
}

// GET /api/pengaturan - get org settings (admin only)
router.get('/', authenticateToken, async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.json({ success: true, data: settings });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// PUT /api/pengaturan - update org settings (admin only)
router.put('/', authenticateToken, async (req, res) => {
  try {
    const body = { ...req.body };
    delete body.id;
    delete body.updatedAt;

    let settings = await prisma.pengaturan.findFirst();

    if (settings) {
      settings = await prisma.pengaturan.update({
        where: { id: settings.id },
        data: body,
      });
    } else {
      settings = await prisma.pengaturan.create({
        data: { id: SETTINGS_ID, ...body },
      });
    }

    res.json({ success: true, data: settings, message: 'Pengaturan berhasil disimpan' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/pengaturan/public - get public org info (no auth)
router.get('/public', async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    // Return only safe public fields
    const publicData = {
      namaCabang: settings.namaCabang,
      singkatan: settings.singkatan,
      emailResmi: settings.emailResmi,
      noTelepon: settings.noTelepon,
      ketuaAktif: settings.ketuaAktif,
      periode: settings.periode,
      logo: settings.logo,
    };
    res.json({ success: true, data: publicData });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// POST /api/pengaturan/logo - upload logo (admin only)
router.post('/logo', authenticateToken, upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'File logo tidak ditemukan' });
    }

    const logoPath = '/uploads/' + req.file.filename;
    let settings = await prisma.pengaturan.findFirst();

    if (settings) {
      settings = await prisma.pengaturan.update({ where: { id: settings.id }, data: { logo: logoPath } });
    } else {
      settings = await prisma.pengaturan.create({ data: { id: SETTINGS_ID, logo: logoPath } });
    }

    res.json({ success: true, data: { logo: settings.logo }, message: 'Logo berhasil diupload' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
