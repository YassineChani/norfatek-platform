/**
 * Netlify Function: upload-file
 * Receives a base64-encoded file from the frontend,
 * uploads it to catbox.moe (free, permanent, no account needed),
 * and returns the public download URL.
 */
exports.handler = async (event) => {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { base64Content, mimeType, fileName } = JSON.parse(event.body);

    if (!base64Content || !fileName) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing file data' }) };
    }

    // Decode base64 to binary buffer
    const fileBuffer = Buffer.from(base64Content, 'base64');

    // Build multipart/form-data body manually (no external deps)
    const boundary = '----NorfatekBoundary' + Date.now().toString(36);
    const CRLF = '\r\n';
    const safeFileName = fileName.replace(/[^\w.-]/g, '_');

    const reqTypePart = Buffer.from(
      `--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="reqtype"${CRLF}${CRLF}` +
      `fileupload${CRLF}`
    );

    const filePartHeader = Buffer.from(
      `--${boundary}${CRLF}` +
      `Content-Disposition: form-data; name="fileToUpload"; filename="${safeFileName}"${CRLF}` +
      `Content-Type: ${mimeType || 'application/octet-stream'}${CRLF}${CRLF}`
    );

    const filePartFooter = Buffer.from(`${CRLF}--${boundary}--${CRLF}`);

    const body = Buffer.concat([reqTypePart, filePartHeader, fileBuffer, filePartFooter]);

    // Upload to catbox.moe — free, permanent, no account
    const response = await fetch('https://catbox.moe/user/api.php', {
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': String(body.length)
      },
      body
    });

    const resultUrl = (await response.text()).trim();

    if (!resultUrl.startsWith('https://')) {
      throw new Error(`Upload failed: ${resultUrl}`);
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ url: resultUrl })
    };

  } catch (err) {
    console.error('Upload error:', err);
    return {
      statusCode: 500,
      headers: { 'Access-Control-Allow-Origin': '*' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
