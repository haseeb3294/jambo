// pages/api/generateQRCode.js

import qr from 'qrcode';
import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
  const { data, filename } = req.body;

  try {
    // Generate QR code as a data URL
    const qrDataUrl = await qr.toDataURL(data);

    // Extract base64 data
    const base64Data = qrDataUrl.replace(/^data:image\/png;base64,/, '');

    // Create folder if not exists
    const folderPath = path.join(process.cwd(), 'public', 'qr');
    if (!fs.existsSync(folderPath)) {
      fs.mkdirSync(folderPath, { recursive: true });
    }

    // Write QR code image to file
    fs.writeFileSync(path.join(folderPath, `${filename}.png`), base64Data, 'base64');

    console.log(`QR code saved successfully at public/qr/${filename}.png`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Error generating QR code:', error);
    res.status(500).json({ success: false, error: 'Error generating QR code' });
  }
}
