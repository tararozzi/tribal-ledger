const RECAP_VIDEO_SHEET_ = 'RecapVideos';
const RECAP_VIDEO_HEADERS_ = ['Week', 'LinksJson', 'Revision'];

function verifyRecapVideoAdmin_(passcode) {
  if (!['master', 'limited', 'recap'].includes(verifyAdminPasscode(passcode))) throw new Error('Invalid admin passcode.');
}

function recapVideoWeek_(value) {
  const week = Number(value);
  if (!Number.isInteger(week) || week < 1) throw new Error('Enter a valid recap week.');
  return week;
}

function normalizeRecapVideo_(link) {
  if (!link || typeof link !== 'object') throw new Error('Enter a video URL.');
  const url = String(link.url || '').trim();
  // Links only; no embeds, scripts, credentials, or external downloads.
  if (url.length > 2048 || !/^https?:\/\/[a-z0-9](?:[a-z0-9.-]*[a-z0-9])?(?::\d{1,5})?(?:[/?#][^\s<>"\\]*)?$/i.test(url)) {
    throw new Error('Use a complete public HTTP or HTTPS video URL.');
  }
  const title = String(link.title || '').trim();
  const description = String(link.description || '').trim();
  if (title.length > 200 || description.length > 1000) throw new Error('Keep video titles under 200 characters and descriptions under 1,000 characters.');
  return {url, title, description};
}

function readRecapVideoRecords_() {
  const sheet = SpreadsheetApp.getActive().getSheetByName(RECAP_VIDEO_SHEET_);
  if (!sheet) return [];
  const rows = sheet.getDataRange().getValues();
  if (RECAP_VIDEO_HEADERS_.some((header, i) => rows[0][i] !== header)) throw new Error('Video storage headers need review before editing.');
  return rows.slice(1).map((row, i) => ({week: Number(row[0]), json: String(row[1] || '[]'), revision: String(row[2] || ''), row: i + 2}));
}

function parseRecapVideoLinks_(json) {
  try {
    const links = JSON.parse(json);
    if (!Array.isArray(links)) return [];
    return links.flatMap(link => { try { return [normalizeRecapVideo_(link)]; } catch (_) { return []; } });
  } catch (_) { return []; }
}

function getAdminRecapVideos(passcode, week) {
  verifyRecapVideoAdmin_(passcode);
  week = recapVideoWeek_(week);
  const record = readRecapVideoRecords_().filter(row => row.week === week).pop();
  return {week, links: record ? parseRecapVideoLinks_(record.json) : [], revision: record ? record.revision : ''};
}

function adminSaveRecapVideos(passcode, payload) {
  verifyRecapVideoAdmin_(passcode);
  const week = recapVideoWeek_(payload && payload.week);
  if (!Array.isArray(payload.links) || payload.links.length > 20) throw new Error('Add up to 20 video links per recap.');
  const links = payload.links.map(normalizeRecapVideo_);
  const json = JSON.stringify(links);
  if (json.length > 45000) throw new Error('These links are too long. Shorten their URLs or descriptions.');
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const record = readRecapVideoRecords_().filter(row => row.week === week).pop();
    // Treat an identical retry as success, including a response lost after saving.
    if (record && record.json === json) return {ok: true, week, links, revision: record.revision};
    if (String(payload.revision || '') !== (record ? record.revision : '')) throw new Error('These video links changed in another session. Reload the saved links before editing again.');
    const ss = SpreadsheetApp.getActive();
    let sheet = ss.getSheetByName(RECAP_VIDEO_SHEET_);
    if (!sheet) { sheet = ss.insertSheet(RECAP_VIDEO_SHEET_); sheet.appendRow(RECAP_VIDEO_HEADERS_); sheet.setFrozenRows(1); }
    const revision = Utilities.getUuid();
    const values = [week, json, revision];
    if (record) sheet.getRange(record.row, 1, 1, 3).setValues([values]);
    else sheet.appendRow(values);
    logAdminChange51_({action: 'Save Video Links', section: 'Recap', week, newValue: links});
    return {ok: true, week, links, revision};
  } finally { lock.releaseLock(); }
}

function getRecapVideosByWeek_(config, timezone) {
  const byWeek = {};
  readRecapVideoRecords_().forEach(record => {
    if (!Number.isInteger(record.week) || record.week < 1) return;
    if (config && !isEpisodeContentPublishedForWeek_(record.week, config, timezone)) return;
    byWeek[record.week] = parseRecapVideoLinks_(record.json);
  });
  return byWeek;
}
