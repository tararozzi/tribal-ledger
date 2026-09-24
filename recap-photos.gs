// Captured Moments uses the existing Photos columns and Drive folder.
const RECAP_PHOTO_MAX_BYTES_ = 3 * 1024 * 1024;
const RECAP_PHOTO_IMPORT_ERROR_ = 'This image could not be imported. Try another image URL or upload the photo directly.';

function verifyPhotoAdmin51_(passcode) {
  const role = verifyAdminPasscode(passcode);
  if (!['master', 'recap'].includes(role)) throw new Error('Admin access for recap photos is required.');
}

function recapPhotoWeek51_(value) {
  const week = Number(value);
  if (!Number.isInteger(week) || week < 1) throw new Error('Enter a valid recap week.');
  return week;
}

function validateRecapImage51_(bytes, mimeType) {
  if (!bytes.length || bytes.length > RECAP_PHOTO_MAX_BYTES_) throw new Error('Each photo must be 3 MB or smaller.');
  const b = i => (bytes[i] & 255);
  const text = (at, count) => Array.from({length: count}, (_, i) => String.fromCharCode(b(at + i))).join('');
  let detected = '';
  if (bytes.length >= 24 && b(0) === 137 && text(1, 3) === 'PNG' && text(12, 4) === 'IHDR') detected = 'image/png';
  else if (bytes.length >= 4 && b(0) === 255 && b(1) === 216 && b(2) === 255) detected = 'image/jpeg';
  else if (bytes.length >= 13 && /^GIF8[79]a$/.test(text(0, 6))) detected = 'image/gif';
  else if (bytes.length >= 20 && text(0, 4) === 'RIFF' && text(8, 4) === 'WEBP' && /^VP8[ LX]$/.test(text(12, 4))) detected = 'image/webp';
  if (!detected || detected !== String(mimeType || '').toLowerCase()) {
    throw new Error('Use a valid JPEG, PNG, GIF, or WebP image.');
  }
  return detected;
}

function validateRecapImageUrl51_(value) {
  const url = String(value || '').trim();
  // Public HTTP(S) domains only: no credentials, IP literals, local hosts, or custom ports.
  const match = url.match(/^(https?):\/\/([a-z0-9.-]+)(?::(80|443))?([/?#][^\s\\]*)?$/i);
  if (!match || url.length > 2048) throw new Error('Use a direct public HTTP or HTTPS image URL.');
  const host = match[2].toLowerCase();
  const labels = host.split('.');
  if (labels.length < 2 || labels.some(label => !/^[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i.test(label)) ||
      !/^[a-z]{2,}$/i.test(labels[labels.length - 1]) ||
      /(?:^|\.)(?:localhost|local|internal|lan|home|test|invalid)$/.test(host) ||
      /^(?:metadata|metadata\.google\.internal)$/.test(host)) {
    throw new Error('Use a direct public image URL.');
  }
  return url.replace(/#.*$/, '');
}

function resolveRecapImageRedirect51_(base, location) {
  const target = String(location || '').trim();
  if (!target) throw new Error('The source returned an invalid redirect.');
  if (/^https?:\/\//i.test(target)) return validateRecapImageUrl51_(target);
  const origin = base.match(/^(https?:)\/\/[^/?#]+/i)[0];
  if (target.startsWith('//')) return validateRecapImageUrl51_(base.split(':')[0] + ':' + target);
  if (target.startsWith('/')) return validateRecapImageUrl51_(origin + target);
  const path = base.split(/[?#]/)[0];
  if (target.startsWith('?')) return validateRecapImageUrl51_(path + target);
  const directory = path.slice(origin.length).replace(/[^/]*$/, '');
  return validateRecapImageUrl51_(origin + (directory || '/') + target);
}

function previewRecapImageUrl(passcode, payload) {
  verifyPhotoAdmin51_(passcode);
  const week = recapPhotoWeek51_(payload && payload.week);
  try {
    let url = validateRecapImageUrl51_(payload.url);
    for (let hop = 0; hop <= 5; hop++) {
      const response = UrlFetchApp.fetch(url, {
        followRedirects: false, muteHttpExceptions: true, validateHttpsCertificates: true,
        headers: {Accept: 'image/jpeg,image/png,image/gif,image/webp'}
      });
      const status = response.getResponseCode();
      const headers = response.getHeaders();
      const header = key => {
        const actual = Object.keys(headers).find(name => name.toLowerCase() === key);
        return actual ? String(headers[actual]) : '';
      };
      if ([301, 302, 303, 307, 308].includes(status)) {
        if (hop === 5) throw new Error('The source redirected too many times.');
        url = resolveRecapImageRedirect51_(url, header('location'));
        continue;
      }
      if ([401, 403].includes(status)) throw new Error('The source requires login or blocks external access.');
      if (status !== 200) throw new Error('The source download failed (HTTP ' + status + ').');
      const mimeType = header('content-type').split(';')[0].trim().toLowerCase();
      if (!/^image\/(jpeg|png|gif|webp)$/.test(mimeType)) throw new Error('The URL does not return a supported image. Use JPEG, PNG, GIF, or WebP.');
      if (Number(header('content-length')) > RECAP_PHOTO_MAX_BYTES_) throw new Error('Each photo must be 3 MB or smaller.');
      const bytes = response.getContent();
      validateRecapImage51_(bytes, mimeType);
      // Return downloaded bytes for decoding/preview. No Drive file or Photos row exists until confirmation.
      return {week, mimeType, fileName: 'imported-photo.' + mimeType.split('/')[1],
        dataUrl: 'data:' + mimeType + ';base64,' + Utilities.base64Encode(bytes), size: bytes.length};
    }
  } catch (err) {
    const detail = String(err && err.message || 'Download failed.');
    const safeDetail = /script\.external_request|permission.*UrlFetchApp/i.test(detail)
      ? 'Image downloads need authorization by the site owner.'
      : /^(Use |The source |The URL |Each photo)/.test(detail) ? detail : 'Download failed.';
    throw new Error(RECAP_PHOTO_IMPORT_ERROR_ + ' ' + safeDetail);
  }
}

function saveRecapPhoto51_(passcode, payload) {
  verifyPhotoAdmin51_(passcode);
  payload = payload || {};
  const week = recapPhotoWeek51_(payload.week);
  const mimeType = String(payload.mimeType || '').toLowerCase();
  const dataUrl = String(payload.dataUrl || '');
  if (dataUrl.length > Math.ceil(RECAP_PHOTO_MAX_BYTES_ / 3) * 4 + 64) throw new Error('Each photo must be 3 MB or smaller.');
  const match = dataUrl.match(/^data:(image\/(?:jpeg|png|gif|webp));base64,([A-Za-z0-9+/]+={0,2})$/);
  if (!match || match[1] !== mimeType) throw new Error('Use a valid JPEG, PNG, GIF, or WebP image.');
  const bytes = Utilities.base64Decode(match[2]);
  validateRecapImage51_(bytes, mimeType);
  const requestId = String(payload.requestId || Utilities.getUuid());
  if (!/^[a-zA-Z0-9-]{16,80}$/.test(requestId)) throw new Error('Invalid photo upload request.');
  const caption = sanitizeHtml51_(String(payload.caption || '').trim());
  const name = String(payload.name || 'Admin').trim();
  const digest = Utilities.base64Encode(Utilities.computeDigest(Utilities.DigestAlgorithm.SHA_256, bytes));
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActive();
    const config = readConfig_(mustGetSheet_(ss, GAME_SHEETS_51.CONFIG));
    const folder = config.PhotoDriveFolderId ? DriveApp.getFolderById(String(config.PhotoDriveFolderId).trim()) : DriveApp.getRootFolder();
    const photoSheet = mustGetSheet_(ss, GAME_SHEETS_51.PHOTOS);
    // A stable per-photo name makes retries safe even if the prior response was lost.
    const storageName = 'recap-photo-' + requestId;
    const matches = folder.getFilesByName(storageName);
    let file = null;
    while (matches.hasNext() && !file) {
      const candidate = matches.next();
      if (!candidate.isTrashed()) file = candidate;
    }
    if (file) {
      let receipt;
      try { receipt = JSON.parse(file.getDescription()); } catch (_) { throw new Error('Upload receipt is invalid. Choose the photo again.'); }
      if (receipt.week !== week || receipt.digest !== digest || receipt.caption !== caption) throw new Error('This upload belongs to a different photo or recap. Choose the photo again.');
      const existing = photoSheet.getDataRange().getValues().slice(1).find(row => String(row[6]) === file.getId());
      if (existing) {
        if (Number(existing[1]) !== week) throw new Error('Photo week does not match.');
        return {ok: true, alreadySaved: true, photoUrl: String(existing[5]), week};
      }
    } else {
      file = folder.createFile(Utilities.newBlob(bytes, mimeType, storageName));
      try {
        file.setDescription(JSON.stringify({week, digest, caption, originalName: sanitizeFileName_(String(payload.fileName || 'photo'))}));
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      } catch (err) {
        try { file.setTrashed(true); } catch (_) {}
        throw new Error('The photo could not be stored for display. Please try again.');
      }
    }
    const photoUrl = 'https://lh3.googleusercontent.com/d/' + file.getId();
    try {
      photoSheet.appendRow([new Date(), week, name, String(payload.email || '').trim(), caption, photoUrl, file.getId(), 'TRUE']);
    } catch (err) {
      // An uncertain append may already have committed. Keep its receipt for a safe retry.
      throw new Error('The photo could not be confirmed. Retry this photo to finish saving it.');
    }
    logAdminChange51_({action: 'Upload Photo', section: 'Recap', record: String(payload.fileName || 'photo'), newValue: 'Photo uploaded', week, player: name});
    return {ok: true, photoUrl, week, message: 'Photo added to Captured Moments.'};
  } finally { lock.releaseLock(); }
}

function getAdminRecapPhotos(passcode, week) {
  verifyPhotoAdmin51_(passcode);
  week = recapPhotoWeek51_(week);
  const rows = mustGetSheet_(SpreadsheetApp.getActive(), GAME_SHEETS_51.PHOTOS).getDataRange().getValues();
  return {week, photos: rows.slice(1).map((row, index) => ({
    rowNumber: index + 2, week: Number(row[1]), caption: sanitizeHtml51_(String(row[4] || '')),
    photoUrl: String(row[5] || ''), removed: String(row[7]).toUpperCase() === 'FALSE'
  })).filter(photo => photo.week === week && photo.photoUrl)};
}

function adminSetRecapPhotoRemoved(passcode, payload) {
  verifyPhotoAdmin51_(passcode);
  const week = recapPhotoWeek51_(payload && payload.week);
  const rowNumber = Number(payload.rowNumber);
  if (!Number.isInteger(rowNumber) || rowNumber < 2 || typeof payload.removed !== 'boolean') throw new Error('Invalid photo selection. Refresh the photo list.');
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const sheet = mustGetSheet_(SpreadsheetApp.getActive(), GAME_SHEETS_51.PHOTOS);
    if (rowNumber > sheet.getLastRow()) throw new Error('Photo no longer exists. Refresh the photo list.');
    const row = sheet.getRange(rowNumber, 1, 1, 8).getValues()[0];
    if (Number(row[1]) !== week || String(row[5]) !== String(payload.photoUrl)) throw new Error('Photo does not match this recap. Refresh the photo list.');
    // Soft deletion keeps Drive files, row identities, captions, and reactions recoverable.
    sheet.getRange(rowNumber, 8).setValue(payload.removed ? 'FALSE' : 'TRUE');
    logAdminChange51_({action: payload.removed ? 'Remove Photo' : 'Restore Photo', section: 'Recap', record: String(row[6] || row[5]), week});
    return {ok: true, week};
  } finally { lock.releaseLock(); }
}
