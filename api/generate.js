import QRCode from 'qrcode';

export default async function handler(req, res) {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing URL parameter' });
  }

  // Validate URL
  try {
    new URL(url);
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      throw new Error('Invalid protocol');
    }
  } catch (err) {
    return res.status(400).json({ error: 'Invalid URL' });
  }

  try {
    // Generate QR code as PNG buffer
    const qrBuffer = await QRCode.toBuffer(url, {
      type: 'image/png',
      width: 300,
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.send(qrBuffer);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
