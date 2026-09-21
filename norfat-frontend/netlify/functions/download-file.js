/**
 * Netlify Function: download-file
 * Retrieves a file from Netlify Blobs by key and streams it to the client.
 * This allows the admin to download client-uploaded files with one click.
 */
const { getStore } = require('@netlify/blobs');

exports.handler = async (event) => {
  try {
    const key = event.queryStringParameters?.key;

    if (!key) {
      return { statusCode: 400, body: 'Missing file key' };
    }

    const store = getStore('norfatek-rfq-files');
    const { data, metadata } = await store.getWithMetadata(
      decodeURIComponent(key),
      { type: 'arrayBuffer' }
    );

    if (!data) {
      return { statusCode: 404, body: 'File not found' };
    }

    const mimeType = metadata?.mimeType || 'application/octet-stream';
    const fileName = metadata?.fileName || 'download';

    // Return file as base64 (required by Netlify Functions v1)
    return {
      statusCode: 200,
      headers: {
        'Content-Type': mimeType,
        'Content-Disposition': `attachment; filename="${fileName}"`,
        'Cache-Control': 'private, max-age=86400'
      },
      body: Buffer.from(data).toString('base64'),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error('[Norfatek] download-file error:', err);
    return { statusCode: 500, body: 'Download failed: ' + err.message };
  }
};
