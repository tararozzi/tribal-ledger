const APP_SHEETS_51 = {
  CONFIG: GAME_SHEETS_51.CONFIG,
  PLAYERS: GAME_SHEETS_51.PLAYERS,
  CAST: GAME_SHEETS_51.CAST,
  PICKS: GAME_SHEETS_51.PICKS,
  SCORES: GAME_SHEETS_51.SCORES,
  RECAPS: GAME_SHEETS_51.WEEKRECAPS,
  BONUSES: GAME_SHEETS_51.PLAYERBONUSES,
  PHOTOS: GAME_SHEETS_51.PHOTOS,
  QUESTIONWEEKS: GAME_SHEETS_51.QUESTIONWEEKS,
  REACTIONS: GAME_SHEETS_51.REACTIONS,
  COMMENTS: GAME_SHEETS_51.COMMENTS
};

const REACTION_TYPES_51 = [
  { key: 'bold-move', emoji: '🔥', label: 'Bold Move' },
  { key: 'sneaky', emoji: '🐍', label: 'Sneaky' },
  { key: 'winning-energy', emoji: '👑', label: 'Winning Energy' },
  { key: 'camp-chaos', emoji: '😂', label: 'Camp Chaos' },
  { key: 'blindsided', emoji: '😱', label: 'Blindsided' }
];

const QUESTION_CONFIG_FIELDS_51 = [
  'Q1', 'Q1Points', 'Q1Type', 'Q1Options',
  'Q2', 'Q2Points', 'Q2Type', 'Q2Options',
  'Q3', 'Q3Points', 'Q3Type', 'Q3Options',
  'Q4', 'Q4Points', 'Q4Type', 'Q4Options',
  'Q5', 'Q5Points', 'Q5Type', 'Q5Options',
  'Q6', 'Q6Points', 'Q6Type', 'Q6Options',
  'Q7', 'Q7Points', 'Q7Type', 'Q7Options',
  'Q8', 'Q8Points', 'Q8Type', 'Q8Options',
  'CommentPromptTemplate'
];

const SEASON_PHASES_51 = {
  preseason: {
    key: 'preseason',
    label: 'Preseason / Premiere Week',
    shortLabel: 'Premiere Week',
    heroTitle: week => `Week ${week}: The game begins.`,
    heroSubtitle: data => `Welcome to ${data.seasonName}. Meet the tribes, trust your first impressions, and make a bold opening pick before ${data.voting.deadlineLabel}.`,
    bannerTitle: 'Premiere fever is on',
    bannerBody: 'New tribes, first impressions, and early alliances are taking shape. Lock in your opening read before the first torches are tested.',
    votingLabelOpen: 'Make First Picks',
    votingLabelClosed: 'First Picks Closed',
    votingBoardTitle: 'Premiere Week Voting Board',
    submitLabel: 'Submit First Picks',
    reminder: 'Bold first picks can set the tone for the whole season.',
    picksHidden: 'Premiere picks will be revealed after the first episode update.',
    rankingsTitle: 'Opening Tribe Leaders',
    recapEmpty: 'Premiere recap coming soon once the tribe has spoken.',
    photoEmpty: 'No premiere snapshots yet. The first camp memories are waiting.',
    rulesTitle: 'How to Play'
  },
  early: {
    key: 'early',
    label: 'Early Game',
    shortLabel: 'Early Game',
    heroTitle: week => `Week ${week}: Early game instincts matter.`,
    heroSubtitle: data => `Tribes are still forming their rhythms. Watch the first cracks, spot the alliances, and cast this week's parchment before ${data.voting.deadlineLabel}.`,
    bannerTitle: 'The early game is shifting',
    bannerBody: 'First bonds are hardening, weak links are showing, and every pick is a chance to read the beach before everyone else.',
    votingLabelOpen: 'Cast Weekly Picks',
    votingLabelClosed: 'Voting Closed',
    votingBoardTitle: 'Survivor Voting Board',
    submitLabel: 'Submit Parchment',
    reminder: 'Read the alliances, trust the edit, and keep your torch burning.',
    picksHidden: 'Picks will be revealed after the Wednesday 8:00 PM episode update.',
    rankingsTitle: 'Current Tribe Rankings',
    recapEmpty: 'Weekly recap coming soon.',
    photoEmpty: 'No tribe snapshots yet this week.',
    rulesTitle: 'How to Play'
  },
  midseason: {
    key: 'midseason',
    label: 'Mid-Season',
    shortLabel: 'Mid-Season',
    heroTitle: week => `Week ${week}: The middle game gets messy.`,
    heroSubtitle: data => `The easy votes are gone. Follow the swaps, advantages, and loyalty tests before picks close ${data.voting.deadlineLabel}.`,
    bannerTitle: 'The board is getting dangerous',
    bannerBody: 'Old tribe lines are blurring, advantages are in play, and one bad read can flip the standings.',
    votingLabelOpen: 'Cast Weekly Picks',
    votingLabelClosed: 'Voting Closed',
    votingBoardTitle: 'Mid-Season Voting Board',
    submitLabel: 'Submit Parchment',
    reminder: 'This is where careful reads start separating the contenders.',
    picksHidden: 'Mid-season picks will be revealed after the episode update.',
    rankingsTitle: 'Current Tribe Rankings',
    recapEmpty: 'Mid-season recap coming soon.',
    photoEmpty: 'No tribe snapshots yet this week.',
    rulesTitle: 'Camp Strategy'
  },
  merge: {
    key: 'merge',
    label: 'Merge',
    shortLabel: 'Merge',
    heroTitle: week => `Week ${week}: Drop your buffs.`,
    heroSubtitle: data => `The merge changes everything. Individual immunity, jury management, and exposed alliances are now driving every pick.`,
    bannerTitle: 'Merge chaos has arrived',
    bannerBody: 'One beach, one necklace, and a lot less room to hide. Track who adapts fastest before the vote locks.',
    votingLabelOpen: 'Cast Merge Picks',
    votingLabelClosed: 'Merge Picks Closed',
    votingBoardTitle: 'Merge Voting Board',
    submitLabel: 'Submit Merge Picks',
    reminder: 'Watch immunity threats, swing votes, and who suddenly has no cover.',
    picksHidden: 'Merge picks will be revealed after the episode update.',
    rankingsTitle: 'Merge Tribe Rankings',
    recapEmpty: 'Merge recap coming soon.',
    photoEmpty: 'No merge snapshots yet.',
    rulesTitle: 'Merge Rules'
  },
  finale: {
    key: 'finale',
    label: 'Finale Week',
    shortLabel: 'Finale Week',
    heroTitle: () => 'Finale Week: One torch left standing.',
    heroSubtitle: data => `Final Tribal Council is in sight. Fire-making, jury votes, and the Sole Survivor title are all on the line.`,
    bannerTitle: 'The final vote is coming',
    bannerBody: 'Fire-making pressure, jury speeches, and one last push for the grand prize. This is the endgame.',
    votingLabelOpen: 'Cast Final Vote',
    votingLabelClosed: 'Final Vote Locked',
    votingBoardTitle: 'Final Vote Board',
    submitLabel: 'Submit Final Vote',
    reminder: 'Make your final vote count: fire-making, jury decisions, and the title of Sole Survivor are all in play.',
    picksHidden: 'Final votes will be revealed after the finale update.',
    rankingsTitle: 'Finale Standings',
    recapEmpty: 'Finale recap coming soon after the last torch is snuffed.',
    photoEmpty: 'No finale snapshots yet.',
    rulesTitle: 'Finale Rules'
  },
  postfinale: {
    key: 'postfinale',
    label: 'Post-Finale / Final Results',
    shortLabel: 'Final Results',
    heroTitle: () => 'Season complete: The tribe has spoken.',
    heroSubtitle: data => `${data.seasonName} is in the books. Celebrate the winner, review the final rankings, and relive the season's biggest swings.`,
    bannerTitle: 'Final results are live',
    bannerBody: 'The votes are read, the Sole Survivor has been crowned, and the final fantasy standings are ready for their victory lap.',
    votingLabelOpen: 'View Final Results',
    votingLabelClosed: 'View Final Results',
    votingBoardTitle: 'Season Complete',
    submitLabel: 'Season Complete',
    reminder: 'Voting is complete. Check the final rankings and season recap.',
    picksHidden: 'Final picks are archived with the season results.',
    rankingsTitle: 'Final Tribe Rankings',
    recapEmpty: 'Final season recap coming soon.',
    photoEmpty: 'No final celebration snapshots yet.',
    rulesTitle: 'Season Recap'
  }
};

function doGet() {
  return HtmlService.createTemplateFromFile('Index')
    .evaluate()
    .setTitle('The Tribal Ledger')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

/**
 * JSON RPC endpoint used by the Vercel serverless proxy.
 * Only functions explicitly listed here can be called over HTTP.
 */
function doPost(event) {
  try {
    const body = JSON.parse(String(event && event.postData && event.postData.contents || '{}'));
    const functionName = String(body.functionName || '').trim();
    const args = Array.isArray(body.args) ? body.args : [];
    const handlers = getVercelRpcHandlers_();

    if (!functionName || !Object.prototype.hasOwnProperty.call(handlers, functionName)) {
      throw new Error('Unsupported Apps Script function.');
    }
    if (args.length > 10) {
      throw new Error('Too many function arguments.');
    }

    const result = handlers[functionName].apply(null, args);
    return jsonResponse51_({ ok: true, result: result === undefined ? null : result });
  } catch (err) {
    return jsonResponse51_({
      ok: false,
      error: err && err.message ? err.message : 'Apps Script request failed.'
    });
  }
}

function getVercelRpcHandlers_() {
  return {
    addRecapComment,
    adminAddBonus,
    adminAdvanceWeek,
    adminDeleteComment,
    adminGeneratePlayerUpdateEmail,
    adminPinComment,
    adminRecalculateScores,
    adminSaveCastawayBio,
    adminSaveContentBlocks,
    adminSaveCurrentWeek,
    adminSaveVotingSchedule,
    adminSaveInteractionSettings,
    adminSaveRecap,
    adminSaveResults,
    adminSaveSeasonPhase,
    adminSendPlayerUpdateEmail,
    adminSetVotingOpen,
    getAdminDashboard,
    getAdminQuestionWeek,
    getAdminResultAnswerChoices,
    getAppData,
    getAvailablePickWeeks,
    getBonusLog,
    getEliteWeekPicks,
    getInteractionState,
    getPlayerSubmission,
    getSeasonResponsesTable,
    registerPlayer,
    submitPicks,
    toggleReaction,
    uploadTribePhoto,
    verifyAdminPasscode
  };
}

function jsonResponse51_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

/* =========================
   APP DATA
========================= */

function getAppData() {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const castRows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.CAST));
  const playerRows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.PLAYERS));
  const timezone = String(config.Timezone || 'America/Los_Angeles');

  const voting = getVotingStatus_(config, timezone);
  const reveal = getRevealStatus_(config, timezone);
  const episode = getEpisodeStatus_(config, timezone);
  const currentWeek = Number(config.WeekNumber || 1);
  const finalWeek = Number(config.FinalWeek || 0);
  const seasonPhase = getSeasonPhase_(config, currentWeek, finalWeek);
  const isFinalRankings = seasonPhase.key === 'postfinale' || (finalWeek > 0 && (currentWeek > finalWeek || (currentWeek === finalWeek && reveal.isVisible)));
  const questionConfig = getQuestionConfigForWeek_(currentWeek, config);
  const questions = getQuestionDefinitions_(questionConfig, castRows);
  const scoringRows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING));
  const scoringRow = scoringRows.find(r => Number(r.Week || 0) === currentWeek) || null;
  const questionPoints = getQuestionPointsForWeek_(currentWeek, config, scoringRow);
  questions.forEach(q => {
    if (Object.prototype.hasOwnProperty.call(questionPoints, q.key)) q.points = questionPoints[q.key];
  });

  return {
    seasonName: String(config.SeasonName || 'Survivor Season 51'),
    entryFeeAmount: normalizeEntryFeeAmount_(config.EntryFeeAmount),
    ledgerTitle: String(config.TribeLedgerTitle || 'The Tribal Ledger'),
    ledgerSubtitle: String(config.TribeLedgerSubtitle || 'Outwit • Outplay • Outlast • Outscore'),
    weekNumber: currentWeek,
    finalWeek,
    seasonPhase,
    isFinalRankings,
    rankingsTitle: isFinalRankings ? 'Final Tribe Rankings' : seasonPhase.messages.rankingsTitle,
    timezone,
    voting,
    reveal,
    episode,
    questions,
    leaderboard: getLeaderboardData_(),
    recap: getLatestRecap_(config, timezone),
    weeklyUpdates: getWeeklyUpdates_(config, timezone),
    tribePhotos: getApprovedTribePhotos_(currentWeek, config, timezone),
    interactions: getInteractionConfig_(config),
    reactionTypes: REACTION_TYPES_51,
    castGrid: getCastGrid_(castRows),
    contentBlocks: {
      campAnnouncementsTitle: sanitizeHtml_(String(config.CampAnnouncementsTitle || 'Camp Announcements')),
      campAnnouncements: [
        sanitizeHtml_(String(config.CampAnnouncement1 || '').trim()),
        sanitizeHtml_(String(config.CampAnnouncement2 || '').trim()),
        sanitizeHtml_(String(config.CampAnnouncement3 || '').trim()),
        sanitizeHtml_(String(config.CampAnnouncement4 || '').trim()),
        sanitizeHtml_(String(config.CampAnnouncement5 || '').trim())
      ].filter(Boolean),
      atAGlanceTitle: getCampRulesTitle_(config),
      atAGlance: [
        sanitizeHtml_(String(config.AtAGlance1 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance2 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance3 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance4 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance5 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance6 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance7 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance8 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance9 || '').trim()),
        sanitizeHtml_(String(config.AtAGlance10 || '').trim())
      ].filter(Boolean)
    },
    photoUpload: {
      title: String(config.PhotoUploadTitle || 'Tribe Snapshots'),
      instructions: String(config.PhotoUploadInstructions || 'Drop your Survivor-themed photo here for the tribe.')
    },
    players: playerRows
      .filter(p => String(p.Active || '').trim().toUpperCase() !== 'FALSE')
      .map(p => ({
        name: String(p.Name || '').trim()
      })),
    rosterNames: playerRows
      .map(p => String(p.Name || '').trim())
      .filter(Boolean)
  };
}

function getCastBioRows_() {
  return getCastGrid_(readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CAST)));
}

function getInteractionConfig_(config) {
  return {
    reactionsEnabled: String((config && config.InteractionsEnabled) || 'TRUE').trim().toUpperCase() !== 'FALSE',
    commentsEnabled: String((config && config.CommentsEnabled) || 'TRUE').trim().toUpperCase() !== 'FALSE'
  };
}

function registerPlayer(name, tribalKey, entryFeeAcknowledged) {
  const cleanName = normalizePlayerDisplayName51_(name);
  const cleanKey = String(tribalKey || '').trim();
  if (!cleanName) throw new Error('Enter your castaway name.');
  if (!cleanKey) throw new Error('Enter your tribal key.');
  if (entryFeeAcknowledged !== true) {
    throw new Error('You must acknowledge the season entry fee before registering.');
  }

  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActive();
    ensureSheetWithHeaders_(ss, APP_SHEETS_51.PLAYERS, GAME_HEADERS_51.PLAYERS);
    const sheet = mustGetSheet_(ss, APP_SHEETS_51.PLAYERS);
    const headers = getHeaders_(sheet);
    const rows = readTable_(sheet);
    const existing = rows.some(row => nameKey51_(row.Name) === nameKey51_(cleanName));

    if (existing) {
      throw new Error('That castaway name is already registered. Use the Tribal Key already assigned to that player to submit picks; the stored key cannot be replaced here.');
    }

    const record = {
      Name: cleanName,
      Active: 'TRUE',
      TribalKey: cleanKey
    };
    const values = headers.map(header => record[header] !== undefined ? record[header] : '');
    sheet.appendRow(values);
    return { ok: true, name: cleanName, message: 'Your castaway registration has been added to the tribe roster.' };
  } finally {
    lock.releaseLock();
  }
}

function getSeasonPhase_(config, currentWeek, finalWeek) {
  const mode = String(config.SeasonPhaseMode || 'AUTO').trim().toUpperCase();
  const manualKey = normalizeSeasonPhaseKey_(config.SeasonPhaseManual);
  const key = mode === 'MANUAL'
    ? manualKey
    : getAutomaticSeasonPhaseKey_(currentWeek, finalWeek, config);
  const phase = SEASON_PHASES_51[key] || SEASON_PHASES_51.early;
  const data = {
    seasonName: String(config.SeasonName || 'Survivor Season 51'),
    weekNumber: currentWeek,
    finalWeek,
    voting: {
      deadlineLabel: buildRuleLabel_(config.CloseDay, config.CloseTime)
    }
  };

  return {
    key: phase.key,
    label: phase.label,
    shortLabel: phase.shortLabel,
    mode: mode === 'MANUAL' ? 'MANUAL' : 'AUTO',
    manualKey,
    automaticKey: getAutomaticSeasonPhaseKey_(currentWeek, finalWeek, config),
    messages: {
      heroTitle: phase.heroTitle(currentWeek, data),
      heroSubtitle: phase.heroSubtitle(data),
      bannerTitle: phase.bannerTitle,
      bannerBody: phase.bannerBody,
      votingLabelOpen: phase.votingLabelOpen,
      votingLabelClosed: phase.votingLabelClosed,
      votingBoardTitle: phase.votingBoardTitle,
      submitLabel: phase.submitLabel,
      reminder: phase.reminder,
      picksHidden: phase.picksHidden,
      rankingsTitle: phase.rankingsTitle,
      recapEmpty: phase.recapEmpty,
      photoEmpty: phase.photoEmpty,
      rulesTitle: phase.rulesTitle
    },
    options: getSeasonPhaseOptions_()
  };
}

function getAutomaticSeasonPhaseKey_(currentWeek, finalWeek, config) {
  const week = Number(currentWeek || 1);
  const finale = Number(finalWeek || config.FinalWeek || 13);
  const mergeWeek = Number(config.MergeWeek || Math.max(2, finale - 5));

  if (finale && week > finale) return 'postfinale';
  if (finale && week === finale) return 'finale';
  if (week <= 1) return 'preseason';
  if (week >= mergeWeek) return 'merge';
  if (week >= Math.max(2, Math.floor(mergeWeek / 2) + 2)) return 'midseason';
  return 'early';
}

function normalizeSeasonPhaseKey_(value) {
  const key = String(value || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '');
  const map = {
    preseason: 'preseason',
    premiere: 'preseason',
    premiereweek: 'preseason',
    early: 'early',
    earlygame: 'early',
    midseason: 'midseason',
    mid: 'midseason',
    merge: 'merge',
    finale: 'finale',
    finaleweek: 'finale',
    postfinale: 'postfinale',
    finalresults: 'postfinale',
    complete: 'postfinale'
  };
  return map[key] || 'preseason';
}

function getSeasonPhaseOptions_() {
  return ['preseason', 'early', 'midseason', 'merge', 'finale', 'postfinale'].map(key => ({
    key,
    label: SEASON_PHASES_51[key].label
  }));
}

function getQuestionDefinitions_(config, castRows) {
  const activeCast = (castRows || [])
    .filter(r => isActiveCastStatus_(r.Status))
    .map(r => ({
      value: String(r.Name || '').trim(),
      label: String(r.Name || '').trim(),
      photoUrl: String(r.PhotoUrl || '').trim(),
      team: String(r.Team || '').trim()
    }))
    .filter(r => r.value)
    .sort((a, b) => a.label.localeCompare(b.label));

  const teamOptions = getConfiguredTeamOptions_(config);

  const questions = [];

  for (let i = 1; i <= 8; i++) {
    const prompt = cleanQuestionPrompt_(config[`Q${i}`]);
    if (!prompt) continue;

    const type = String(config[`Q${i}Type`] || 'cast').trim().toLowerCase();
    const customOptions = splitList_(config[`Q${i}Options`]);

    questions.push({
      key: `q${i}`,
      prompt,
      points: pointValueOrBlank_(config[`Q${i}Points`]),
      type,
      required: true,
      options: buildOptionsForType_(type, activeCast, teamOptions, customOptions)
    });
  }

  const commentPrompt = String(config.CommentPromptTemplate || '').trim();
  if (commentPrompt) {
    questions.push({
      key: 'comment',
      prompt: commentPrompt,
      type: 'text',
      required: true
    });
  }

  return questions;
}

function getQuestionConfigForWeek_(week, fallbackConfig) {
  const base = Object.assign({}, fallbackConfig || {});
  const weekNumber = Number(week || base.WeekNumber || 1);
  const saved = getSavedQuestionWeekConfig_(weekNumber);
  if (saved) return mergeQuestionConfig_(base, saved);

  const snapshot = getQuestionConfigFromPicks_(weekNumber);
  if (snapshot) return mergeQuestionConfig_(base, snapshot);

  if (weekNumber === Number(base.WeekNumber || 1)) return base;
  return mergeQuestionConfig_(base, blankQuestionWeekConfig_());
}

function blankQuestionWeekConfig_() {
  const config = { CommentPromptTemplate: '' };
  for (let i = 1; i <= 8; i++) {
    config[`Q${i}`] = '';
    config[`Q${i}Points`] = '';
    config[`Q${i}Type`] = '';
    config[`Q${i}Options`] = '';
  }
  return config;
}

function mergeQuestionConfig_(baseConfig, questionConfig) {
  const merged = Object.assign({}, baseConfig || {});
  QUESTION_CONFIG_FIELDS_51.forEach(field => {
    if (Object.prototype.hasOwnProperty.call(questionConfig, field)) {
      merged[field] = questionConfig[field];
    }
  });
  return merged;
}

function getSavedQuestionWeekConfig_(week) {
  const ss = SpreadsheetApp.getActive();
  const sheet = ss.getSheetByName(APP_SHEETS_51.QUESTIONWEEKS);
  if (!sheet) return null;

  const rows = readTable_(sheet);
  const row = rows.find(r => Number(r.Week || 0) === Number(week));
  if (!row) return null;

  const config = {};
  QUESTION_CONFIG_FIELDS_51.forEach(field => {
    config[field] = row[field] !== undefined ? row[field] : '';
  });
  return config;
}

function getQuestionConfigFromPicks_(week) {
  const ss = SpreadsheetApp.getActive();
  const picksSheet = ss.getSheetByName(APP_SHEETS_51.PICKS);
  if (!picksSheet) return null;

  const rows = readTable_(picksSheet)
    .filter(r => Number(r.Week || 0) === Number(week));
  if (!rows.length) return null;

  const sample = rows.find(r => {
    for (let i = 1; i <= 8; i++) {
      if (String(r[`Q${i}_Label`] || '').trim()) return true;
    }
    return String(r.Comment_Label || '').trim();
  });
  if (!sample) return null;

  const config = {};
  for (let i = 1; i <= 8; i++) {
    config[`Q${i}`] = String(sample[`Q${i}_Label`] || '').trim();
    config[`Q${i}Points`] = '';
    config[`Q${i}Type`] = '';
    config[`Q${i}Options`] = '';
  }
  config.CommentPromptTemplate = String(sample.Comment_Label || '').trim();
  return config;
}

function ensureQuestionWeeksSheet_() {
  const ss = SpreadsheetApp.getActive();
  const sheetName = APP_SHEETS_51.QUESTIONWEEKS || GAME_SHEETS_51.QUESTIONWEEKS;
  ensureSheetWithHeaders_(ss, sheetName, GAME_HEADERS_51.QUESTIONWEEKS);
  return mustGetSheet_(ss, sheetName);
}

function upsertQuestionWeekConfig_(week, questionConfig) {
  const sheet = ensureQuestionWeeksSheet_();
  const headers = getHeaders_(sheet);
  const rows = readTable_(sheet);
  const targetWeek = Number(week || 0);
  let rowNumber = null;

  for (let i = 0; i < rows.length; i++) {
    if (Number(rows[i].Week || 0) === targetWeek) {
      rowNumber = i + 2;
      break;
    }
  }

  const record = { Week: targetWeek };
  QUESTION_CONFIG_FIELDS_51.forEach(field => {
    record[field] = questionConfig[field] !== undefined ? questionConfig[field] : '';
  });

  const values = headers.map(header => record[header] !== undefined ? record[header] : '');
  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
}

function getQuestionPointsForWeek_(week, fallbackConfig, scoringRow) {
  const config = getQuestionConfigForWeek_(week, fallbackConfig || {});
  const points = {};
  for (let i = 1; i <= 8; i++) {
    const configured = pointValueOrBlank_(config[`Q${i}Points`]);
    const scored = scoringRow ? pointValueOrBlank_(scoringRow[`Q${i}_Points`]) : '';
    points[`q${i}`] = configured !== '' ? configured : scored;
  }
  return points;
}

function buildOptionsForType_(type, activeCast, teamOptions, customOptions) {
  if (type === 'teams') {
    return teamOptions;
  }
  if (type === 'custom') {
    return customOptions.map(v => ({ value: v, label: v, photoUrl: '', team: '' }));
  }
  return activeCast;
}

function getConfiguredTeamOptions_(config) {
  const options = [];
  for (let i = 1; i <= 3; i++) {
    const name = String(config[`Team${i}Name`] || '').trim();
    if (!name) continue;
    options.push({
      value: name,
      label: name,
      photoUrl: String(config[`Team${i}PhotoUrl`] || '').trim(),
      team: name
    });
  }

  if (options.length) return options;

  return splitList_(config.Teams).slice(0, 3).map(team => ({
    value: team,
    label: team,
    photoUrl: '',
    team
  }));
}

function normalizeQuestionType_(value) {
  const type = String(value || '').trim().toLowerCase();
  return ['cast', 'teams', 'custom'].includes(type) ? type : '';
}

function cleanQuestionPrompt_(html) {
  const clean = sanitizeHtml_(String(html || '').trim());
  const plain = String(clean || '')
    .replace(/<br\s*\/?>/gi, '')
    .replace(/&nbsp;/gi, '')
    .replace(/<[^>]*>/g, '')
    .trim();
  return plain ? clean : '';
}

function getCastGrid_(castRows) {
  return (castRows || [])
    .map(r => {
      const status = normalizeCastStatus_(r.Status);
      const name = String(r.Name || '').trim();
      return {
        name,
        status,
        statusLabel: getCastStatusLabel_(status),
        photoUrl: String(r.PhotoUrl || '').trim(),
        team: String(r.Team || '').trim(),
        bio: sanitizeHtml_(String(r.Bio || '').trim()),
        age: String(r.Age || '').trim(),
        hometown: String(r.Hometown || '').trim(),
        occupation: String(r.Occupation || '').trim(),
        details: sanitizeHtml_(String(r.Details || '').trim())
      };
    })
    .filter(r => r.name)
    .sort((a, b) => {
      const statusOrder = { active: 1, finalist: 2, jury: 3, eliminated: 4 };
      const aOrder = statusOrder[a.status] || 5;
      const bOrder = statusOrder[b.status] || 5;
      if (aOrder !== bOrder) return aOrder - bOrder;
      return a.name.localeCompare(b.name);
    });
}

function normalizeCastStatus_(value) {
  const status = String(value || '').trim().toLowerCase();
  if (!status || status === 'in' || status === 'active') return 'active';
  if (status === 'out' || status === 'eliminated' || status === 'voted out') return 'eliminated';
  if (status === 'jury' || status === 'juror') return 'jury';
  if (status === 'final' || status === 'finalist') return 'finalist';
  return status.replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || 'active';
}

function isActiveCastStatus_(value) {
  const status = String(value || '').trim().toLowerCase();
  return !status || status === 'in' || status === 'active';
}

function getCastStatusLabel_(status) {
  const labels = {
    active: 'ACTIVE',
    eliminated: 'ELIMINATED',
    jury: 'JURY',
    finalist: 'FINALIST'
  };
  return labels[status] || String(status || 'active').replace(/-/g, ' ').toUpperCase();
}

/* =========================
   SUBMISSIONS
========================= */

function submitPicks(payload) {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    validateSubmissionPayload_(payload, false);

    const ss = SpreadsheetApp.getActive();
    const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
    const timezone = String(config.Timezone || 'America/Los_Angeles');
    const currentWeek = Number(config.WeekNumber || 1);
    const submittedWeek = Number(payload.week || 0);
    if (submittedWeek !== currentWeek) {
      throw new Error(`Picks can only be submitted for the current week (Week ${currentWeek}). Refresh the app and try again.`);
    }
    const phase = getSeasonPhase_(config, currentWeek, Number(config.FinalWeek || 0));

    if (phase.key === 'postfinale') {
      throw new Error('Voting is complete. Final results and season recaps are now live.');
    }

    const voting = getVotingStatus_(config, timezone);

    if (!voting.isOpen) {
      throw new Error('Voting is currently closed for this week.');
    }

    payload.SubmittedByAdmin = 'FALSE';
    payload.AutoAssigned = 'FALSE';
    payload.PenaltyApplied = 'FALSE';

    upsertPickRecord_(payload, { allowAdminEdit: false, markAutoAssigned: false });

    return {
      ok: true,
      message: getSubmissionSuccessMessage_(phase)
    };
  } finally {
    lock.releaseLock();
  }
}

function getSubmissionSuccessMessage_(phase) {
  const key = phase && phase.key;
  if (key === 'preseason') return 'Your opening parchment is in. First impressions are officially on the board.';
  if (key === 'finale') return 'Your final vote is locked. The path to Sole Survivor is in the jury\'s hands now.';
  if (key === 'merge') return 'Your merge picks are in. One beach, one vote, no place to hide.';
  return 'Your torch is lit. Your vote has been cast.';
}

function adminEditSubmission(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);
  validateSubmissionPayload_(payload, true);

  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    payload.SubmittedByAdmin = 'TRUE';
    payload.AutoAssigned = String(payload.AutoAssigned || 'FALSE');
    payload.PenaltyApplied = String(payload.PenaltyApplied || 'FALSE');

    upsertPickRecord_(payload, { allowAdminEdit: true, markAutoAssigned: String(payload.AutoAssigned) === 'TRUE' });

    return {
      ok: true,
      message: 'Submission updated by admin.'
    };
  } finally {
    lock.releaseLock();
  }
}

function upsertPickRecord_(payload, options) {
  const ss = SpreadsheetApp.getActive();
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.PICKS);
  const headers = getHeaders_(sheet);
  const rows = readTable_(sheet);

  const week = Number(payload.week || 0);
  const playerName = String(payload.name || '').trim();
  const key = `${week}||${nameKey51_(playerName)}`;

  let existingRowNumber = null;
  let latestTs = -Infinity;

  rows.forEach((row, idx) => {
    const rowKey = `${Number(row.Week || 0)}||${nameKey51_(row.Name)}`;
    if (rowKey !== key) return;
    const ts = new Date(row.Timestamp || 0).getTime();
    if (ts >= latestTs) {
      latestTs = ts;
      existingRowNumber = idx + 2;
    }
  });

  const record = {
    Timestamp: new Date(),
    Week: week,
    Name: playerName,
    Email: String(payload.email || '').trim(),
    Q1_Label: String(payload.q1Label || ''),
    Q1_Pick: String(payload.q1Pick || ''),
    Q2_Label: String(payload.q2Label || ''),
    Q2_Pick: String(payload.q2Pick || ''),
    Q3_Label: String(payload.q3Label || ''),
    Q3_Pick: String(payload.q3Pick || ''),
    Q4_Label: String(payload.q4Label || ''),
    Q4_Pick: String(payload.q4Pick || ''),
    Q5_Label: String(payload.q5Label || ''),
    Q5_Pick: String(payload.q5Pick || ''),
    Q6_Label: String(payload.q6Label || ''),
    Q6_Pick: String(payload.q6Pick || ''),
    Q7_Label: String(payload.q7Label || ''),
    Q7_Pick: String(payload.q7Pick || ''),
    Q8_Label: String(payload.q8Label || ''),
    Q8_Pick: String(payload.q8Pick || ''),
    Comment_Label: String(payload.commentLabel || ''),
    Comment_Text: String(payload.commentText || ''),
    SubmittedByAdmin: String(payload.SubmittedByAdmin || 'FALSE'),
    AutoAssigned: String(payload.AutoAssigned || 'FALSE'),
    PenaltyApplied: String(payload.PenaltyApplied || 'FALSE')
  };

  const values = headers.map(h => record[h] !== undefined ? record[h] : '');

  if (existingRowNumber) {
    sheet.getRange(existingRowNumber, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }
}

function validateSubmissionPayload_(payload, isAdmin) {
  if (!payload) throw new Error('Missing submission payload.');

  const name = normalizePlayerDisplayName51_(payload.name);
  payload.name = name;
  const tribalKey = String(payload.tribalKey || '').trim();
  const week = Number(payload.week || 0);

  if (!name) throw new Error('Please enter your name.');
  if (!week) throw new Error('Missing week number.');

  ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8'].forEach(key => {
    const label = String(payload[`${key}Label`] || '').trim();
    if (!label) return;
    const pick = String(payload[`${key}Pick`] || '').trim();
    if (!pick) throw new Error(`Please answer: ${label}`);
  });

  const commentLabel = String(payload.commentLabel || payload.commentPrompt || '').trim();
  if (commentLabel && !String(payload.commentText || '').trim()) {
    throw new Error(`Please answer: ${commentLabel}`);
  }

  if (!isAdmin) {
    const config = readConfig_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG));
    const castRows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CAST));
    const questionConfig = getQuestionConfigForWeek_(week, config);
    getQuestionDefinitions_(questionConfig, castRows).forEach(q => {
      const label = stripHtmlForValidation_(q.prompt);
      if (q.type === 'text') {
        if (!String(payload[`${q.key}Text`] || payload.commentText || '').trim()) {
          throw new Error(`Please answer: ${label}`);
        }
      } else if (!String(payload[`${q.key}Pick`] || '').trim()) {
        throw new Error(`Please answer: ${label}`);
      }
    });

    const players = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PLAYERS))
      .filter(p => String(p.Active || '').trim().toUpperCase() !== 'FALSE');

    const allowed = new Set(players.map(p => nameKey51_(p.Name)));
    if (players.length && !allowed.has(nameKey51_(name))) {
      throw new Error('Name not found on the tribe roster.');
    }

    const verifiedPlayer = verifyPlayerTribalKeyOrThrow_(players, name, tribalKey);
    payload.name = String(verifiedPlayer.Name || name).trim();
  }
}

function getPlayerSubmission(name, week, tribalKey) {
  const safeName = String(name || '').trim();
  const safeWeek = Number(week || 0);
  if (!safeName || !safeWeek) return null;

  const ss = SpreadsheetApp.getActive();
  const players = readTable_(mustGetSheet_(ss, APP_SHEETS_51.PLAYERS))
    .filter(p => String(p.Active || '').trim().toUpperCase() !== 'FALSE');
  verifyPlayerTribalKeyOrThrow_(players, safeName, tribalKey);

  const rows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.PICKS));
  const key = nameKey51_(safeName);
  let latest = null;
  let latestTs = -Infinity;

  rows.forEach(row => {
    if (Number(row.Week || 0) !== safeWeek) return;
    if (nameKey51_(row.Name) !== key) return;

    const ts = new Date(row.Timestamp || 0).getTime();
    if (ts >= latestTs) {
      latestTs = ts;
      latest = row;
    }
  });

  if (!latest) return null;

  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const scoringRows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING));
  const scoringRow = scoringRows.find(r => Number(r.Week || 0) === safeWeek) || null;
  const questionPoints = getQuestionPointsForWeek_(safeWeek, config, scoringRow);
  const currentWeek = Number(config.WeekNumber || 1);
  const reveal = getRevealStatus_(config, String(config.Timezone || 'America/Los_Angeles'));
  const canShowCorrect = safeWeek < currentWeek || reveal.isVisible;
  const correct = buildCorrectMap_(scoringRow);
  const weekScoreRows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.SCORES))
    .filter(row => Number(row.Week || 0) === safeWeek && nameKey51_(row.Name) === key);
  const weekScore = weekScoreRows.length ? weekScoreRows[weekScoreRows.length - 1] : null;

  function buildSubmissionQuestion_(index) {
    const key = `q${index}`;
    const pick = String(latest[`Q${index}_Pick`] || '');
    const correctList = correct[key] || [];
    const normalized = pick.trim().toLowerCase();
    return {
      label: String(latest[`Q${index}_Label`] || ''),
      pick,
      points: questionPoints[key],
      isCorrect: !!(canShowCorrect && pick && correctList.length && correctList.map(v => String(v || '').trim().toLowerCase()).includes(normalized))
    };
  }

  return {
    name: String(latest.Name || ''),
    email: String(latest.Email || ''),
    weekPoints: weekScore ? Number(weekScore.WeekPoints || 0) : null,
    questions: [
      buildSubmissionQuestion_(1),
      buildSubmissionQuestion_(2),
      buildSubmissionQuestion_(3),
      buildSubmissionQuestion_(4),
      buildSubmissionQuestion_(5),
      buildSubmissionQuestion_(6),
      buildSubmissionQuestion_(7),
      buildSubmissionQuestion_(8),
      { label: String(latest.Comment_Label || ''), pick: String(latest.Comment_Text || '') }
    ].filter(q => q.label || q.pick)
  };
}

function verifyPlayerTribalKeyOrThrow_(players, name, tribalKey) {
  const key = nameKey51_(name);
  const player = (players || []).find(p => nameKey51_(p.Name) === key);
  if (!player) {
    throw new Error('Name not found on the tribe roster.');
  }

  const expected = String(player.TribalKey || '').trim();
  if (!expected) {
    throw new Error('Your tribal key is not set yet. Ask the host for your key.');
  }

  if (String(tribalKey || '').trim() !== expected) {
    throw new Error('Invalid tribal key.');
  }

  return player;
}

/* =========================
   ADMIN
========================= */

function verifyAdminPasscode(passcode) {
  const config = readConfig_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG));
  const actual = String(config.AdminPasscode || '').trim();
  return !!actual && String(passcode || '').trim() === actual;
}

function getAdminDashboard(passcode) {
  verifyAdminPasscodeOrThrow_(passcode);

  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const timezone = String(config.Timezone || 'America/Los_Angeles');
  const voting = getVotingStatus_(config, timezone);
  const reveal = getRevealStatus_(config, timezone);
  const recap = getLatestRecap_(config, timezone);
  const weekNumber = Number(config.WeekNumber || 1);
  const finalWeek = Number(config.FinalWeek || 0);
  const seasonPhase = getSeasonPhase_(config, weekNumber, finalWeek);

  return {
    weekNumber,
    finalWeek,
    mergeWeek: Number(config.MergeWeek || 0),
    seasonPhase,
    votingStatus: voting.statusText,
    openLabel: voting.openLabel,
    deadlineLabel: voting.deadlineLabel,
    revealLabel: reveal.revealLabel,
    openDay: String(config.OpenDay || 'Monday'),
    openTime: formatTimeForInput_(config.OpenTime || '12:00 AM'),
    closeDay: String(config.CloseDay || ''),
    closeTime: formatTimeForInput_(config.CloseTime),
    revealDay: String(config.RevealDay || config.EpisodeDay || ''),
    revealTime: formatTimeForInput_(config.RevealTime || config.EpisodeTime),
    submissionsCount: getSubmissionCountForWeek_(weekNumber),
    latestRecapTitle: recap.title || '',
    scoresSummary: getScoresSummary_(),
    contentBlocks: getAdminContentBlocks(passcode),
    castBios: getCastBioRows_(),
    interactions: getInteractionConfig_(config),
    comments: getAdminComments_()
  };
}

function adminSaveCastawayBio(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);

  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.CAST, GAME_HEADERS_51.CAST);
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.CAST);
  const headers = getHeaders_(sheet);
  const rows = readTable_(sheet);
  const name = String((payload && payload.name) || '').trim();

  if (!name) throw new Error('Castaway name is required.');

  const record = {
    Name: name,
    Status: String((payload && payload.status) || 'active').trim() || 'active',
    PhotoUrl: String((payload && payload.photoUrl) || '').trim(),
    Team: String((payload && payload.team) || '').trim(),
    Bio: sanitizeHtml_(String((payload && payload.bio) || '').trim()),
    Age: String((payload && payload.age) || '').trim(),
    Hometown: String((payload && payload.hometown) || '').trim(),
    Occupation: String((payload && payload.occupation) || '').trim(),
    Details: sanitizeHtml_(String((payload && payload.details) || '').trim())
  };

  let rowNumber = null;
  for (let i = 0; i < rows.length; i++) {
    if (normalizeTextKey51_(rows[i].Name) === normalizeTextKey51_(name)) {
      rowNumber = i + 2;
      break;
    }
  }

  const values = headers.map(h => record[h] !== undefined ? record[h] : '');
  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }

  return {
    ok: true,
    message: `${name} castaway bio saved.`,
    castBios: getCastBioRows_()
  };
}

function adminSaveSeasonPhase(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);
  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  const mode = String((payload && payload.mode) || 'AUTO').trim().toUpperCase() === 'MANUAL' ? 'MANUAL' : 'AUTO';
  const manualPhase = normalizeSeasonPhaseKey_(payload && payload.manualPhase);
  const mergeWeek = Number(payload && payload.mergeWeek);
  const finalWeek = Number(payload && payload.finalWeek);

  setConfigValue_(configSheet, 'SeasonPhaseMode', mode);
  setConfigValue_(configSheet, 'SeasonPhaseManual', manualPhase);
  if (Number.isFinite(mergeWeek) && mergeWeek > 0) setConfigValue_(configSheet, 'MergeWeek', mergeWeek);
  if (Number.isFinite(finalWeek) && finalWeek > 0) setConfigValue_(configSheet, 'FinalWeek', finalWeek);
  SpreadsheetApp.flush();

  return { ok: true, message: mode === 'MANUAL' ? 'Season phase override saved.' : 'Season phase automation saved.' };
}

function adminSetVotingOpen(passcode, isOpen) {
  verifyAdminPasscodeOrThrow_(passcode);
  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  setConfigValue_(configSheet, 'VotingOpen', isOpen ? 'TRUE' : 'FALSE');
  return { ok: true, message: isOpen ? 'Voting is now OPEN.' : 'Voting is now CLOSED.' };
}

function adminSaveCurrentWeek(passcode, week) {
  verifyAdminPasscodeOrThrow_(passcode);
  const targetWeek = Number(week || 0);
  if (!Number.isInteger(targetWeek) || targetWeek < 1) throw new Error('Enter a valid current week.');
  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  setConfigValue_(configSheet, 'WeekNumber', targetWeek);
  SpreadsheetApp.flush();
  return { ok: true, weekNumber: targetWeek, message: `Current week updated to Week ${targetWeek}.` };
}

function adminSaveVotingSchedule(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);
  const openDay = String((payload && payload.openDay) || '').trim();
  const openTime = String((payload && payload.openTime) || '').trim();
  const closeDay = String((payload && payload.closeDay) || '').trim();
  const closeTime = String((payload && payload.closeTime) || '').trim();
  const revealDay = String((payload && payload.revealDay) || '').trim();
  const revealTime = String((payload && payload.revealTime) || '').trim();
  const openRule = parseRule_(openDay, openTime);
  const closeRule = parseRule_(closeDay, closeTime);
  parseRule_(revealDay, revealTime);
  if (openRule.dayNum === closeRule.dayNum && openRule.totalMinutes === closeRule.totalMinutes) {
    throw new Error('Voting open and deadline cannot use the same day and time.');
  }

  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  setConfigValue_(configSheet, 'OpenDay', openDay);
  setConfigValue_(configSheet, 'OpenTime', formatTimeForConfig_(openTime));
  setConfigValue_(configSheet, 'CloseDay', closeDay);
  setConfigValue_(configSheet, 'CloseTime', formatTimeForConfig_(closeTime));
  setConfigValue_(configSheet, 'RevealDay', revealDay);
  setConfigValue_(configSheet, 'RevealTime', formatTimeForConfig_(revealTime));
  setConfigValue_(configSheet, 'VotingOpen', 'AUTO');
  SpreadsheetApp.flush();
  return { ok: true, message: 'Voting open, deadline, and picks reveal schedule saved. Automatic scheduling is active.' };
}

function adminSaveRecap(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);

  const sheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.RECAPS);
  const headers = getHeaders_(sheet);
  const rows = readTable_(sheet);

  const week = Number(payload.week || 0);
  const title = sanitizeHtml_(String(payload.title || '').trim());
  const recapHtml = sanitizeHtml_(String(payload.body || ''));

  if (!week) throw new Error('Missing week number.');
  if (!recapHtml.trim()) throw new Error('Please enter recap text.');

  let rowNumber = null;
  for (let i = 0; i < rows.length; i++) {
    if (Number(rows[i].Week || 0) === week) {
      rowNumber = i + 2;
      break;
    }
  }

  const record = {
    Week: week,
    Title: title || `Week ${week} Recap`,
    RecapHtml: recapHtml
  };
  const values = headers.map(h => record[h] !== undefined ? record[h] : '');

  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }

  return { ok: true, message: `Week ${week} recap saved.` };
}

function adminGeneratePlayerUpdateEmail(passcode, week) {
  verifyAdminPasscodeOrThrow_(passcode);
  return buildPlayerUpdateEmail_(week);
}

function adminSendPlayerUpdateEmail(passcode, week) {
  verifyAdminPasscodeOrThrow_(passcode);
  const email = buildPlayerUpdateEmail_(week);
  if (!email.recipients.length) {
    throw new Error('No Admin Email recipients are configured on the Config tab.');
  }

  MailApp.sendEmail({
    to: email.recipients.join(','),
    subject: email.subject,
    body: email.body,
    htmlBody: email.htmlBody,
    name: 'The Tribal Ledger'
  });

  return {
    ok: true,
    message: `Player update email sent to ${email.recipients.length} Admin Email recipient${email.recipients.length === 1 ? '' : 's'}.`,
    email
  };
}

function buildPlayerUpdateEmail_(week) {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const targetWeek = Number(week || config.WeekNumber || 1);
  const recap = getRecapForEmailWeek_(targetWeek);
  const scoringRow = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING))
    .find(row => Number(row.Week || 0) === targetWeek);
  if (!recap) throw new Error(`No recap has been saved for Week ${targetWeek}.`);
  if (!scoringRow) throw new Error(`No correct answers have been saved for Week ${targetWeek}.`);

  const leaderboard = getLeaderboardData_();
  const weekScores = getScoreRowsForEmailWeek_(targetWeek);
  const previousScores = getPreviousScoreRowsForEmailWeek_(targetWeek);
  const leaderboardLines = buildEmailLeaderboardLines_(leaderboard);
  const movementLines = buildEmailMovementLines_(weekScores, previousScores);
  const performanceLines = buildEmailPerformanceLines_(weekScores, previousScores);
  const highlightLines = buildEmailHighlights_(recap);
  const recipients = getAdminEmailRecipients_(config);
  const seasonName = String(config.SeasonName || 'Survivor Season 51');
  const nextWeek = targetWeek + 1;
  const subject = `${seasonName} Week ${targetWeek} Update: Scores, Recap, and Tribal Standings`;

  const htmlBody = buildPlayerUpdateEmailHtml_({
    seasonName,
    week: targetWeek,
    nextWeek,
    title: recap.title || `Week ${targetWeek} Recap`,
    recapHtml: recap.body,
    highlights: highlightLines,
    movements: movementLines,
    standings: leaderboardLines,
    performances: performanceLines
  });
  const body = buildPlayerUpdateEmailText_({
    seasonName,
    week: targetWeek,
    nextWeek,
    title: recap.title || `Week ${targetWeek} Recap`,
    highlights: highlightLines,
    movements: movementLines,
    standings: leaderboardLines,
    performances: performanceLines,
    recapText: emailStripHtml_(recap.body)
  });

  return {
    week: targetWeek,
    subject,
    recipients,
    htmlBody,
    body
  };
}

function getRecapForEmailWeek_(week) {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.RECAPS));
  let recap = null;
  rows.forEach((row, index) => {
    if (Number(row.Week || 0) !== Number(week || 0)) return;
    recap = {
      index,
      week: Number(row.Week || 0),
      title: sanitizeHtml_(String(row.Title || `Week ${week} Recap`).trim()),
      body: sanitizeHtml_(String(row.RecapHtml || '').trim())
    };
  });
  return recap && emailStripHtml_(recap.body) ? recap : null;
}

function getScoreRowsForEmailWeek_(week) {
  return readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.SCORES))
    .filter(row => Number(row.Week || 0) === Number(week || 0))
    .map(row => ({
      name: String(row.Name || '').trim(),
      weekPoints: Number(row.WeekPoints || 0),
      total: Number(row.RunningTotal || 0),
      rank: Number(row.Rank || 0)
    }))
    .filter(row => row.name);
}

function getPreviousScoreRowsForEmailWeek_(week) {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.SCORES));
  const previousWeeks = rows
    .map(row => Number(row.Week || 0))
    .filter(rowWeek => rowWeek && rowWeek < Number(week || 0))
    .sort((a, b) => b - a);
  if (!previousWeeks.length) return [];
  return rows
    .filter(row => Number(row.Week || 0) === previousWeeks[0])
    .map(row => ({
      name: String(row.Name || '').trim(),
      weekPoints: Number(row.WeekPoints || 0),
      total: Number(row.RunningTotal || 0),
      rank: Number(row.Rank || 0)
    }))
    .filter(row => row.name);
}

function buildEmailHighlights_(recap) {
  const text = emailStripHtml_(recap.body);
  const sentences = text
    .split(/(?<=[.!?])\s+/)
    .map(sentence => sentence.trim())
    .filter(Boolean)
    .slice(0, 3)
    .map(sentence => emailTruncate_(sentence, 170));
  if (sentences.length) return sentences;
  return [`${recap.title || 'This week'} is posted on the Weekly Recap page.`];
}

function buildEmailLeaderboardLines_(leaderboard) {
  const rows = ((leaderboard && leaderboard.rows) || []).slice(0, 5);
  if (!rows.length) return ['Standings are posted on the site now.'];
  return rows.map(row => `#${row.rank || '-'} ${row.name}: ${row.total} total points (${row.weekPoints} this week)`);
}

function buildEmailMovementLines_(weekScores, previousScores) {
  if (!weekScores.length) return ['Scores are ready to review on the leaderboard.'];
  const previousByName = new Map((previousScores || []).map(row => [nameKey51_(row.name), row]));
  const movers = weekScores
    .map(row => {
      const previous = previousByName.get(nameKey51_(row.name));
      return {
        name: row.name,
        rank: row.rank,
        previousRank: previous ? previous.rank : null,
        change: previous && previous.rank ? previous.rank - row.rank : 0
      };
    })
    .filter(row => row.previousRank && row.change !== 0)
    .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
    .slice(0, 4);
  if (!movers.length) return ['The standings held steady, which means every point is getting harder to steal.'];
  return movers.map(row => `${row.name} ${row.change > 0 ? 'climbed' : 'slid'} ${Math.abs(row.change)} spot${Math.abs(row.change) === 1 ? '' : 's'} to #${row.rank}.`);
}

function buildEmailPerformanceLines_(weekScores, previousScores) {
  if (!weekScores.length) return ['No weekly score rows were found yet.'];
  const previousByName = new Map((previousScores || []).map(row => [nameKey51_(row.name), row]));
  const topWeekPoints = Math.max.apply(null, weekScores.map(row => row.weekPoints));
  const weeklyWinners = weekScores
    .filter(row => row.weekPoints === topWeekPoints)
    .map(row => `${row.name} led the week with ${row.weekPoints} points.`);
  const comeback = weekScores
    .map(row => {
      const previous = previousByName.get(nameKey51_(row.name));
      return {
        name: row.name,
        gain: previous ? row.total - previous.total : row.weekPoints
      };
    })
    .sort((a, b) => b.gain - a.gain)[0];
  const leaders = weeklyWinners.slice(0, 2);
  if (comeback && !leaders.some(line => line.indexOf(comeback.name) === 0)) {
    leaders.push(`${comeback.name} added ${comeback.gain} total points since the last standings update.`);
  }
  return leaders.length ? leaders : ['Several players kept their torches burning with clutch points this week.'];
}

function getAdminEmailRecipients_(config) {
  const emails = [];
  Object.keys(config || {}).forEach(key => {
    if (!/^AdminEmail/i.test(key)) return;
    String(config[key] || '')
      .split(/[,\s;]+/)
      .map(email => email.trim())
      .filter(Boolean)
      .forEach(email => emails.push(email));
  });
  return Array.from(new Set(emails));
}

function buildPlayerUpdateEmailHtml_(data) {
  const section = (title, lines) => `
    <h2 style="margin:24px 0 8px;color:#244f49;font-size:18px;">${emailEscapeHtml_(title)}</h2>
    <ul style="margin:0;padding-left:20px;">${(lines || []).map(line => `<li style="margin:7px 0;">${emailEscapeHtml_(line)}</li>`).join('')}</ul>
  `;
  return `
    <div style="margin:0;padding:0;background:#f7f0dc;color:#2f2217;font-family:Arial,Helvetica,sans-serif;">
      <div style="max-width:720px;margin:0 auto;padding:28px 18px;">
        <div style="background:#fffaf0;border:1px solid #d7b77a;border-radius:8px;overflow:hidden;">
          <div style="background:#244f49;color:#fff7df;padding:22px 24px;">
            <div style="font-size:13px;text-transform:uppercase;letter-spacing:.08em;">${emailEscapeHtml_(data.seasonName)}</div>
            <h1 style="margin:6px 0 0;font-size:28px;line-height:1.2;">Week ${emailEscapeHtml_(data.week)}: The Tribe Has Been Updated</h1>
          </div>
          <div style="padding:24px;">
            <p style="font-size:16px;line-height:1.55;margin-top:0;">Fresh from Tribal Council: the weekly recap, correct answers, scores, picks, photos, and leaderboard updates are live.</p>
            ${section('Episode Highlights and Key Moments', data.highlights)}
            <h2 style="margin:24px 0 8px;color:#244f49;font-size:18px;">${emailEscapeHtml_(data.title)}</h2>
            <div style="line-height:1.6;">${data.recapHtml}</div>
            ${section('Leaderboard Changes', data.movements)}
            ${section('Current Standings', data.standings)}
            ${section('Notable Player Performances', data.performances)}
            <p style="margin:24px 0 0;line-height:1.55;">Scores, picks, photos, and the weekly recap have all been updated on the site. Start sharpening those reads: Week ${emailEscapeHtml_(data.nextWeek)} is coming, and the next voting round is another chance to make a move.</p>
          </div>
        </div>
      </div>
    </div>
  `;
}

function buildPlayerUpdateEmailText_(data) {
  return [
    `${data.seasonName} - Week ${data.week}: The Tribe Has Been Updated`,
    '',
    'Fresh from Tribal Council: the weekly recap, correct answers, scores, picks, photos, and leaderboard updates are live.',
    '',
    'Episode Highlights and Key Moments',
    (data.highlights || []).map(line => `- ${line}`).join('\n'),
    '',
    data.title,
    data.recapText,
    '',
    'Leaderboard Changes',
    (data.movements || []).map(line => `- ${line}`).join('\n'),
    '',
    'Current Standings',
    (data.standings || []).map(line => `- ${line}`).join('\n'),
    '',
    'Notable Player Performances',
    (data.performances || []).map(line => `- ${line}`).join('\n'),
    '',
    `Scores, picks, photos, and the weekly recap have all been updated on the site. Week ${data.nextWeek} is coming, and the next voting round is another chance to make a move.`
  ].join('\n');
}

function emailStripHtml_(html) {
  return String(html || '')
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<\/p>/gi, '\n')
    .replace(/<li>/gi, '- ')
    .replace(/<\/li>/gi, '\n')
    .replace(/<[^>]*>/g, '')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+\n/g, '\n')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

function emailEscapeHtml_(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

function emailTruncate_(text, limit) {
  const clean = String(text || '').trim();
  if (clean.length <= limit) return clean;
  return `${clean.slice(0, Math.max(0, limit - 3)).trim()}...`;
}

function getAdminContentBlocks(passcode, questionWeek) {
  verifyAdminPasscodeOrThrow_(passcode);
  const config = readConfig_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG));
  const week = Number(questionWeek || config.WeekNumber || 1);
  const questionConfig = getQuestionConfigForWeek_(week, config);
  const savedQuestionConfig = getSavedQuestionWeekConfig_(week);
  const scoringRows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), GAME_SHEETS_51.WEEKSCORING));
  const scoringRow = scoringRows.find(r => Number(r.Week || 0) === week) || null;
  const questionPoints = getQuestionPointsForWeek_(week, config, scoringRow);
  return {
    questionWeek: week,
    hasSavedQuestionWeek: !!savedQuestionConfig,
    q1: sanitizeHtml_(String(questionConfig.Q1 || '')),
    q1Points: questionPoints.q1,
    q2: sanitizeHtml_(String(questionConfig.Q2 || '')),
    q2Points: questionPoints.q2,
    q3: sanitizeHtml_(String(questionConfig.Q3 || '')),
    q3Points: questionPoints.q3,
    q4: sanitizeHtml_(String(questionConfig.Q4 || '')),
    q4Points: questionPoints.q4,
    q5: sanitizeHtml_(String(questionConfig.Q5 || '')),
    q5Points: questionPoints.q5,
    q6: sanitizeHtml_(String(questionConfig.Q6 || '')),
    q6Points: questionPoints.q6,
    q7: sanitizeHtml_(String(questionConfig.Q7 || '')),
    q7Points: questionPoints.q7,
    q8: sanitizeHtml_(String(questionConfig.Q8 || '')),
    q8Points: questionPoints.q8,
    q1Type: normalizeQuestionType_(questionConfig.Q1Type),
    q1Options: String(questionConfig.Q1Options || ''),
    q2Type: normalizeQuestionType_(questionConfig.Q2Type),
    q2Options: String(questionConfig.Q2Options || ''),
    q3Type: normalizeQuestionType_(questionConfig.Q3Type),
    q3Options: String(questionConfig.Q3Options || ''),
    q4Type: normalizeQuestionType_(questionConfig.Q4Type),
    q4Options: String(questionConfig.Q4Options || ''),
    q5Type: normalizeQuestionType_(questionConfig.Q5Type),
    q5Options: String(questionConfig.Q5Options || ''),
    q6Type: normalizeQuestionType_(questionConfig.Q6Type),
    q6Options: String(questionConfig.Q6Options || ''),
    q7Type: normalizeQuestionType_(questionConfig.Q7Type),
    q7Options: String(questionConfig.Q7Options || ''),
    q8Type: normalizeQuestionType_(questionConfig.Q8Type),
    q8Options: String(questionConfig.Q8Options || ''),
    commentPromptTemplate: sanitizeHtml_(String(questionConfig.CommentPromptTemplate || 'Campfire Thoughts')),
    entryFeeAmount: normalizeEntryFeeAmount_(config.EntryFeeAmount),
    campAnnouncementsTitle: sanitizeHtml_(String(config.CampAnnouncementsTitle || 'Camp Announcements')),
    campAnnouncement1: sanitizeHtml_(String(config.CampAnnouncement1 || '')),
    campAnnouncement2: sanitizeHtml_(String(config.CampAnnouncement2 || '')),
    campAnnouncement3: sanitizeHtml_(String(config.CampAnnouncement3 || '')),
    campAnnouncement4: sanitizeHtml_(String(config.CampAnnouncement4 || '')),
    campAnnouncement5: sanitizeHtml_(String(config.CampAnnouncement5 || '')),
    atAGlanceTitle: getCampRulesTitle_(config),
    atAGlance1: sanitizeHtml_(String(config.AtAGlance1 || '')),
    atAGlance2: sanitizeHtml_(String(config.AtAGlance2 || '')),
    atAGlance3: sanitizeHtml_(String(config.AtAGlance3 || '')),
    atAGlance4: sanitizeHtml_(String(config.AtAGlance4 || '')),
    atAGlance5: sanitizeHtml_(String(config.AtAGlance5 || '')),
    atAGlance6: sanitizeHtml_(String(config.AtAGlance6 || '')),
    atAGlance7: sanitizeHtml_(String(config.AtAGlance7 || '')),
    atAGlance8: sanitizeHtml_(String(config.AtAGlance8 || '')),
    atAGlance9: sanitizeHtml_(String(config.AtAGlance9 || '')),
    atAGlance10: sanitizeHtml_(String(config.AtAGlance10 || ''))
  };
}

function getAdminQuestionWeek(passcode, week) {
  verifyAdminPasscodeOrThrow_(passcode);
  const config = readConfig_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG));
  const targetWeek = Number(week || config.WeekNumber || 1);
  if (!targetWeek) throw new Error('Choose a valid week number.');

  return {
    ok: true,
    week: targetWeek,
    contentBlocks: getAdminContentBlocks(passcode, targetWeek)
  };
}

function getAdminResultAnswerChoices(passcode, week) {
  verifyAdminPasscodeOrThrow_(passcode);

  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const targetWeek = Number(week || config.WeekNumber || 1);
  if (!targetWeek) throw new Error('Choose a valid week number.');

  const questionConfig = getQuestionConfigForWeek_(targetWeek, config);
  const castRows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.CAST));
  const weekPicks = readTable_(mustGetSheet_(ss, APP_SHEETS_51.PICKS))
    .filter(row => Number(row.Week || 0) === targetWeek);
  const scoringRow = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING))
    .find(row => Number(row.Week || 0) === targetWeek) || {};
  const questions = getQuestionDefinitions_(questionConfig, castRows)
    .filter(q => q.type !== 'text')
    .map(q => ({
      key: q.key,
      prompt: q.prompt,
      correct: String(scoringRow[`${q.key.toUpperCase()}_Correct`] || '').trim(),
      options: buildAdminResultOptions_(q, weekPicks)
    }));

  return {
    ok: true,
    week: targetWeek,
    questions
  };
}

function buildAdminResultOptions_(question, weekPicks) {
  const byValue = {};
  (question.options || []).forEach(option => {
    const value = String(option.value || '').trim();
    if (!value) return;
    byValue[value.toLowerCase()] = {
      value,
      label: String(option.label || option.value || '').trim()
    };
  });

  const pickColumn = `${question.key.toUpperCase()}_Pick`;
  (weekPicks || []).forEach(row => {
    const value = String(row[pickColumn] || '').trim();
    if (!value || byValue[value.toLowerCase()]) return;
    byValue[value.toLowerCase()] = { value, label: value };
  });

  return Object.keys(byValue)
    .map(key => byValue[key])
    .sort((a, b) => a.label.localeCompare(b.label));
}

function adminSaveContentBlocks(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);

  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  const config = readConfig_(configSheet);
  const currentWeek = Number(config.WeekNumber || 1);
  const questionWeek = Number(payload.questionWeek || payload.week || currentWeek);
  if (!questionWeek) throw new Error('Choose a valid week number.');
  const entryFeeAmount = normalizeEntryFeeAmount_(payload.entryFeeAmount);

  const questionConfig = {
    Q1: cleanQuestionPrompt_(payload.q1),
    Q1Points: pointValueOrBlank_(payload.q1Points),
    Q2: cleanQuestionPrompt_(payload.q2),
    Q2Points: pointValueOrBlank_(payload.q2Points),
    Q3: cleanQuestionPrompt_(payload.q3),
    Q3Points: pointValueOrBlank_(payload.q3Points),
    Q4: cleanQuestionPrompt_(payload.q4),
    Q4Points: pointValueOrBlank_(payload.q4Points),
    Q5: cleanQuestionPrompt_(payload.q5),
    Q5Points: pointValueOrBlank_(payload.q5Points),
    Q6: cleanQuestionPrompt_(payload.q6),
    Q6Points: pointValueOrBlank_(payload.q6Points),
    Q7: cleanQuestionPrompt_(payload.q7),
    Q7Points: pointValueOrBlank_(payload.q7Points),
    Q8: cleanQuestionPrompt_(payload.q8),
    Q8Points: pointValueOrBlank_(payload.q8Points),
    Q1Type: normalizeQuestionType_(payload.q1Type),
    Q1Options: String(payload.q1Options || '').trim(),
    Q2Type: normalizeQuestionType_(payload.q2Type),
    Q2Options: String(payload.q2Options || '').trim(),
    Q3Type: normalizeQuestionType_(payload.q3Type),
    Q3Options: String(payload.q3Options || '').trim(),
    Q4Type: normalizeQuestionType_(payload.q4Type),
    Q4Options: String(payload.q4Options || '').trim(),
    Q5Type: normalizeQuestionType_(payload.q5Type),
    Q5Options: String(payload.q5Options || '').trim(),
    Q6Type: normalizeQuestionType_(payload.q6Type),
    Q6Options: String(payload.q6Options || '').trim(),
    Q7Type: normalizeQuestionType_(payload.q7Type),
    Q7Options: String(payload.q7Options || '').trim(),
    Q8Type: normalizeQuestionType_(payload.q8Type),
    Q8Options: String(payload.q8Options || '').trim(),
    CommentPromptTemplate: cleanQuestionPrompt_(payload.commentPromptTemplate)
  };

  for (let i = 1; i <= 8; i++) {
    if (questionConfig[`Q${i}`] && !questionConfig[`Q${i}Type`]) {
      throw new Error(`Select an Options Source for Q${i} before saving.`);
    }
    if (!questionConfig[`Q${i}`]) {
      questionConfig[`Q${i}Type`] = '';
      questionConfig[`Q${i}Options`] = '';
      questionConfig[`Q${i}Points`] = '';
    }
  }

  upsertQuestionWeekConfig_(questionWeek, questionConfig);

  if (questionWeek === currentWeek) {
    Object.keys(questionConfig).forEach(key => setConfigValue_(configSheet, key, questionConfig[key]));
  }

  setConfigValue_(configSheet, 'CampAnnouncementsTitle', sanitizeHtml_(String(payload.campAnnouncementsTitle || '').trim()));
  setConfigValue_(configSheet, 'EntryFeeAmount', entryFeeAmount);
  setConfigValue_(configSheet, 'CampAnnouncement1', sanitizeHtml_(String(payload.campAnnouncement1 || '').trim()));
  setConfigValue_(configSheet, 'CampAnnouncement2', sanitizeHtml_(String(payload.campAnnouncement2 || '').trim()));
  setConfigValue_(configSheet, 'CampAnnouncement3', sanitizeHtml_(String(payload.campAnnouncement3 || '').trim()));
  setConfigValue_(configSheet, 'CampAnnouncement4', sanitizeHtml_(String(payload.campAnnouncement4 || '').trim()));
  setConfigValue_(configSheet, 'CampAnnouncement5', sanitizeHtml_(String(payload.campAnnouncement5 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlanceTitle', sanitizeHtml_(String(payload.atAGlanceTitle || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance1', sanitizeHtml_(String(payload.atAGlance1 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance2', sanitizeHtml_(String(payload.atAGlance2 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance3', sanitizeHtml_(String(payload.atAGlance3 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance4', sanitizeHtml_(String(payload.atAGlance4 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance5', sanitizeHtml_(String(payload.atAGlance5 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance6', sanitizeHtml_(String(payload.atAGlance6 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance7', sanitizeHtml_(String(payload.atAGlance7 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance8', sanitizeHtml_(String(payload.atAGlance8 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance9', sanitizeHtml_(String(payload.atAGlance9 || '').trim()));
  setConfigValue_(configSheet, 'AtAGlance10', sanitizeHtml_(String(payload.atAGlance10 || '').trim()));

  return { ok: true, week: questionWeek, message: `Week ${questionWeek} questions and camp content updated.` };
}

/* =========================
   VIEWS / DATA TABLES
========================= */

function getLeaderboardData_() {
  const sheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.SCORES);
  const rows = readTable_(sheet);
  if (!rows.length) return getUnscoredLeaderboardData_();

  const latestByPlayer = {};
  rows.forEach((row, index) => {
    const name = String(row.Name || '').trim();
    if (!name) return;
    const key = nameKey51_(name);
    const week = Number(row.Week || 0);
    const existing = latestByPlayer[key];
    if (!existing || week > existing._week || (week === existing._week && index > existing._index)) {
      latestByPlayer[key] = {
        _week: week,
        _index: index,
        rank: Number(row.Rank || 0),
        name,
        weekPoints: Number(row.WeekPoints || 0),
        total: Number(row.RunningTotal || 0)
      };
    }
  });

  const list = Object.keys(latestByPlayer).map(k => latestByPlayer[k]);
  list.sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    if (b.total !== a.total) return b.total - a.total;
    return a.name.localeCompare(b.name);
  });

  const maxWeek = list.reduce((m, r) => Math.max(m, Number(r._week || 0)), 0);
  return {
    week: maxWeek || null,
    rows: list.map(r => ({
      rank: r.rank || '',
      name: r.name,
      weekPoints: r.weekPoints,
      total: r.total
    }))
  };
}

function getUnscoredLeaderboardData_() {
  const players = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PLAYERS))
    .filter(player => String(player.Active || '').trim().toUpperCase() !== 'FALSE')
    .map(player => String(player.Name || '').trim())
    .filter(Boolean)
    .sort((a, b) => a.localeCompare(b));

  return {
    week: null,
    rows: players.map((name, index) => ({
      rank: index + 1,
      name,
      weekPoints: 0,
      total: 0
    }))
  };
}

function getLatestRecap_(config, timezone) {
  const updates = getWeeklyUpdates_(config, timezone);
  if (!updates.length) {
    return {
      week: null,
      title: '',
      body: '<p>Weekly recap coming soon.</p>',
      photos: []
    };
  }

  return updates[0];
}

function getWeeklyUpdates_(config, timezone) {
  const ss = SpreadsheetApp.getActive();
  const recapRows = readTable_(mustGetSheet_(ss, APP_SHEETS_51.RECAPS));
  const photoAlbums = getApprovedTribePhotoAlbums_(config, timezone);
  const photoByWeek = {};
  photoAlbums.forEach(album => photoByWeek[Number(album.week || 0)] = album.photos || []);
  const reactionSummary = getReactionSummary_('');
  const commentsByWeek = getCommentsByWeek_();

  const recapsByWeek = {};
  recapRows.forEach((row, index) => {
    const week = Number(row.Week || 0);
    const body = String(row.RecapHtml || '').trim();
    const title = String(row.Title || '').trim();
    if (!body && !title) return;
    if (config && !isEpisodeContentPublishedForWeek_(week, config, timezone)) return;

    const existing = recapsByWeek[week];
    if (!existing || index > existing._index) {
      recapsByWeek[week] = {
        _week: week,
        _index: index,
        week: week || null,
        title: title || `Week ${week} Recap`,
        body: body || '<p>Weekly recap coming soon.</p>',
        photos: []
      };
    }
  });

  const weeks = Array.from(new Set([
    ...Object.keys(recapsByWeek).map(Number),
    ...Object.keys(photoByWeek).map(Number)
  ])).filter(Boolean).sort((a, b) => b - a);

  return weeks.map(week => {
    const recap = recapsByWeek[week] || {
      week,
      title: `Week ${week} Recap`,
      body: '<p>Weekly recap coming soon.</p>'
    };

    return {
      week,
      targetId: buildInteractionTargetId_('recap', week, ''),
      title: recap.title || `Week ${week} Recap`,
      body: recap.body || '<p>Weekly recap coming soon.</p>',
      reactions: reactionSummary.counts[buildInteractionTargetId_('recap', week, '')] || {},
      comments: commentsByWeek[week] || [],
      photos: (photoByWeek[week] || []).map(photo => ({
        ...photo,
        reactions: reactionSummary.counts[photo.targetId] || {}
      }))
    };
  });
}

function getAvailablePickWeeks() {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PICKS));
  const weeks = Array.from(new Set(rows.map(r => Number(r.Week || 0)).filter(Boolean))).sort((a, b) => b - a);
  return weeks;
}

function getEliteWeekPicks(week) {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const timezone = String(config.Timezone || 'America/Los_Angeles');
  const reveal = getRevealStatus_(config, timezone);
  const targetWeek = Number(week || config.WeekNumber || 1);

  if (!reveal.isVisible && targetWeek === Number(config.WeekNumber || 1)) {
    return {
      hidden: true,
      week: targetWeek,
      headers: {},
      columns: [],
      rows: [],
      correct: {}
    };
  }

  const allPicks = dedupeLatestPicks_(readTable_(mustGetSheet_(ss, APP_SHEETS_51.PICKS)), buildCanonicalNameMap_(readTable_(mustGetSheet_(ss, APP_SHEETS_51.PLAYERS))));
  const weekPicks = allPicks.filter(r => Number(r.Week || 0) === targetWeek);

  const scoringRows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING));
  const scores = readTable_(mustGetSheet_(ss, APP_SHEETS_51.SCORES)).filter(r => Number(r.Week || 0) === targetWeek);
  const scoringRow = scoringRows.find(r => Number(r.Week || 0) === targetWeek) || null;
  const questionPoints = getQuestionPointsForWeek_(targetWeek, config, scoringRow);

  const scoreMap = new Map();
  scores.forEach(r => {
    scoreMap.set(nameKey51_(r.Name), {
      weekPoints: Number(r.WeekPoints || 0),
      total: Number(r.RunningTotal || 0),
      rank: Number(r.Rank || 0)
    });
  });

  const headers = buildEliteHeaders_(weekPicks);
  const correct = buildCorrectMap_(scoringRow);
  const columns = buildEliteQuestionColumns_(weekPicks, headers, correct, questionPoints);

  const rows = weekPicks.map(row => {
    const s = scoreMap.get(nameKey51_(row.Name)) || {};
    return {
      name: String(row.Name || ''),
      email: String(row.Email || ''),
      rank: s.rank || '',
      weekPoints: s.weekPoints ?? '',
      total: s.total ?? '',
      autoAssigned: String(row.AutoAssigned || '').toUpperCase() === 'TRUE',
      picks: {
        q1: String(row.Q1_Pick || ''),
        q2: String(row.Q2_Pick || ''),
        q3: String(row.Q3_Pick || ''),
        q4: String(row.Q4_Pick || ''),
        q5: String(row.Q5_Pick || ''),
        q6: String(row.Q6_Pick || ''),
        q7: String(row.Q7_Pick || ''),
        q8: String(row.Q8_Pick || ''),
        comment: String(row.Comment_Text || '')
      }
    };
  });

  rows.sort((a, b) => {
    if (a.rank && b.rank) return a.rank - b.rank;
    return a.name.localeCompare(b.name);
  });

  return {
    hidden: false,
    week: targetWeek,
    headers,
    columns,
    rows,
    correct
  };
}

function getSeasonResponsesTable() {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  const timezone = String(config.Timezone || 'America/Los_Angeles');
  const reveal = getRevealStatus_(config, timezone);

  const players = readTable_(mustGetSheet_(ss, APP_SHEETS_51.PLAYERS));
  const picks = dedupeLatestPicks_(
    readTable_(mustGetSheet_(ss, APP_SHEETS_51.PICKS)),
    buildCanonicalNameMap_(players)
  );

  const scoringRows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING));
  const scoringMap = buildScoringMap_(scoringRows);

  const currentWeek = Number(config.WeekNumber || 1);

  const visiblePicks = picks.filter(r => {
    const rowWeek = Number(r.Week || 0);
    if (rowWeek < currentWeek) return true;
    return reveal.isVisible;
  });

  const weeks = Array.from(new Set(visiblePicks.map(r => Number(r.Week || 0)).filter(Boolean)))
    .sort((a, b) => b - a);

  const questionKeys = [
    { key: 'q1', labelCol: 'Q1_Label', pickCol: 'Q1_Pick', correctCol: 'Q1_Correct', pointsCol: 'Q1_Points' },
    { key: 'q2', labelCol: 'Q2_Label', pickCol: 'Q2_Pick', correctCol: 'Q2_Correct', pointsCol: 'Q2_Points' },
    { key: 'q3', labelCol: 'Q3_Label', pickCol: 'Q3_Pick', correctCol: 'Q3_Correct', pointsCol: 'Q3_Points' },
    { key: 'q4', labelCol: 'Q4_Label', pickCol: 'Q4_Pick', correctCol: 'Q4_Correct', pointsCol: 'Q4_Points' },
    { key: 'q5', labelCol: 'Q5_Label', pickCol: 'Q5_Pick', correctCol: 'Q5_Correct', pointsCol: 'Q5_Points' },
    { key: 'q6', labelCol: 'Q6_Label', pickCol: 'Q6_Pick', correctCol: 'Q6_Correct', pointsCol: 'Q6_Points' },
    { key: 'q7', labelCol: 'Q7_Label', pickCol: 'Q7_Pick', correctCol: 'Q7_Correct', pointsCol: 'Q7_Points' },
    { key: 'q8', labelCol: 'Q8_Label', pickCol: 'Q8_Pick', correctCol: 'Q8_Correct', pointsCol: 'Q8_Points' }
  ];

  const columns = [];

  weeks.forEach(week => {
    const weekRows = visiblePicks.filter(r => Number(r.Week || 0) === week);
    const scoring = scoringMap[week] || {};
    const questionPoints = getQuestionPointsForWeek_(week, config, scoring);

    questionKeys.forEach(q => {
      const points = questionPoints[q.key] !== '' ? questionPoints[q.key] : scoring[q.pointsCol];
      if (!hasAssignedPointValue_(points)) return;

      const sample = weekRows.find(r => String(r[q.labelCol] || '').trim());
      const label = sample ? String(sample[q.labelCol] || '').trim() : '';
      if (!label) return;

      columns.push({
        week,
        key: q.key,
        label,
        points,
        pickCol: q.pickCol,
        correct: normalizeCorrectList_(scoring[q.correctCol])
      });
    });
  });

  const leaderboard = getLeaderboardData_();
  const rankByName = new Map((leaderboard.rows || []).map(row => [nameKey51_(row.name), Number(row.rank || 0)]));
  const totalByName = new Map((leaderboard.rows || []).map(row => [nameKey51_(row.name), Number(row.total || 0)]));

  const playerNames = Array.from(new Set(visiblePicks.map(r => String(r.Name || '').trim()).filter(Boolean)))
    .sort((a, b) => {
      const aRank = rankByName.get(nameKey51_(a)) || Number.MAX_SAFE_INTEGER;
      const bRank = rankByName.get(nameKey51_(b)) || Number.MAX_SAFE_INTEGER;
      if (aRank !== bRank) return aRank - bRank;
      return a.localeCompare(b);
    });

  const pickIndex = new Map();
  visiblePicks.forEach(r => {
    pickIndex.set(`${Number(r.Week || 0)}||${nameKey51_(r.Name)}`, r);
  });

  const rows = playerNames.map(name => {
    const cells = columns.map(col => {
      const pickRow = pickIndex.get(`${col.week}||${nameKey51_(name)}`) || {};
      const value = String(pickRow[col.pickCol] || '');
      const normalized = value.trim().toLowerCase();
      const correct = (col.correct || []).map(v => String(v || '').trim().toLowerCase());

      return {
        value,
        isCorrect: !!value && correct.length && correct.includes(normalized)
      };
    });

    return {
      rank: rankByName.get(nameKey51_(name)) || '',
      name,
      total: totalByName.get(nameKey51_(name)) || 0,
      cells
    };
  });

  return { weeks, columns, rows };
}

function getBonusLog() {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.BONUSES));
  return rows.map(r => ({
    week: Number(r.Week || 0),
    player: String(r.Player || ''),
    points: Number(r.Points || 0),
    reason: sanitizeHtml_(String(r.Reason || ''))
  }));
}

function getApprovedTribePhotos_(week, config, timezone) {
  if (config && !isEpisodeContentPublishedForWeek_(week, config, timezone)) return [];

  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PHOTOS))
    .filter(r => String(r.Approved || '').trim().toUpperCase() !== 'FALSE')
    .filter(r => Number(r.Week || 0) === Number(week || 0))
    .sort((a, b) => new Date(b.Timestamp || 0) - new Date(a.Timestamp || 0));

  return uniqueBy51_(rows.map(r => ({
    name: String(r.Name || ''),
    caption: sanitizeHtml_(String(r.Caption || '')),
    photoUrl: String(r.PhotoUrl || ''),
    week: Number(r.Week || 0),
    targetId: buildInteractionTargetId_('photo', Number(r.Week || 0), normalizePhotoKey51_({
      photoUrl: String(r.PhotoUrl || ''),
      caption: String(r.Caption || ''),
      name: String(r.Name || '')
    }))
  })), photo => normalizePhotoKey51_(photo));
}

function getApprovedTribePhotoAlbums_(config, timezone) {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PHOTOS))
    .filter(r => String(r.Approved || '').trim().toUpperCase() !== 'FALSE')
    .filter(r => !config || isEpisodeContentPublishedForWeek_(Number(r.Week || 0), config, timezone))
    .filter(r => Number(r.Week || 0) && String(r.PhotoUrl || '').trim())
    .sort((a, b) => {
      const weekDiff = Number(b.Week || 0) - Number(a.Week || 0);
      if (weekDiff !== 0) return weekDiff;
      return new Date(b.Timestamp || 0) - new Date(a.Timestamp || 0);
    });

  const byWeek = {};
  rows.forEach(r => {
    const week = Number(r.Week || 0);
    if (!byWeek[week]) byWeek[week] = [];
      byWeek[week].push({
        name: String(r.Name || ''),
        caption: sanitizeHtml_(String(r.Caption || '')),
        photoUrl: String(r.PhotoUrl || ''),
        week,
        timestamp: String(r.Timestamp || ''),
        targetId: buildInteractionTargetId_('photo', week, normalizePhotoKey51_({
          photoUrl: String(r.PhotoUrl || ''),
          caption: String(r.Caption || ''),
          name: String(r.Name || '')
        }))
      });
  });

  return Object.keys(byWeek)
    .map(Number)
    .sort((a, b) => b - a)
    .map(week => ({
      week,
      title: `Week ${week}`,
      photos: uniqueBy51_(byWeek[week], photo => normalizePhotoKey51_(photo))
    }));
}

function toggleReaction(target, reactionKey, sessionId, name) {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  if (!getInteractionConfig_(config).reactionsEnabled) throw new Error('Reactions are currently closed.');

  const cleanTarget = normalizeInteractionTarget_(target);
  const cleanReaction = normalizeReactionKey_(reactionKey);
  const cleanSession = String(sessionId || '').trim();
  if (!cleanTarget.targetId) throw new Error('Missing reaction target.');
  if (!cleanReaction) throw new Error('Choose a valid reaction.');
  if (!cleanSession) throw new Error('Missing session.');

  ensureSheetWithHeaders_(ss, APP_SHEETS_51.REACTIONS, GAME_HEADERS_51.REACTIONS);
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.REACTIONS);
  const rows = readTable_(sheet);
  let existingRow = null;
  for (let i = rows.length - 1; i >= 0; i--) {
    if (
      String(rows[i].TargetId || '') === cleanTarget.targetId &&
      String(rows[i].Reaction || '') === cleanReaction &&
      String(rows[i].SessionId || '') === cleanSession
    ) {
      existingRow = i + 2;
      break;
    }
  }

  if (existingRow) {
    sheet.deleteRow(existingRow);
  } else {
    sheet.appendRow([
      new Date(),
      cleanTarget.targetId,
      cleanTarget.targetType,
      cleanTarget.week || '',
      cleanReaction,
      cleanSession,
      String(name || '').trim()
    ]);
  }

  return getInteractionState([cleanTarget.targetId], cleanSession);
}

function addRecapComment(week, name, comment, sessionId) {
  const ss = SpreadsheetApp.getActive();
  const config = readConfig_(mustGetSheet_(ss, APP_SHEETS_51.CONFIG));
  if (!getInteractionConfig_(config).commentsEnabled) throw new Error('Comments are currently closed.');

  const cleanWeek = Number(week || 0);
  const cleanName = normalizePlayerDisplayName51_(name);
  const cleanComment = String(comment || '').replace(/<[^>]*>/g, '').trim();
  if (!cleanWeek) throw new Error('Missing recap week.');
  if (!cleanName) throw new Error('Enter your player name.');
  if (!cleanComment) throw new Error('Write a comment before posting.');

  ensureSheetWithHeaders_(ss, APP_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.COMMENTS);
  const commentId = `comment-${Date.now()}-${Math.floor(Math.random() * 100000)}`;
  sheet.appendRow([commentId, new Date(), cleanWeek, cleanName, cleanComment.slice(0, 1200), 'FALSE', 'FALSE']);
  return {
    ok: true,
    comments: getCommentsByWeek_()[cleanWeek] || []
  };
}

function getInteractionState(targetIds, sessionId) {
  const summary = getReactionSummary_(String(sessionId || '').trim());
  const requested = (targetIds || []).map(String).filter(Boolean);
  const out = {};
  requested.forEach(targetId => {
    out[targetId] = {
      counts: summary.counts[targetId] || {},
      selected: summary.selected[targetId] || {}
    };
  });
  return {
    reactionTypes: REACTION_TYPES_51,
    targets: out
  };
}

function adminSaveInteractionSettings(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);
  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.CONFIG);
  setConfigValue_(configSheet, 'InteractionsEnabled', payload && payload.reactionsEnabled ? 'TRUE' : 'FALSE');
  setConfigValue_(configSheet, 'CommentsEnabled', payload && payload.commentsEnabled ? 'TRUE' : 'FALSE');
  return { ok: true, message: 'Interaction settings saved.' };
}

function adminDeleteComment(passcode, commentId) {
  verifyAdminPasscodeOrThrow_(passcode);
  updateCommentAdminFlag_(commentId, 'Deleted', 'TRUE');
  return { ok: true, message: 'Comment deleted.', comments: getAdminComments_() };
}

function adminPinComment(passcode, commentId, pinned) {
  verifyAdminPasscodeOrThrow_(passcode);
  if (pinned) unpinOtherCommentsForSameWeek_(commentId);
  updateCommentAdminFlag_(commentId, 'Pinned', pinned ? 'TRUE' : 'FALSE');
  return { ok: true, message: pinned ? 'Comment pinned.' : 'Comment unpinned.', comments: getAdminComments_() };
}

function getReactionSummary_(sessionId) {
  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.REACTIONS, GAME_HEADERS_51.REACTIONS);
  const counts = {};
  const selected = {};
  readTable_(mustGetSheet_(ss, APP_SHEETS_51.REACTIONS)).forEach(row => {
    const targetId = String(row.TargetId || '').trim();
    const reaction = normalizeReactionKey_(row.Reaction);
    if (!targetId || !reaction) return;
    if (!counts[targetId]) counts[targetId] = {};
    counts[targetId][reaction] = (counts[targetId][reaction] || 0) + 1;
    if (sessionId && String(row.SessionId || '') === sessionId) {
      if (!selected[targetId]) selected[targetId] = {};
      selected[targetId][reaction] = true;
    }
  });
  return { counts, selected };
}

function getCommentsByWeek_() {
  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
  const reactionSummary = getReactionSummary_('');
  const byWeek = {};
  readTable_(mustGetSheet_(ss, APP_SHEETS_51.COMMENTS))
    .filter(row => String(row.Deleted || '').trim().toUpperCase() !== 'TRUE')
    .forEach(row => {
      const week = Number(row.Week || 0);
      if (!week) return;
      if (!byWeek[week]) byWeek[week] = [];
      const commentId = String(row.CommentId || '').trim();
      const targetId = buildInteractionTargetId_('comment', week, commentId);
      byWeek[week].push({
        commentId,
        targetId,
        week,
        name: String(row.Name || ''),
        text: sanitizeHtml_(String(row.Comment || '')),
        timestamp: row.Timestamp ? new Date(row.Timestamp).toISOString() : '',
        timestampLabel: row.Timestamp ? Utilities.formatDate(new Date(row.Timestamp), Session.getScriptTimeZone() || 'America/Los_Angeles', 'MMM d, h:mm a') : '',
        pinned: String(row.Pinned || '').trim().toUpperCase() === 'TRUE',
        reactions: reactionSummary.counts[targetId] || {}
      });
    });
  Object.keys(byWeek).forEach(week => {
    byWeek[week].sort((a, b) => {
      if (a.pinned !== b.pinned) return a.pinned ? -1 : 1;
      return new Date(b.timestamp || 0) - new Date(a.timestamp || 0);
    });
  });
  return byWeek;
}

function getAdminComments_() {
  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
  return readTable_(mustGetSheet_(ss, APP_SHEETS_51.COMMENTS))
    .map(row => ({
      commentId: String(row.CommentId || ''),
      week: Number(row.Week || 0),
      name: String(row.Name || ''),
      text: String(row.Comment || ''),
      timestamp: row.Timestamp ? new Date(row.Timestamp).toISOString() : '',
      pinned: String(row.Pinned || '').trim().toUpperCase() === 'TRUE',
      deleted: String(row.Deleted || '').trim().toUpperCase() === 'TRUE'
    }))
    .filter(row => !row.deleted)
    .sort((a, b) => new Date(b.timestamp || 0) - new Date(a.timestamp || 0))
    .slice(0, 60);
}

function updateCommentAdminFlag_(commentId, field, value) {
  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.COMMENTS);
  const headers = getHeaders_(sheet);
  const fieldIndex = headers.indexOf(field);
  const idIndex = headers.indexOf('CommentId');
  if (fieldIndex < 0 || idIndex < 0) throw new Error('Comments sheet is missing required columns.');
  const values = sheet.getDataRange().getValues();
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIndex] || '') === String(commentId || '')) {
      sheet.getRange(i + 1, fieldIndex + 1).setValue(value);
      return;
    }
  }
  throw new Error('Comment not found.');
}

function unpinOtherCommentsForSameWeek_(commentId) {
  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, APP_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
  const sheet = mustGetSheet_(ss, APP_SHEETS_51.COMMENTS);
  const headers = getHeaders_(sheet);
  const idIndex = headers.indexOf('CommentId');
  const weekIndex = headers.indexOf('Week');
  const pinnedIndex = headers.indexOf('Pinned');
  if (idIndex < 0 || weekIndex < 0 || pinnedIndex < 0) return;
  const values = sheet.getDataRange().getValues();
  let targetWeek = '';
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][idIndex] || '') === String(commentId || '')) {
      targetWeek = String(values[i][weekIndex] || '');
      break;
    }
  }
  if (!targetWeek) return;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][weekIndex] || '') === targetWeek && String(values[i][idIndex] || '') !== String(commentId || '')) {
      sheet.getRange(i + 1, pinnedIndex + 1).setValue('FALSE');
    }
  }
}

function normalizeInteractionTarget_(target) {
  const raw = typeof target === 'string' ? { targetId: target } : (target || {});
  const targetId = String(raw.targetId || '').trim();
  const parts = targetId.split(':');
  return {
    targetId,
    targetType: String(raw.targetType || parts[0] || '').trim(),
    week: Number(raw.week || parts[1] || 0)
  };
}

function normalizeReactionKey_(reaction) {
  const key = String(reaction || '').trim();
  return REACTION_TYPES_51.some(item => item.key === key) ? key : '';
}

function buildInteractionTargetId_(type, week, key) {
  const safeType = String(type || '').trim().toLowerCase().replace(/[^a-z0-9-]+/g, '-');
  const safeWeek = Number(week || 0);
  const safeKey = String(key || '').trim().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80);
  return [safeType, safeWeek, safeKey].filter(part => part !== '' && part !== 0).join(':');
}

/* =========================
   STATUS / TIME HELPERS
========================= */

function getVotingStatus_(config, timezone) {
  const manual = String(config.VotingOpen || '').trim().toUpperCase();
  const openDay = config.OpenDay || 'Monday';
  const openTime = config.OpenTime || '12:00 AM';
  const openRule = parseRule_(openDay, openTime);
  const closeRule = parseRule_(config.CloseDay, config.CloseTime);
  const now = new Date();
  const openLabel = buildRuleLabel_(openDay, openTime);
  const deadlineLabel = buildRuleLabel_(config.CloseDay, config.CloseTime);

  if (manual === 'TRUE' || manual === 'OPEN' || manual === 'YES') {
    return {
      isOpen: true,
      isManualOverride: true,
      statusText: 'Open',
      openLabel,
      openIso: computeNextOccurrenceIso_(now, timezone, openRule.dayNum, openRule.totalMinutes),
      deadlineLabel,
      deadlineIso: computeNextOccurrenceIso_(now, timezone, closeRule.dayNum, closeRule.totalMinutes)
    };
  }

  if (manual === 'FALSE' || manual === 'CLOSED' || manual === 'NO') {
    return {
      isOpen: false,
      isManualOverride: true,
      statusText: 'Closed',
      openLabel,
      openIso: computeNextOccurrenceIso_(now, timezone, openRule.dayNum, openRule.totalMinutes),
      deadlineLabel,
      deadlineIso: computeNextOccurrenceIso_(now, timezone, closeRule.dayNum, closeRule.totalMinutes)
    };
  }

  const nowDay = Number(Utilities.formatDate(now, timezone, 'u'));
  const nowMinutes =
    Number(Utilities.formatDate(now, timezone, 'H')) * 60 +
    Number(Utilities.formatDate(now, timezone, 'm'));

  const nowWeekMinutes = (nowDay - 1) * 1440 + nowMinutes;
  const openWeekMinutes = (openRule.dayNum - 1) * 1440 + openRule.totalMinutes;
  const closeWeekMinutes = (closeRule.dayNum - 1) * 1440 + closeRule.totalMinutes;
  const isOpen = openWeekMinutes < closeWeekMinutes
    ? nowWeekMinutes >= openWeekMinutes && nowWeekMinutes < closeWeekMinutes
    : nowWeekMinutes >= openWeekMinutes || nowWeekMinutes < closeWeekMinutes;

  return {
    isOpen,
    isManualOverride: false,
    statusText: isOpen ? 'Open' : 'Closed',
    openLabel,
    openIso: computeNextOccurrenceIso_(now, timezone, openRule.dayNum, openRule.totalMinutes),
    deadlineLabel,
    deadlineIso: computeNextOccurrenceIso_(now, timezone, closeRule.dayNum, closeRule.totalMinutes)
  };
}

function getRevealStatus_(config, timezone) {
  const now = new Date();
  const publishDay = config.RevealDay || config.EpisodeDay;
  const publishTime = config.RevealTime || config.EpisodeTime;
  const rule = parseRule_(publishDay, publishTime);
  const nowDay = Number(Utilities.formatDate(now, timezone, 'u'));
  const nowMinutes =
    Number(Utilities.formatDate(now, timezone, 'H')) * 60 +
    Number(Utilities.formatDate(now, timezone, 'm'));

  const isVisible = nowDay > rule.dayNum || (nowDay === rule.dayNum && nowMinutes >= rule.totalMinutes);

  return {
    isVisible,
    revealLabel: buildRuleLabel_(publishDay, publishTime),
    revealIso: computeUpcomingOrCurrentIso_(now, timezone, rule.dayNum, rule.totalMinutes, !isVisible)
  };
}

function getEpisodeStatus_(config, timezone) {
  const now = new Date();
  const rule = parseRule_(config.EpisodeDay, config.EpisodeTime);
  return {
    label: buildRuleLabel_(config.EpisodeDay, config.EpisodeTime),
    nextEpisodeIso: computeNextOccurrenceIso_(now, timezone, rule.dayNum, rule.totalMinutes)
  };
}

function parseRule_(day, time) {
  const dayNum = dayNameToNum_(day);
  const totalMinutes = parseTimeToMinutes_(time);
  if (!dayNum || totalMinutes == null) throw new Error('Invalid day/time rule in Config.');
  return { dayNum, totalMinutes };
}

function buildRuleLabel_(day, time) {
  const safeDay = String(day || '').trim();
  const safeTime = String(time || '').trim();
  return safeDay && safeTime ? `${safeDay} ${safeTime}` : 'Not set';
}

function formatTimeForInput_(value) {
  const totalMinutes = parseTimeToMinutes_(value);
  if (totalMinutes == null) return '';
  const hours = String(Math.floor(totalMinutes / 60)).padStart(2, '0');
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  return `${hours}:${minutes}`;
}

function formatTimeForConfig_(value) {
  const totalMinutes = parseTimeToMinutes_(value);
  if (totalMinutes == null) throw new Error('Enter a valid time.');
  const hour24 = Math.floor(totalMinutes / 60);
  const minutes = String(totalMinutes % 60).padStart(2, '0');
  const suffix = hour24 >= 12 ? 'PM' : 'AM';
  return `${hour24 % 12 || 12}:${minutes} ${suffix}`;
}

function normalizeEntryFeeAmount_(value) {
  const raw = String(value == null || value === '' ? '20' : value).replace(/[$,]/g, '').trim();
  const amount = Number(raw);
  if (!Number.isFinite(amount) || amount < 0) throw new Error('Entry fee amount must be zero or greater.');
  return amount % 1 === 0 ? String(amount) : amount.toFixed(2);
}

function computeUpcomingOrCurrentIso_(now, timezone, dayNum, totalMinutes, forwardOnly) {
  const currentDayNum = Number(Utilities.formatDate(now, timezone, 'u'));
  let offsetDays = dayNum - currentDayNum;

  if (forwardOnly && offsetDays < 0) offsetDays += 7;
  if (!forwardOnly && offsetDays > 0) offsetDays -= 7;

  const baseYear = Number(Utilities.formatDate(now, timezone, 'yyyy'));
  const baseMonth = Number(Utilities.formatDate(now, timezone, 'M')) - 1;
  const baseDay = Number(Utilities.formatDate(now, timezone, 'd'));
  const midnight = new Date(baseYear, baseMonth, baseDay, 0, 0, 0, 0);
  const target = new Date(midnight.getTime() + offsetDays * 24 * 60 * 60 * 1000);

  target.setHours(Math.floor(totalMinutes / 60), totalMinutes % 60, 0, 0);
  return target.toISOString();
}

function computeNextOccurrenceIso_(now, timezone, dayNum, totalMinutes) {
  let iso = computeUpcomingOrCurrentIso_(now, timezone, dayNum, totalMinutes, true);
  const target = new Date(iso);
  if (target.getTime() <= now.getTime()) {
    target.setDate(target.getDate() + 7);
    return target.toISOString();
  }
  return iso;
}

/* =========================
   SMALL HELPERS
========================= */

function getSubmissionCountForWeek_(week) {
  const rows = dedupeLatestPicks_(readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PICKS)), buildCanonicalNameMap_(readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.PLAYERS))));
  return rows.filter(r => Number(r.Week || 0) === Number(week || 0)).length;
}

function getScoresSummary_() {
  const rows = readTable_(mustGetSheet_(SpreadsheetApp.getActive(), APP_SHEETS_51.SCORES));
  if (!rows.length) return { week: null, count: 0 };

  let latestWeek = 0;
  rows.forEach(r => latestWeek = Math.max(latestWeek, Number(r.Week || 0)));
  return {
    week: latestWeek || null,
    count: rows.filter(r => Number(r.Week || 0) === latestWeek).length
  };
}

function buildEliteHeaders_(rows) {
  const sample = rows[0] || {};
  return {
    q1: String(sample.Q1_Label || 'Q1'),
    q2: String(sample.Q2_Label || 'Q2'),
    q3: String(sample.Q3_Label || 'Q3'),
    q4: String(sample.Q4_Label || 'Q4'),
    q5: String(sample.Q5_Label || 'Q5'),
    q6: String(sample.Q6_Label || 'Q6'),
    q7: String(sample.Q7_Label || 'Q7'),
    q8: String(sample.Q8_Label || 'Q8'),
    comment: String(sample.Comment_Label || 'Comment')
  };
}

function buildCorrectMap_(scoringRow) {
  if (!scoringRow) return {};
  return {
    q1: normalizeCorrectList_(scoringRow.Q1_Correct),
    q2: normalizeCorrectList_(scoringRow.Q2_Correct),
    q3: normalizeCorrectList_(scoringRow.Q3_Correct),
    q4: normalizeCorrectList_(scoringRow.Q4_Correct),
    q5: normalizeCorrectList_(scoringRow.Q5_Correct),
    q6: normalizeCorrectList_(scoringRow.Q6_Correct),
    q7: normalizeCorrectList_(scoringRow.Q7_Correct),
    q8: normalizeCorrectList_(scoringRow.Q8_Correct)
  };
}

function buildEliteQuestionColumns_(rows, headers, correct, points) {
  const defs = [
    { key: 'q1', labelCol: 'Q1_Label', pickCol: 'Q1_Pick' },
    { key: 'q2', labelCol: 'Q2_Label', pickCol: 'Q2_Pick' },
    { key: 'q3', labelCol: 'Q3_Label', pickCol: 'Q3_Pick' },
    { key: 'q4', labelCol: 'Q4_Label', pickCol: 'Q4_Pick' },
    { key: 'q5', labelCol: 'Q5_Label', pickCol: 'Q5_Pick' },
    { key: 'q6', labelCol: 'Q6_Label', pickCol: 'Q6_Pick' },
    { key: 'q7', labelCol: 'Q7_Label', pickCol: 'Q7_Pick' },
    { key: 'q8', labelCol: 'Q8_Label', pickCol: 'Q8_Pick' }
  ];

  return defs
    .map(def => ({
      key: def.key,
      label: String(((rows || []).find(row => String(row[def.labelCol] || '').trim()) || {})[def.labelCol] || '').trim(),
      pickCol: def.pickCol,
      correct: (correct && correct[def.key]) || [],
      points: points ? points[def.key] : ''
    }))
    .filter(col => {
      if (!col.label) return false;
      return (rows || []).some(row => String(row[col.pickCol] || '').trim());
    });
}

function normalizeCorrectList_(value) {
  return String(value || '')
    .split('|')
    .map(v => String(v || '').trim())
    .filter(Boolean);
}

function hasAssignedPointValue_(value) {
  return String(value ?? '').trim() !== '';
}

function stripHtmlForValidation_(html) {
  return String(html || '').replace(/<[^>]*>/g, '').trim() || 'this question';
}

function getCampRulesTitle_(config) {
  const title = sanitizeHtml_(String((config && config.AtAGlanceTitle) || '').trim());
  const plain = String(title || '').replace(/<[^>]*>/g, '').trim().toLowerCase();
  return !plain || plain === 'at a glance' || plain === 'camp rules' ? 'How to Play' : title;
}

function uniqueBy51_(items, keyFn) {
  const seen = new Set();
  return (items || []).filter(item => {
    const key = String(keyFn(item) || '').trim();
    if (!key) return true;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function normalizePhotoKey51_(photo) {
  return [
    normalizeTextKey51_(photo && photo.photoUrl),
    normalizeTextKey51_(photo && photo.caption),
    normalizeTextKey51_(photo && photo.name)
  ].join('|');
}

function normalizeTextKey51_(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function isEpisodeContentPublishedForWeek_(week, config, timezone) {
  const targetWeek = Number(week || 0);
  const currentWeek = Number(config.WeekNumber || 1);
  if (!targetWeek) return false;
  if (targetWeek < currentWeek) return true;
  if (targetWeek > currentWeek) return false;

  const now = new Date();
  const rule = parseRule_(config.EpisodeDay, config.EpisodeTime);
  const nowDay = Number(Utilities.formatDate(now, timezone || 'America/Los_Angeles', 'u'));
  const nowMinutes =
    Number(Utilities.formatDate(now, timezone || 'America/Los_Angeles', 'H')) * 60 +
    Number(Utilities.formatDate(now, timezone || 'America/Los_Angeles', 'm'));

  return nowDay > rule.dayNum || (nowDay === rule.dayNum && nowMinutes >= rule.totalMinutes);
}

function sanitizeHtml_(html) {
  const source = String(html || '')
    .replace(/&(?:amp;)*nbsp;|&#(?:160|x0*a0);|\u00a0/gi, ' ');
  const allowedTags = new Set([
    'div', 'p', 'br', 'strong', 'b', 'em', 'i', 'u', 's',
    'ul', 'ol', 'li', 'blockquote', 'h1', 'h2', 'h3', 'h4', 'a'
  ]);
  const voidTags = new Set(['br']);

  function escapeText_(value) {
    return String(value || '')
      .replace(/&(?!(?:amp|lt|gt|quot|apos|#39|#\d+|#x[0-9a-f]+);)/gi, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function safeHref_(tag) {
    const match = String(tag || '').match(/\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s"'=<>`]+))/i);
    const href = match ? String(match[1] || match[2] || match[3] || '').trim() : '';
    if (!/^(https?:|mailto:)/i.test(href)) return '';
    return href
      .replace(/&(?!(?:amp|lt|gt|quot|apos|#39|#\d+|#x[0-9a-f]+);)/gi, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  let output = '';
  let cursor = 0;
  const tagPattern = /<[^>]*>/g;
  let match;
  while ((match = tagPattern.exec(source)) !== null) {
    output += escapeText_(source.slice(cursor, match.index));
    const rawTag = match[0];
    const nameMatch = rawTag.match(/^<\s*(\/?)\s*([a-z0-9]+)/i);
    if (nameMatch) {
      const closing = !!nameMatch[1];
      const tagName = nameMatch[2].toLowerCase();
      if (allowedTags.has(tagName)) {
        if (closing) {
          if (!voidTags.has(tagName)) output += `</${tagName}>`;
        } else if (tagName === 'a') {
          const href = safeHref_(rawTag);
          output += href ? `<a href="${href}" target="_blank" rel="noopener noreferrer">` : '<a>';
        } else {
          output += `<${tagName}>`;
        }
      }
    }
    cursor = tagPattern.lastIndex;
  }
  output += escapeText_(source.slice(cursor));
  return output;
}
