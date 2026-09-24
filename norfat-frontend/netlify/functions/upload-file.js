/**
 * Netlify Function: upload-file
 * Uploads file to Catbox.moe (free, permanent, supports up to 200MB, no token required).
 * Returns real permanent CDN download URL (e.g. https://files.catbox.moe/abc123.pdf).
 */
const https = require('https');

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS'
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers: CORS, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers: CORS, body: 'Method Not Allowed' };
  }

  try {
    const { base64Content, mimeType, fileName } = JSON.parse(event.body || '{}');

    if (!base64Content || !fileName) {
      return {
        statusCode: 400,
        headers: { ...CORS, 'Content-Type': 'application/json' },
        body: JSON.stringify({ error: 'Missing file data' })
      };
    }

    const fileBuffer = Buffer.from(base64Content, 'base64');
    const safeFileName = fileName.replace(/[^\w.-]/g, '_');
    const contentType = mimeType || 'application/octet-stream';

    const boundary = '----NorfatekBoundary' + Date.now().toString(16);

    const part1 = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="reqtype"\r\n\r\nfileupload\r\n` +
      `--${boundary}\r\nContent-Disposition: form-data; name="fileToUpload"; filename="${safeFileName}"\r\nContent-Type: ${contentType}\r\n\r\n`
    );
    const part2 = Buffer.from(`\r\n--${boundary}--\r\n`);
    const payload = Buffer.concat([part1, fileBuffer, part2]);

    const catboxUrl = await new Promise((resolve, reject) => {
      const req = https.request(
        'https://catbox.moe/user/api.php',
        {
          method: 'POST',
          headers: {
            'Content-Type': `multipart/form-data; boundary=${boundary}`,
            'Content-Length': payload.length,
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) NorfatekPlatform/1.0'
          },
          timeout: 25000
        },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            const trimmed = data.trim();
            if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
              resolve(trimmed);
            } else {
              reject(new Error('Catbox returned unexpected response: ' + trimmed));
            }
          });
        }
      );

      req.on('error', reject);
      req.on('timeout', () => {
        req.destroy();
        reject(new Error('Upload to storage timed out'));
      });

      req.write(payload);
      req.end();
    });

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: catboxUrl })
    };
  } catch (err) {
    console.error('[Norfatek] upload-file error:', err);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message || 'File upload failed' })
    };
  }
};
