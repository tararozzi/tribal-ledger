const APPS_SCRIPT_EXEC_URL =
  process.env.APPS_SCRIPT_EXEC_URL ||
  'https://script.google.com/macros/s/AKfycbwXgdouIYuy878sW3dcqGOyTIhBVdoKI-ICo-jCq0tjP_kv10A6XsjS9s8zLuasDmtn/exec';

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
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    return res.status(response.ok ? 200 : response.status).send(text);
  } catch (err) {
    return res.status(500).json({
      ok: false,
      error: err && err.message ? err.message : 'Unable to reach Apps Script.'
    });
  }
};
