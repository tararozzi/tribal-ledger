const APPS_SCRIPT_EXEC_URL =
  process.env.APPS_SCRIPT_EXEC_URL ||
  'https://script.google.com/macros/s/AKfycbwpfuTz7XgO2j2LQ2emwSbEjyl-g4MvsrLkhjpMDF5GB_budrqUCr32Zr37AXJiZKSk/exec';

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ ok: false, error: 'Method not allowed.' });
  }

  try {
    const response = await fetch(`${APPS_SCRIPT_EXEC_URL}?mode=json`, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body || {})
    });

    const text = await response.text();

    try {
      JSON.parse(text);
    } catch (err) {
      return res.status(502).json({
        ok: false,
        error: `Apps Script did not return JSON. Redeploy the Apps Script web app as a new version and make sure access is set to Anyone. Response started with: ${text.slice(0, 120)}`
      });
    }

    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(response.ok ? 200 : response.status).send(text);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err && err.message ? err.message : 'Unable to reach Apps Script.'
    });
  }
};
