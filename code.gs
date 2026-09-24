/***** Survivor 51 App Engine — unified setup, scoring, admin, uploads *****/

const GAME_SHEETS_51 = {
  CONFIG: 'Config',
  PLAYERS: 'Players',
  CAST: 'CastStatus',
  TRIBES: 'Tribes',
  PICKS: 'Picks',
  WEEKSCORING: 'WeekScoring',
  SCORES: 'Scores',
  PLAYERBONUSES: 'PlayerBonuses',
  WEEKRECAPS: 'WeekRecaps',
  PHOTOS: 'Photos',
  QUESTIONWEEKS: 'QuestionWeeks',
  REACTIONS: 'Reactions',
  COMMENTS: 'Comments',
  CAPTIONCONTESTS: 'CaptionContests',
  CAPTIONS: 'CaptionSubmissions',
  CAPTIONVOTES: 'CaptionVotes'
};

const GAME_HEADERS_51 = {
  CONFIG: ['Key', 'Value'],
  PLAYERS: ['Name', 'Active', 'TribalKey'],
  CAST: ['Name', 'Status', 'PhotoUrl', 'Team', 'Bio', 'Age', 'Hometown', 'Occupation', 'Details'],
  TRIBES: ['Name', 'PhotoUrl', 'Description'],
  PICKS: [
    'Timestamp',
    'Week',
    'Name',
    'Email',
    'Q1_Label', 'Q1_Pick',
    'Q2_Label', 'Q2_Pick',
    'Q3_Label', 'Q3_Pick',
    'Q4_Label', 'Q4_Pick',
    'Q5_Label', 'Q5_Pick',
    'Q6_Label', 'Q6_Pick',
    'Q7_Label', 'Q7_Pick',
    'Q8_Label', 'Q8_Pick',
    'Comment_Label', 'Comment_Text',
    'SubmittedByAdmin',
    'AutoAssigned',
    'PenaltyApplied'
  ],
  WEEKSCORING: [
    'Week',
    'Q1_Correct', 'Q1_Points',
    'Q2_Correct', 'Q2_Points',
    'Q3_Correct', 'Q3_Points',
    'Q4_Correct', 'Q4_Points',
    'Q5_Correct', 'Q5_Points',
    'Q6_Correct', 'Q6_Points',
    'Q7_Correct', 'Q7_Points',
    'Q8_Correct', 'Q8_Points',
    'Q1_CorrectPlus', 'Q1_CorrectPlus_Points',
    'Q1_CorrectMinus', 'Q1_CorrectMinus_Points'
  ],
  SCORES: ['Week', 'Name', 'Email', 'WeekPoints', 'RunningTotal', 'Rank'],
  PLAYERBONUSES: ['Week', 'Player', 'Points', 'Reason'],
  WEEKRECAPS: ['Week', 'Title', 'RecapHtml'],
  PHOTOS: ['Timestamp', 'Week', 'Name', 'Email', 'Caption', 'PhotoUrl', 'DriveFileId', 'Approved'],
  REACTIONS: ['Timestamp', 'TargetId', 'TargetType', 'Week', 'Reaction', 'SessionId', 'Name'],
  COMMENTS: ['CommentId', 'Timestamp', 'Week', 'Name', 'Comment', 'Pinned', 'Deleted', 'ParentCommentId'],
  CAPTIONCONTESTS: ['Week', 'PhotoUrl', 'DriveFileId', 'Points', 'SubmissionsOpen', 'VotingOpen', 'WinnerCaptionId', 'Finalized', 'UpdatedAt', 'Deadline'],
  CAPTIONS: ['CaptionId', 'Timestamp', 'Week', 'Name', 'Caption', 'Deleted'],
  CAPTIONVOTES: ['Timestamp', 'Week', 'CaptionId', 'Name'],
  QUESTIONWEEKS: [
    'Week',
    'Q1', 'Q1Points', 'Q1Type', 'Q1Options',
    'Q2', 'Q2Points', 'Q2Type', 'Q2Options',
    'Q3', 'Q3Points', 'Q3Type', 'Q3Options',
    'Q4', 'Q4Points', 'Q4Type', 'Q4Options',
    'Q5', 'Q5Points', 'Q5Type', 'Q5Options',
    'Q6', 'Q6Points', 'Q6Type', 'Q6Options',
    'Q7', 'Q7Points', 'Q7Type', 'Q7Options',
    'Q8', 'Q8Points', 'Q8Type', 'Q8Options',
    'CommentPromptTemplate'
  ]
};

const SURVIVOR_THEMED_AUTO_COMMENTS = [
  'I was too busy searching for a hidden immunity idol to answer this question.',
  'Jeff snuffed my attention span before I could finish typing.',
  'Camp life got rough and I missed Tribal again.',
  'My alliance told me the deadline was tomorrow. Suspicious behavior, honestly.',
  'I went looking for firewood and somehow lost an entire voting window.',
  'I was practicing my Final Tribal speech and forgot this Tribal Council was happening.',
  'The tribe asked for my thoughts, but I was face-first in the shelter pretending to be useful.',
  'I got blindsided by the deadline. Classic merge episode energy.',
  'I hid from the vote so well that even I could not find my parchment.',
  'I was on a reward challenge in my imagination and missed the whole thing.',
  'I trusted the wrong alliance member with calendar management.',
  'I was conserving energy for immunity and accidentally conserved all my answers too.',
  'The jungle whispered "five more minutes" and I believed it.',
  'I thought this was a non-elimination episode for my responsibilities.',
  'My strategy was to lay low. Possibly too low.'
];

const SURVIVOR_THEMED_AUTO_COMMENT_TOPICS = {
  idol: [
    'I was too busy digging for an idol that was absolutely not there.',
    'I found three suspicious sticks and zero time to answer this question.',
    'I followed an idol clue into the woods and came back after the deadline.'
  ],
  alliance: [
    'My alliance said they had this covered, which is exactly what a bad alliance would say.',
    'I trusted my alliance with the deadline and immediately regretted that social game.',
    'I was busy making a final three deal with everyone at camp.'
  ],
  blindside: [
    'I got blindsided by the clock, and the clock did not even split the vote.',
    'The deadline came out of nowhere with a perfect blindside.',
    'I would explain my read, but the schedule pulled off the bigger move.'
  ],
  strategy: [
    'My strategy was to stay under the radar, and apparently under the deadline too.',
    'I call this a bold social experiment in letting fate make my picks.',
    'I was workshopping a master plan and forgot step one was submitting it.'
  ],
  challenge: [
    'I was saving my energy for immunity and forgot typing was also a challenge.',
    'The real challenge was remembering the deadline, and I did not win immunity.',
    'I dropped my focus before the puzzle portion.'
  ]
};

/* =========================
   ONE-TIME SETUP
========================= */

function setupSurvivorApp_FAST() {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    const ss = SpreadsheetApp.getActive();

    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.CONFIG, GAME_HEADERS_51.CONFIG);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.PLAYERS, GAME_HEADERS_51.PLAYERS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.CAST, GAME_HEADERS_51.CAST);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.TRIBES, GAME_HEADERS_51.TRIBES);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.PICKS, GAME_HEADERS_51.PICKS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.WEEKSCORING, GAME_HEADERS_51.WEEKSCORING);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.SCORES, GAME_HEADERS_51.SCORES);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.PLAYERBONUSES, GAME_HEADERS_51.PLAYERBONUSES);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.WEEKRECAPS, GAME_HEADERS_51.WEEKRECAPS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.PHOTOS, GAME_HEADERS_51.PHOTOS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.QUESTIONWEEKS, GAME_HEADERS_51.QUESTIONWEEKS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.REACTIONS, GAME_HEADERS_51.REACTIONS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.COMMENTS, GAME_HEADERS_51.COMMENTS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.CAPTIONCONTESTS, GAME_HEADERS_51.CAPTIONCONTESTS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.CAPTIONS, GAME_HEADERS_51.CAPTIONS);
    ensureSheetWithHeaders_(ss, GAME_SHEETS_51.CAPTIONVOTES, GAME_HEADERS_51.CAPTIONVOTES);

    seedAppConfigIfMissing_();
    migrateLegacyTeamConfig_();
    removeLegacyBonusQuestionConfig_();
    formatAllSheets_();

    return {
      ok: true,
      message: 'Season 51 app sheets are ready.'
    };
  } finally {
    lock.releaseLock();
  }
}

function seedAppConfigIfMissing_() {
  const ss = SpreadsheetApp.getActive();
  const configSheet = mustGetSheet_(ss, GAME_SHEETS_51.CONFIG);
  const existing = readConfig_(configSheet);

  const defaults = {
    SeasonName: 'Survivor Season 51',
    TribeLedgerTitle: 'The Tribal Ledger',
    TribeLedgerSubtitle: 'Outwit • Outplay • Outlast • Outscore',
    WeekNumber: 1,
    FinalWeek: 13,
    MergeWeek: 8,
    SeasonPhaseMode: 'AUTO',
    SeasonPhaseManual: 'premiere',
    Timezone: 'America/Los_Angeles',
    VotingOpen: 'AUTO',
    OpenDay: 'Monday',
    OpenTime: '12:00 AM',
    CloseDay: 'Wednesday',
    CloseTime: '9:00 AM',
    RevealDay: 'Wednesday',
    RevealTime: '12:00 PM',
    NoonCampPicksMigrationComplete: 'TRUE',
    EntryFeeAmount: '20',
    EpisodeDay: 'Wednesday',
    EpisodeTime: '8:00 PM',
    FirstEpisodeDate: '2026-09-23',
    AdminPasscode: '',
    LimitedAdminPasscodes: '',
    AdminEmail: Session.getActiveUser().getEmail() || '',
    Q1: '',
    Q1Points: '',
    Q1Type: '',
    Q1Options: '',
    Q2: '',
    Q2Points: '',
    Q2Type: '',
    Q2Options: '',
    Q3: '',
    Q3Points: '',
    Q3Type: '',
    Q3Options: '',
    Q4: '',
    Q4Points: '',
    Q4Type: '',
    Q4Options: '',
    Q5: '',
    Q5Points: '',
    Q5Type: '',
    Q5Options: '',
    Q6: '',
    Q6Points: '',
    Q6Type: '',
    Q6Options: '',
    Q7: '',
    Q7Points: '',
    Q7Type: '',
    Q7Options: '',
    Q8: '',
    Q8Points: '',
    Q8Type: '',
    Q8Options: '',
    CommentPromptTemplate: '',
    CampAnnouncementsTitle: 'Camp Announcements',
    CampAnnouncement1: '',
    CampAnnouncement2: '',
    CampAnnouncement3: '',
    CampAnnouncement4: '',
    CampAnnouncement5: '',
    AtAGlanceTitle: 'How to Play',
    AtAGlance1: '',
    AtAGlance2: '',
    AtAGlance3: '',
    AtAGlance4: '',
    AtAGlance5: '',
    AtAGlance6: '',
    AtAGlance7: '',
    AtAGlance8: '',
    AtAGlance9: '',
    AtAGlance10: '',
    PhotoUploadTitle: 'Tribe Snapshots',
    PhotoUploadInstructions: 'Drop your Survivor-themed photo here for the tribe.',
    PhotoDriveFolderId: '',
    AdminChangeLogSpreadsheetId: '',
    AdminChangeLogFolderId: '1C7GzvLWvXNEExDeyv-EVI--3QJ7HTVJ_',
    InteractionsEnabled: 'TRUE',
    CommentsEnabled: 'TRUE',
    Team1Name: '',
    Team1PhotoUrl: '',
    Team2Name: '',
    Team2PhotoUrl: '',
    Team3Name: '',
    Team3PhotoUrl: ''
  };

  // Blank prompts never acquire metadata, even when older defaults are present.
  for (let i = 1; i <= 8; i++) {
    if (cleanQuestionPrompt_(existing['Q' + i])) continue;
    ['Type', 'Points', 'Options'].forEach(suffix => {
      const key = 'Q' + i + suffix;
      if (existing[key] !== undefined && existing[key] !== '') {
        setConfigValue_(configSheet, key, '');
        existing[key] = '';
      }
    });
  }

  Object.keys(defaults).forEach(key => {
    if (existing[key] === undefined || existing[key] === '') {
      setConfigValue_(configSheet, key, defaults[key]);
    }
  });
}

function migrateLegacyTeamConfig_() {
  const ss = SpreadsheetApp.getActive();
  const configSheet = mustGetSheet_(ss, GAME_SHEETS_51.CONFIG);
  const config = readConfig_(configSheet);
  const legacyTeams = splitList_(config.Teams);
  const legacyPhotos = splitList_(config.TeamPhotos);

  for (let i = 1; i <= 3; i++) {
    if (!String(config[`Team${i}Name`] || '').trim() && legacyTeams[i - 1]) {
      setConfigValue_(configSheet, `Team${i}Name`, legacyTeams[i - 1]);
    }
    if (!String(config[`Team${i}PhotoUrl`] || '').trim() && legacyPhotos[i - 1]) {
      setConfigValue_(configSheet, `Team${i}PhotoUrl`, legacyPhotos[i - 1]);
    }
  }

  removeConfigKey_(configSheet, 'Teams');
  removeConfigKey_(configSheet, 'TeamPhotos');
  const castSheet = mustGetSheet_(ss, GAME_SHEETS_51.CAST);
  if (castSheet.getMaxColumns() > GAME_HEADERS_51.CAST.length) {
    castSheet.deleteColumns(GAME_HEADERS_51.CAST.length + 1, castSheet.getMaxColumns() - GAME_HEADERS_51.CAST.length);
  }
}

function removeLegacyBonusQuestionConfig_() {
  const configSheet = mustGetSheet_(SpreadsheetApp.getActive(), GAME_SHEETS_51.CONFIG);
  ['BonusQ', 'BonusType', 'BonusOptions'].forEach(key => removeConfigKey_(configSheet, key));
}

function formatAllSheets_() {
  const ss = SpreadsheetApp.getActive();
  Object.values(GAME_SHEETS_51).forEach(name => {
    const sh = ss.getSheetByName(name);
    if (!sh) return;
    if (sh.getLastRow() > 0) {
      sh.getRange(1, 1, 1, sh.getLastColumn())
        .setFontWeight('bold')
        .setBackground('#3a291b')
        .setFontColor('#fff7e6');
      sh.setFrozenRows(1);
      sh.autoResizeColumns(1, sh.getLastColumn());
    }
  });
}

/* =========================
   SCORE ENGINE
========================= */

function recalculateScores() {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);

  try {
    const ss = SpreadsheetApp.getActive();
    const config = readConfig_(mustGetSheet_(ss, GAME_SHEETS_51.CONFIG));
    const picks = dedupeLatestPicks_(readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PICKS)), buildCanonicalNameMap_(readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PLAYERS))));
    const scoringByWeek = buildScoringMap_(readTable_(mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING)));
    const scoresSheet = mustGetSheet_(ss, GAME_SHEETS_51.SCORES);

    const runningTotals = new Map();
    const out = [];

    const weeks = Object.keys(scoringByWeek)
      .map(Number)
      .filter(Number.isFinite)
      .sort((a, b) => a - b);

    weeks.forEach(week => {
      const weekRows = picks.filter(r => Number(r.Week || 0) === week);
      const rule = applyQuestionPointsToScoringRule51_(week, scoringByWeek[week], config);

      const ranking = weekRows.map(row => {
        const playerName = String(row.Name || '').trim();
        const playerKey = nameKey51_(playerName);
        const weekPoints =
          computeWeekPoints51_(row, rule) +
          getManualBonusPoints51_(ss, week, playerName);

        const previous = runningTotals.get(playerKey) || 0;
        const total = previous + weekPoints;
        runningTotals.set(playerKey, total);

        return {
          week,
          name: playerName,
          email: String(row.Email || '').trim(),
          weekPoints,
          total
        };
      });

      ranking.sort((a, b) => {
        if (b.total !== a.total) return b.total - a.total;
        return a.name.localeCompare(b.name);
      });

      const ranks = denseRank51_(ranking.map(r => r.total));
      ranking.forEach((r, idx) => out.push([r.week, r.name, r.email, r.weekPoints, r.total, ranks[idx]]));
    });

    scoresSheet.clearContents();
    scoresSheet.getRange(1, 1, 1, GAME_HEADERS_51.SCORES.length).setValues([GAME_HEADERS_51.SCORES]);
    if (out.length) {
      scoresSheet.getRange(2, 1, out.length, GAME_HEADERS_51.SCORES.length).setValues(out);
    }

    return { ok: true, message: 'Scores recalculated.' };
  } finally {
    lock.releaseLock();
  }
}

function applyQuestionPointsToScoringRule51_(week, rule, fallbackConfig) {
  const out = Object.assign({}, rule || {});
  const questionConfig = typeof getQuestionConfigForWeek_ === 'function'
    ? getQuestionConfigForWeek_(week, fallbackConfig || {})
    : (fallbackConfig || {});
  for (let i = 1; i <= 8; i++) {
    const points = pointValueOrBlank_(questionConfig[`Q${i}Points`]);
    if (points !== '') out[`Q${i}_Points`] = points;
  }
  return out;
}

function computeWeekPoints51_(pick, rule) {
  let points = 0;
  points += scoreAnswer51_(pick.Q1_Pick, rule.Q1_Correct, rule.Q1_Points);
  points += scoreAnswer51_(pick.Q2_Pick, rule.Q2_Correct, rule.Q2_Points);
  points += scoreAnswer51_(pick.Q3_Pick, rule.Q3_Correct, rule.Q3_Points);
  points += scoreAnswer51_(pick.Q4_Pick, rule.Q4_Correct, rule.Q4_Points);
  points += scoreAnswer51_(pick.Q5_Pick, rule.Q5_Correct, rule.Q5_Points);
  points += scoreAnswer51_(pick.Q6_Pick, rule.Q6_Correct, rule.Q6_Points);
  points += scoreAnswer51_(pick.Q7_Pick, rule.Q7_Correct, rule.Q7_Points);
  points += scoreAnswer51_(pick.Q8_Pick, rule.Q8_Correct, rule.Q8_Points);

  if (matchesCorrect51_(pick.Q1_Pick, rule.Q1_CorrectPlus)) {
    points += toNumberOrDefault_(rule.Q1_CorrectPlus_Points, 4);
  }
  if (matchesCorrect51_(pick.Q1_Pick, rule.Q1_CorrectMinus)) {
    points += toNumberOrDefault_(rule.Q1_CorrectMinus_Points, -3);
  }
  return points;
}

function scoreAnswer51_(pickValue, correctValue, pointValue) {
  return matchesCorrect51_(pickValue, correctValue) ? toNumberOrDefault_(pointValue, 0) : 0;
}

function matchesCorrect51_(pickValue, correctValue) {
  const pick = normalizeAnswer51_(pickValue);
  if (!pick) return false;
  const candidates = String(correctValue || '')
    .split('|')
    .map(normalizeAnswer51_)
    .filter(Boolean);
  return candidates.includes(pick);
}

function getManualBonusPoints51_(ss, week, playerName) {
  const rows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PLAYERBONUSES));
  const target = nameKey51_(playerName);
  return rows.reduce((sum, row) => {
    const rowWeek = Number(row.Week || 0);
    const rowPlayer = nameKey51_(row.Player);
    const pts = Number(row.Points || 0);
    return rowWeek === week && rowPlayer === target && Number.isFinite(pts) ? sum + pts : sum;
  }, 0);
}

function dedupeLatestPicks_(rows, canonicalByKey) {
  const map = new Map();

  rows.forEach(row => {
    const week = Number(row.Week || 0);
    if (!week) return;

    const submittedKey = nameKey51_(row.Name);
    let canonical = canonicalByKey.get(submittedKey) || normNameDisplay_(row.Name);
    if (!canonical) return;

    const key = `${week}||${nameKey51_(canonical)}`;
    const existing = map.get(key);
    const rowTs = new Date(row.Timestamp || 0).getTime();
    const existingTs = existing ? new Date(existing.Timestamp || 0).getTime() : -Infinity;

    if (!existing || rowTs > existingTs) {
      const clean = Object.assign({}, row);
      clean.Name = canonical;
      clean.Email = normalizeEmail51_(row.Email);
      map.set(key, clean);
    }
  });

  return Array.from(map.values()).sort((a, b) => {
    const weekDiff = Number(a.Week || 0) - Number(b.Week || 0);
    if (weekDiff !== 0) return weekDiff;
    return normName_(a.Name).localeCompare(normName_(b.Name));
  });
}

function buildCanonicalNameMap_(players) {
  const map = new Map();
  (players || []).forEach(p => {
    if (String(p.Active || '').toUpperCase() === 'FALSE') return;
    const canonical = normNameDisplay_(p.Name);
    if (!canonical) return;
    map.set(nameKey51_(canonical), canonical);
  });
  return map;
}

function buildScoringMap_(rows) {
  const out = {};
  rows.forEach(row => {
    const week = Number(row.Week || 0);
    if (week) out[week] = row;
  });
  return out;
}

/* =========================
   AUTO ASSIGN FOR MISSED PICKS
========================= */

function autoFillMissingPicks() {
  const lock = LockService.getDocumentLock();
  lock.waitLock(30000);
  try {
    const ss = SpreadsheetApp.getActive();
    const config = readConfig_(mustGetSheet_(ss, GAME_SHEETS_51.CONFIG));
    const window = getMissedPicksWindow51_(config);
    if (!window.due) return {ok:true, skipped:true, message:'Not yet due or outside the closed voting round.'};
    const properties = PropertiesService.getScriptProperties();
    if (properties.getProperty('MissedPicksCompleted51') === window.key) return {ok:true, skipped:true, message:'Round already processed.'};
    const week = window.week;
    const players = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PLAYERS))
      .filter(p => String(p.Active || '').trim().toUpperCase() !== 'FALSE' && nameKey51_(p.Name));
    const castRows = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.CAST)).filter(r => isActiveCastStatus51_(r.Status));
    const questionConfig = getQuestionConfigForWeek_(week, config);
    const questions = getQuestionDefinitions_(questionConfig, castRows);
    if (!questions.length) throw new Error('No questions configured for this round; retry after questions are available.');
    questions.filter(q => q.type !== 'text').forEach(q => {
      if (!q.options || !q.options.some(o => String(o.value || '').trim())) throw new Error('No valid choices for ' + q.key);
    });
    const existing = dedupeLatestPicks_(readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PICKS)), buildCanonicalNameMap_(players)).filter(r => Number(r.Week || 0) === week);
    const byName = new Map(existing.map(row => [nameKey51_(row.Name), row]));
    const reason = 'Processing fee for missed submission';
    const penalties = readTable_(mustGetSheet_(ss, GAME_SHEETS_51.PLAYERBONUSES));
    const charged = new Set(penalties.filter(r => Number(r.Week) === week && String(r.Reason || '').trim() === reason).map(r => nameKey51_(r.Player)));
    const usedCommentAnswers = new Set(existing.map(row => String(row.Comment_Text || '')).filter(Boolean));
    const createdFor = [];
    players.forEach(player => {
      const key = nameKey51_(player.Name);
      const prior = byName.get(key);
      if (prior && String(prior.AutoAssigned).toUpperCase() !== 'TRUE') return;
      if (!prior) {
        const payload = {week, name:String(player.Name || '').trim(), email:String(player.Email || '').trim(),
          SubmittedByAdmin:'FALSE', AutoAssigned:'TRUE', PenaltyApplied:'TRUE'};
        questions.forEach(q => {
          if (q.type === 'text') {
            const answer = generateAutoFreeTextResponse_(q.prompt, player, week, castRows, usedCommentAnswers);
            payload[q.key + 'Text'] = answer;
            payload[q.key + 'Label'] = q.prompt;
            if (q.key === 'comment') {payload.commentLabel=q.prompt; payload.commentText=answer;}
          } else {
            payload[q.key + 'Label'] = q.prompt;
            payload[q.key + 'Pick'] = pickRandom_(q.options.map(o => o.value).filter(v => String(v || '').trim()));
          }
        });
        upsertPickRecord_(payload, {allowAdminEdit:true, markAutoAssigned:true});
        byName.set(key, {AutoAssigned:'TRUE'});
        createdFor.push(payload.name);
      }
      // Repair a partial previous run (pick saved, penalty failed) without rerolling.
      if (!charged.has(key)) {addOrUpdateBonusRow_(week, player.Name, -1, reason);charged.add(key);}
    });
    properties.setProperty('MissedPicksCompleted51', window.key);
    console.log(JSON.stringify({week, dueAt:window.dueAt, assigned:createdFor.length}));
    return {ok:true, assigned:createdFor.length, message:createdFor.length ? 'Auto-assigned missing picks.' : 'No missing picks needed auto-assignment.'};
  } finally {lock.releaseLock();}
}

function addOrUpdateBonusRow_(week, player, points, reason) {
  const ss = SpreadsheetApp.getActive();
  const sheet = mustGetSheet_(ss, GAME_SHEETS_51.PLAYERBONUSES);
  const rows = readTable_(sheet);
  const headers = getHeaders_(sheet);

  let rowNumber = null;
  for (let i = 0; i < rows.length; i++) {
    if (
      Number(rows[i].Week || 0) === Number(week) &&
      nameKey51_(rows[i].Player) === nameKey51_(player) &&
      String(rows[i].Reason || '').trim() === String(reason || '').trim()
    ) {
      rowNumber = i + 2;
      break;
    }
  }

  const record = {
    Week: Number(week),
    Player: String(player || '').trim(),
    Points: Number(points || 0),
    Reason: String(reason || '').trim()
  };
  const values = headers.map(h => record[h] !== undefined ? record[h] : '');

  if (rowNumber) {
    sheet.getRange(rowNumber, 1, 1, headers.length).setValues([values]);
  } else {
    sheet.appendRow(values);
  }

  logAdminChange51_({ action: 'Save Results', section: 'Scoring', record: `Week ${week} correct answers`, previousValue: rowNumber ? rows[rowNumber - 2] : '', newValue: record, week });
}

/* =========================
   ADMIN HELPERS
========================= */

function adminSaveResults(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);

  const ss = SpreadsheetApp.getActive();
  ensureSheetWithHeaders_(ss, GAME_SHEETS_51.WEEKSCORING, GAME_HEADERS_51.WEEKSCORING);
  const sheet = mustGetSheet_(ss, GAME_SHEETS_51.WEEKSCORING);
  const headers = getHeaders_(sheet);
  const rows = readTable_(sheet);
  const week = Number(payload.week || 0);

  if (!week) throw new Error('Missing week number.');

  const config = readConfig_(mustGetSheet_(ss, GAME_SHEETS_51.CONFIG));
  const questionConfig = typeof getQuestionConfigForWeek_ === 'function'
    ? getQuestionConfigForWeek_(week, config)
    : config;
  const questionPoints = {};
  for (let i = 1; i <= 8; i++) {
    questionPoints[`Q${i}_Points`] = pointValueOrBlank_(questionConfig[`Q${i}Points`]);
  }

  const record = {
    Week: week,
    Q1_Correct: String(payload.q1 || '').trim(),
    Q1_Points: questionPoints.Q1_Points,
    Q2_Correct: String(payload.q2 || '').trim(),
    Q2_Points: questionPoints.Q2_Points,
    Q3_Correct: String(payload.q3 || '').trim(),
    Q3_Points: questionPoints.Q3_Points,
    Q4_Correct: String(payload.q4 || '').trim(),
    Q4_Points: questionPoints.Q4_Points,
    Q5_Correct: String(payload.q5 || '').trim(),
    Q5_Points: questionPoints.Q5_Points,
    Q6_Correct: String(payload.q6 || '').trim(),
    Q6_Points: questionPoints.Q6_Points,
    Q7_Correct: String(payload.q7 || '').trim(),
    Q7_Points: questionPoints.Q7_Points,
    Q8_Correct: String(payload.q8 || '').trim(),
    Q8_Points: questionPoints.Q8_Points,
    Q1_CorrectPlus: String(payload.q1CorrectPlus || '').trim(),
    Q1_CorrectPlus_Points: toNumberOrDefault_(payload.q1CorrectPlusPoints, 4),
    Q1_CorrectMinus: String(payload.q1CorrectMinus || '').trim(),
    Q1_CorrectMinus_Points: toNumberOrDefault_(payload.q1CorrectMinusPoints, -3)
  };

  let rowNumber = null;
  for (let i = 0; i < rows.length; i++) {
    if (Number(rows[i].Week || 0) === week) {
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

  return { ok: true, message: `Results saved for Week ${week}.` };
}

function adminRecalculateScores(passcode) {
  verifyAdminPasscodeOrThrow_(passcode);
  const result = recalculateScores();
  logAdminChange51_({ action: 'Recalculate Scores', section: 'Scoring', record: 'All player scores', previousValue: 'Existing calculated scores', newValue: 'Recalculated from saved results' });
  return result;
}

// Private diagnostic helper. The trailing underscore prevents invocation through
// google.script.run while keeping it available from the Apps Script editor.
function adminRecalculateScoresTrialRun_() {
  return recalculateScores();
}

function adminAdvanceWeek(passcode) {
  verifyMasterAdminPasscodeOrThrow_(passcode);
  const previousWeek = Number(readConfig_(mustGetSheet_(SpreadsheetApp.getActive(), GAME_SHEETS_51.CONFIG)).WeekNumber || 1);
  const result = advanceWeek_();
  logAdminChange51_({ action: 'Advance Week', section: 'Voting', record: 'Current Week', previousValue: previousWeek, newValue: previousWeek + 1, week: previousWeek + 1 });
  return result;
}

// Private diagnostic helper; advancing the week must not be a public RPC.
function adminAdvanceWeekTrialRun_() {
  return advanceWeek_();
}

function advanceWeek_() {
  const ss = SpreadsheetApp.getActive();
  const configSheet = mustGetSheet_(ss, GAME_SHEETS_51.CONFIG);
  const config = readConfig_(configSheet);
  const nextWeek = Number(config.WeekNumber || 1) + 1;
  setConfigValue_(configSheet, 'WeekNumber', nextWeek);
  setConfigValue_(configSheet, 'VotingOpen', 'AUTO');
  return { ok: true, message: `Advanced to Week ${nextWeek}. Voting reset to AUTO.` };
}

function adminAddBonus(passcode, payload) {
  verifyAdminPasscodeOrThrow_(passcode);
  const week = Number(payload.week || 0);
  const player = String(payload.player || '').trim();
  const points = Number(payload.points || 0);
  const reason = sanitizeHtml51_(String(payload.reason || '').trim());

  if (!week) throw new Error('Missing week.');
  if (!player) throw new Error('Missing player.');
  if (!reason) throw new Error('Missing reason.');

  addOrUpdateBonusRow_(week, player, points, reason);
  logAdminChange51_({ action: 'Save Bonus', section: 'Bonus Points', record: reason, previousValue: '', newValue: `${points} points`, week, player });
  return { ok: true, message: 'Bonus points saved.' };
}

function verifyAdminPasscodeOrThrow_(passcode) {
  if (typeof verifyAdminPasscode !== 'function') {
    throw new Error('verifyAdminPasscode() is not available.');
  }
  if (!verifyAdminPasscode(passcode)) {
    throw new Error('Invalid admin passcode.');
  }
}

/* =========================
   PHOTO UPLOAD
========================= */

function uploadTribePhoto(passcode, payload) {
  return saveRecapPhoto51_(passcode, payload);
}

/* =========================
   SHARED HELPERS
========================= */

const ADMIN_CHANGE_LOG_HEADERS_51 = ['Timestamp', 'Admin Action', 'Admin Section', 'Record or Setting', 'Previous Value', 'New Value', 'Affected Week', 'Affected Player', 'Status'];
const ADMIN_CHANGE_LOG_NAME_51 = 'Tribal Ledger Admin Change Log';
const ADMIN_CHANGE_LOG_FOLDER_ID_51 = '1C7GzvLWvXNEExDeyv-EVI--3QJ7HTVJ_';

function ensureAdminChangeLogLocation51_(configSheet, config) {
  const folder = DriveApp.getFolderById(ADMIN_CHANGE_LOG_FOLDER_ID_51);
  let logSs = null;
  const configuredId = String(config.AdminChangeLogSpreadsheetId || '').trim();
  if (configuredId) {
    try { logSs = SpreadsheetApp.openById(configuredId); } catch (ignored) { logSs = null; }
  }
  if (!logSs) {
    const matches = folder.getFilesByName(ADMIN_CHANGE_LOG_NAME_51);
    while (matches.hasNext() && !logSs) {
      const candidate = matches.next();
      if (candidate.getMimeType() !== MimeType.GOOGLE_SHEETS) continue;
      try { logSs = SpreadsheetApp.openById(candidate.getId()); } catch (ignored) { logSs = null; }
    }
  }
  if (!logSs) logSs = SpreadsheetApp.create(ADMIN_CHANGE_LOG_NAME_51);

  const file = DriveApp.getFileById(logSs.getId());
  let alreadyInFolder = false;
  const parents = file.getParents();
  while (parents.hasNext()) {
    if (parents.next().getId() === ADMIN_CHANGE_LOG_FOLDER_ID_51) alreadyInFolder = true;
  }
  if (!alreadyInFolder) file.moveTo(folder);

  setConfigValue_(configSheet, 'AdminChangeLogSpreadsheetId', logSs.getId());
  setConfigValue_(configSheet, 'AdminChangeLogFolderId', ADMIN_CHANGE_LOG_FOLDER_ID_51);
  setConfigValue_(configSheet, 'AdminChangeLogLocationConfigured', 'TRUE');
  config.AdminChangeLogSpreadsheetId = logSs.getId();
  config.AdminChangeLogFolderId = ADMIN_CHANGE_LOG_FOLDER_ID_51;
  config.AdminChangeLogLocationConfigured = 'TRUE';
  return logSs;
}

function logAdminChange51_(entry) {
  try {
    const mainSs = SpreadsheetApp.getActive();
    const configSheet = mustGetSheet_(mainSs, GAME_SHEETS_51.CONFIG);
    const config = readConfig_(configSheet);
    const timezone = String(config.Timezone || 'America/Los_Angeles');
    const logSs = ensureAdminChangeLogLocation51_(configSheet, config);
    const now = new Date();
    const tabName = Utilities.formatDate(now, timezone, 'yyyy-MM-dd');
    let sheet = logSs.getSheetByName(tabName);
    if (!sheet) {
      sheet = logSs.insertSheet(tabName);
      sheet.getRange(1, 1, 1, ADMIN_CHANGE_LOG_HEADERS_51.length).setValues([ADMIN_CHANGE_LOG_HEADERS_51]).setFontWeight('bold');
      sheet.setFrozenRows(1);
      const defaultSheet = logSs.getSheetByName('Sheet1');
      if (defaultSheet && logSs.getSheets().length > 1 && defaultSheet.getLastRow() === 0) logSs.deleteSheet(defaultSheet);
    }
    sheet.insertRowAfter(1);
    const safe = value => String(value === null || value === undefined ? '' : (typeof value === 'string' ? value : JSON.stringify(value))).replace(/\s+/g, ' ').slice(0, 5000);
    const sensitive = /password|passcode|tribal\s*key|drive\s*(folder\s*)?id/i.test(`${entry.record || ''} ${entry.action || ''}`);
    sheet.getRange(2, 1, 1, ADMIN_CHANGE_LOG_HEADERS_51.length).setValues([[Utilities.formatDate(now, timezone, 'yyyy-MM-dd HH:mm:ss'), safe(entry.action), safe(entry.section), safe(entry.record), sensitive ? 'Protected value' : safe(entry.previousValue), sensitive ? 'Updated (value hidden)' : safe(entry.newValue), safe(entry.week), safe(entry.player), safe(entry.status || 'Success')]]);
    if (!sheet.getFilter()) sheet.getRange(1, 1, Math.max(2, sheet.getLastRow()), ADMIN_CHANGE_LOG_HEADERS_51.length).createFilter();
    sheet.autoResizeColumns(1, ADMIN_CHANGE_LOG_HEADERS_51.length);
  } catch (ignored) { console.warn('Admin change logging failed; the original Admin update was preserved.'); }
}

function ensureSheetWithHeaders_(ss, sheetName, headers) {
  if (!sheetName) throw new Error('Missing sheet name while ensuring headers.');
  if (!headers || !headers.length) throw new Error(`Missing headers for sheet: ${sheetName}`);
  const sheet = getOrCreateSheet_(ss, sheetName);
  const existingHeaders = sheet.getLastRow() > 0 ? getHeaders_(sheet) : [];
  if (existingHeaders.length && headers.every((h, i) => existingHeaders[i] === h)) {
    const missingHeaders = headers.slice(existingHeaders.length);
    if (missingHeaders.length) {
      sheet.getRange(1, existingHeaders.length + 1, 1, missingHeaders.length).setValues([missingHeaders]);
    }
    return sheet;
  }

  const matches = existingHeaders.length === headers.length && headers.every((h, i) => h === existingHeaders[i]);

  if (!matches) {
    const existingValues = sheet.getLastRow() > 1
      ? sheet.getRange(2, 1, sheet.getLastRow() - 1, existingHeaders.length).getValues()
      : [];
    const remappedValues = existingValues.map(row => headers.map(header => {
      const oldIndex = existingHeaders.indexOf(header);
      return oldIndex >= 0 ? row[oldIndex] : '';
    }));

    sheet.clearContents();
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    if (remappedValues.length) {
      sheet.getRange(2, 1, remappedValues.length, headers.length).setValues(remappedValues);
    }
  }

  return sheet;
}

function getOrCreateSheet_(ss, name) {
  return ss.getSheetByName(name) || ss.insertSheet(name);
}

function mustGetSheet_(ss, name) {
  const sh = ss.getSheetByName(name);
  if (!sh) throw new Error(`Missing required sheet: ${name}`);
  return sh;
}

function readConfig_(sheet) {
  const values = sheet.getDataRange().getValues();
  const out = {};
  for (let i = 1; i < values.length; i++) {
    const key = String(values[i][0] || '').trim();
    if (!key) continue;
    out[key] = values[i][1];
  }
  return out;
}

function readTable_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];
  const headers = values[0].map(String);
  return values.slice(1).map(row => {
    const obj = {};
    headers.forEach((h, i) => obj[h] = row[i]);
    return obj;
  });
}

function getHeaders_(sheet) {
  if (!sheet) throw new Error('Missing sheet while reading headers.');
  if (sheet.getLastRow() === 0) return [];
  return sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0].map(String);
}

function setConfigValue_(sheet, key, value) {
  const values = sheet.getDataRange().getValues();
  let updated = false;
  for (let i = 1; i < values.length; i++) {
    if (String(values[i][0] || '').trim() === key) {
      sheet.getRange(i + 1, 2).setValue(value);
      updated = true;
    }
  }
  if (!updated) sheet.appendRow([key, value]);
}

function removeConfigKey_(sheet, key) {
  const values = sheet.getDataRange().getValues();
  for (let i = values.length - 1; i >= 1; i--) {
    if (String(values[i][0] || '').trim() === key) {
      sheet.deleteRow(i + 1);
    }
  }
}

function splitList_(value) {
  return String(value || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function pickRandom_(arr) {
  if (!arr || !arr.length) return '';
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateAutoFreeTextResponse_(prompt, player, week, castRows, usedAnswers) {
  const text = cleanQuestionPrompt_(prompt).replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
  if (!text) return '';
  const p = text.toLowerCase();
  const cast = (castRows || []).map(row => String(row.Name || '').trim()).filter(Boolean);
  let answers;
  if (/learn about you|describe yourself|first impression|personality|what.*bring to.*tribe|role.*camp/.test(p)) answers = [
    'My tribe will learn that I can turn any shelter-building shift into a personal hammock break.',
    'They will discover that I volunteer to supervise the rice, then disappear before anyone hands me the pot.',
    'My tribe will learn that I am excellent at looking busy whenever someone mentions collecting firewood.',
    'They will learn that I consider lying in the shade a vital contribution to camp morale.',
    'My tribe will discover that I can remember every reward snack but somehow forget my turn on water duty.',
    'They will learn that my strongest survival skill is arriving just after the chores are finished.'
  ];
  else if (/\bwho\b|which castaway|which player|which contestant/.test(p) && cast.length) answers = cast.flatMap(name => [
    name + ' gets my pick, mostly because I was hoping they would make the decision while I stayed in the hammock.',
    'I would choose ' + name + '. My scouting report consists of whatever I overheard between camp naps.'
  ]);
  else if (/\bfood\b|meal|\beat\b|snack/.test(p)) answers = [
    'Tacos, preferably delivered to my hammock while someone else cooks the tribe\'s rice.',
    'A giant plate of tacos. I would offer to help prepare it, then mysteriously vanish until serving time.',
    'Tacos are my choice; my role at the reward feast would be eating first and dodging dish duty.'
  ];
  else if (/luxury|bring.*island|take.*island|one item/.test(p)) answers = [
    'A hammock, so I can commit fully to being the least mobile member of the tribe.',
    'A pillow. If the shelter leaks, I plan to sleep through the meeting about fixing it.',
    'A camp chair, because apparently watching other people gather firewood is my specialty.'
  ];
  else if (/tribe.*name|name.*tribe/.test(p)) answers = [
    'The Nap Alliance. I would design our flag as soon as someone else fetches the materials.',
    'The Tomorrow Tribe: my personal promise for when I will finally help with the shelter.',
    'The Missing Firewood. It is both our tribe name and a review of my latest chore shift.'
  ];
  else if (/idol|advantage|clue/.test(p)) answers = [
    'I would tuck the idol or clue beside my hammock and take a nap, then forget which palm tree I chose.',
    'I would ask my alliance to figure out the advantage while I handle the crucial task of sitting nearby.',
    'My idol plan would involve lots of wandering and absolutely none of the firewood I promised to bring back.'
  ];
  else if (/alliance|trust|loyal/.test(p)) answers = [
    'I would promise my alliance I will pull my weight, then somehow be on a coconut break whenever they need me.',
    'My approach to trust is to say "count on me" and immediately forget which camp chore I agreed to do.',
    'I would join whichever alliance lets me call hammock time "keeping a low profile."'
  ];
  else if (/challenge|immunity|reward|puzzle/.test(p)) answers = [
    'I would volunteer for the puzzle, lose track of the pieces, and ask whether cheering from the shade counts instead.',
    'My challenge contribution would be a dramatic warm-up followed by an extremely enthusiastic request to sit out.',
    'I would call myself the reward specialist: distracted during the challenge, remarkably focused when snacks arrive.'
  ];
  else if (/strategy|plan|move|blindside/.test(p)) answers = [
    'My strategy is to lie low, which I have confused with lying down while everyone else runs camp.',
    'My big move would be dodging water duty so smoothly that even I forget I was assigned it.',
    'I would plan a brilliant blindside, get distracted by a coconut, and turn up after the alliance meeting ends.'
  ];
  else if (/\bwhy\b/.test(p)) answers = [
    'Because I have mistaken conserving energy for letting the rest of the tribe do absolutely everything.',
    'Because my camp priorities are shade, snacks, and hoping someone else remembered the important part.',
    'Because I said "I will do it in a minute" and then treated that minute like an entire Survivor season.'
  ];
  else if (/\bwhen\b/.test(p)) answers = [
    'Just after everyone else has finished the work, if my usual camp timing is any indication.',
    'After one more hammock break, which is also what I said three hammock breaks ago.',
    'Whenever somebody comes to find me; keeping track of camp responsibilities is apparently not my advantage.'
  ];
  else if (/\bwhere\b/.test(p)) answers = [
    'In the shadiest corner of camp, conveniently out of earshot of anyone assigning chores.',
    'Beside my hammock, where I have established headquarters for avoiding useful work.',
    'Near the rice pot at serving time; finding me during cleanup would be a much harder challenge.'
  ];
  else if (/\bwould you\b|\bwill you\b|\bdo you\b|\bcould you\b/.test(p)) answers = [
    'I would say yes at the camp meeting, then get distracted and hope someone more reliable takes over.',
    'Only if it can be managed from my hammock; my tribe has already noticed that unfortunate limitation.',
    'I would promise to, but my track record around camp suggests everyone should have a backup plan.'
  ];
  else {
    // Keep uncommon prompts anchored to their actual subject, rather than a voting-error notice.
    const subject = text.replace(/[?!.]+$/g, '');
    answers = [
      'My contribution to "' + subject + '" would be announcing that I have a plan, then leaving my tribe to finish it while I nap.',
      'Faced with "' + subject + '", I would offer enthusiastic advice from the shade and somehow miss every chance to help.',
      'For "' + subject + '", I would rely on my signature camp move: getting distracted until somebody else handles it.'
    ];
  }
  const endings = ['', ' My torch is getting more exercise than I am.', ' The tribe has started assigning my chores to an empty coconut.', ' I call it conserving energy; my tribe calls it another missed chore.', ' Even the shelter has contributed more support than I have.', ' My imaginary job title is Assistant to the Hammock.'];
  const candidates = endings.flatMap(ending => answers.map(answer => answer + ending));
  const seed = nameKey51_(player && player.Name) + '|' + week + '|' + p;
  let hash = 0;
  for (let i = 0; i < seed.length; i++) hash = (Math.imul(hash, 31) + seed.charCodeAt(i)) >>> 0;
  const used = usedAnswers || new Set();
  for (let offset = 0; offset < candidates.length; offset++) {
    const answer = candidates[(hash + offset) % candidates.length];
    if (!used.has(answer)) { used.add(answer); return answer; }
  }
  return candidates[hash % candidates.length];
}

function normalizeAnswer51_(value) {
  return String(value || '').trim().toLowerCase();
}

function normalizeEmail51_(value) {
  return String(value || '').trim().toLowerCase();
}

function isActiveCastStatus51_(value) {
  const status = String(value || '').trim().toLowerCase();
  return !status || status === 'in' || status === 'active';
}

function normName_(value) {
  return String(value || '').trim().toLowerCase().replace(/\s+/g, ' ');
}

function normNameDisplay_(value) {
  return normalizePlayerDisplayName51_(value);
}

function syncTribalLedgerSheetSchema() {
  const ss = SpreadsheetApp.getActive();
  const updates = [];
  [
    { name: GAME_SHEETS_51.TRIBES, headers: GAME_HEADERS_51.TRIBES },
    { name: GAME_SHEETS_51.PLAYERS, headers: GAME_HEADERS_51.PLAYERS }
  ].forEach(definition => {
    let sheet = ss.getSheetByName(definition.name);
    if (!sheet) {
      sheet = ss.insertSheet(definition.name);
      sheet.getRange(1, 1, 1, definition.headers.length).setValues([definition.headers]);
      updates.push(`Created ${definition.name}`);
      return;
    }
    if (sheet.getLastRow() === 0) {
      sheet.getRange(1, 1, 1, definition.headers.length).setValues([definition.headers]);
      updates.push(`Added headers to ${definition.name}`);
      return;
    }
    const existingHeaders = getHeaders_(sheet);
    const missingHeaders = definition.headers.filter(header => !existingHeaders.includes(header));
    if (missingHeaders.length) {
      sheet.getRange(1, existingHeaders.length + 1, 1, missingHeaders.length).setValues([missingHeaders]);
      updates.push(`Added ${missingHeaders.join(', ')} to ${definition.name}`);
    }
  });
  SpreadsheetApp.flush();
  return { ok: true, message: updates.length ? updates.join('; ') : 'Google Sheets already matches the website schema.' };
}

function nameKey51_(value) {
  return normName_(value);
}

function normalizePlayerDisplayName51_(value) {
  // Normalize only comparison keys; retain the roster spelling for display.
  return String(value || '');
}

function denseRank51_(values) {
  const ranks = [];
  let currentRank = 0;
  let lastValue = null;
  values.forEach(v => {
    if (lastValue === null || v !== lastValue) {
      currentRank += 1;
      lastValue = v;
    }
    ranks.push(currentRank);
  });
  return ranks;
}

function toNumberOrDefault_(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

function pointValueOrBlank_(value) {
  if (String(value ?? '').trim() === '') return '';
  return toNumberOrDefault_(value, 0);
}

function parseTimeToMinutes_(value) {
  const s = String(value || '').trim().toUpperCase();
  if (!s) return null;

  let m = s.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/);
  if (m) {
    let hour = Number(m[1]);
    const minute = Number(m[2]);
    const meridiem = m[3];
    if (hour === 12) hour = 0;
    if (meridiem === 'PM') hour += 12;
    return hour * 60 + minute;
  }

  m = s.match(/^(\d{1,2}):(\d{2})$/);
  if (m) return Number(m[1]) * 60 + Number(m[2]);
  return null;
}

function dayNameToNum_(value) {
  const dayMap = {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7
  };
  return dayMap[String(value || '').trim().toLowerCase()] || null;
}

function sanitizeFileName_(value) {
  return String(value || 'upload')
    .replace(/[^\w.\- ]+/g, '')
    .trim() || 'upload';
}

function sanitizeHtml51_(html) {
  if (typeof sanitizeHtml_ === 'function') return sanitizeHtml_(html);
  return String(html || '')
    .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, '')
    .replace(/\son\w+="[^"]*"/gi, '')
    .replace(/\son\w+='[^']*'/gi, '');
}

function getMissedPicksWindow51_(config, now) {
  now = now || new Date();
  const timezone = String(config.Timezone || 'America/Los_Angeles');
  const season = getSeasonClock51_(config, now);
  if (season && (season.beforeStart || season.afterSeason)) return {due:false};
  if (getVotingStatus_(config, timezone).isOpen) return {due:false};
  const close = parseRule_(config.CloseDay, config.CloseTime);
  const open = parseRule_(config.OpenDay || 'Monday', config.OpenTime || '12:00 AM');
  const deadline = computeUpcomingOrCurrentIso_(now, timezone, close.dayNum, close.totalMinutes, false);
  const dueAt = Date.parse(deadline) + 30 * 60000;
  const nextOpen = Date.parse(computeNextOccurrenceIso_(new Date(deadline), timezone, open.dayNum, open.totalMinutes));
  const deadlineSeason = getSeasonClock51_(config, new Date(deadline));
  const week = Number(config.WeekNumber || 1);
  return {due: now.getTime() >= dueAt && now.getTime() < nextOpen && (!deadlineSeason || deadlineSeason.week === week),
    week, deadline, dueAt: new Date(dueAt).toISOString(), timezone, key: week + ':' + deadline};
}

// Safe as a time trigger or a repeat call: time and round checks happen under the lock.
function runScheduledMissingPicks() {
  return autoFillMissingPicks();
}


