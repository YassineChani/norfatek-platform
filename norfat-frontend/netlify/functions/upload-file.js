/**
 * Netlify Function: upload-file
 * Stores the uploaded file in Netlify Blobs (built-in platform storage).
 * Returns a permanent download URL via the download-file function.
 * No external accounts or services required.
 */
const { getStore } = require('@netlify/blobs');

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

    // Store file in Netlify Blobs — auto-configured when deployed on Netlify
    const store = getStore('norfatek-rfq-files');
    const safeFileName = fileName.replace(/[^\w.-]/g, '_');
    const key = `${Date.now()}-${safeFileName}`;

    const fileBuffer = Buffer.from(base64Content, 'base64');
    await store.set(key, fileBuffer, {
      metadata: { mimeType: mimeType || 'application/octet-stream', fileName }
    });

    // Return download URL pointing to our download function
    const siteUrl = process.env.URL || 'https://norfatek.com';
    const downloadUrl = `${siteUrl}/.netlify/functions/download-file?key=${encodeURIComponent(key)}`;

    return {
      statusCode: 200,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ url: downloadUrl })
    };
  } catch (err) {
    console.error('[Norfatek] upload-file error:', err);
    return {
      statusCode: 500,
      headers: { ...CORS, 'Content-Type': 'application/json' },
      body: JSON.stringify({ error: err.message })
    };
  }
};
