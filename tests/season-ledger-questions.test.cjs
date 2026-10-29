const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = process.env.LEDGER_BACKEND_ROOT || path.resolve(__dirname, '..');

function fixture() {
  const c = vm.createContext({console});
  for (const names of [['code.gs', 'Code.js'], ['web.gs', 'Web.js']]) {
    const file = names.map(name => path.join(root, name)).find(file => fs.existsSync(file));
    vm.runInContext(fs.readFileSync(file, 'utf8'), c);
  }
  const saved = [
    {Week:1, Q1:'Edited first week', Q1Points:7},
    {Week:2, Q1:'<b>Edited second week</b>', Q1Points:5}
  ];
  const picks = [1, 2].map(Week => ({Week, Name:'Player', Q1_Label:'Original week ' + Week, Q1_Pick:'Alice', Timestamp:'2026-10-01T00:00:00Z'}));
  const sheets = {Players:[{Name:'Player', Active:'TRUE'}], Picks:picks, QuestionWeeks:saved,
    WeekScoring:[1, 2, 3, 4].map(Week => ({Week, Q1_Correct:'Alice', Q1_Points:5}))};
  const config = {WeekNumber:2, Q1:'Unrelated current config', Q1Points:99};
  c.SpreadsheetApp = {getActive:() => ({getSheetByName:name => sheets[name] ? name : null})};
  c.mustGetSheet_ = (_, name) => name;
  c.readTable_ = sheet => sheets[sheet] || [];
  c.readConfig_ = () => config;
  c.getRevealStatus_ = () => ({isVisible:true});
  c.getLeaderboardData_ = () => ({rows:[{name:'Player', rank:1, total:12}]});
  return {c, saved, picks, config, sheets};
}

test('ledger uses saved prompts for each week and reads subsequent Admin edits without changing picks or scores', () => {
  const {c, saved, picks} = fixture();
  const beforePicks = JSON.stringify(picks);
  const before = c.getSeasonResponsesTable();
  assert.deepEqual(Array.from(before.columns, col => col.label), ['<b>Edited second week</b>', 'Edited first week']);
  assert.deepEqual(Array.from(before.columns, col => col.points), [5, 7]);
  saved[0].Q1 = 'Updated past week';
  saved[1].Q1 = 'Updated active week';
  const after = c.getSeasonResponsesTable();
  assert.deepEqual(Array.from(after.columns, col => col.label), ['Updated active week', 'Updated past week']);
  assert.equal(JSON.stringify(after.rows), JSON.stringify(before.rows));
  assert.equal(JSON.stringify(picks), beforePicks);
  assert.equal(after.rows[0].cells[0].value, 'Alice');
  assert.equal(after.rows[0].cells[0].isCorrect, true);
  assert.equal(after.rows[0].total, 12);
});

test('cleared saved prompts stay removed even when old picks and scoring still contain the question', () => {
  const {c, saved} = fixture();
  saved[1].Q1 = '<p><br></p>';
  assert.deepEqual(Array.from(c.getSeasonResponsesTable().columns, col => col.week), [1]);
});

test('legacy weeks retain their own pick labels when no saved weekly configuration exists', () => {
  const {c, saved, config, sheets, picks} = fixture();
  saved.splice(0, 1);
  assert.equal(c.getSeasonResponsesTable().columns.find(col => col.week === 1).label, 'Original week 1');
  delete sheets.QuestionWeeks;
  config.WeekNumber = 3;
  picks.push({Week:3, Name:'Player', Q1_Label:'Original week 3', Q1_Pick:'Bob'});
  assert.deepEqual(Array.from(c.getSeasonResponsesTable().columns, col => col.label), ['Original week 3', 'Original week 2', 'Original week 1']);
});

test('updated saved questions respect the existing reveal schedule', () => {
  const {c, picks} = fixture();
  picks.push({Week:3, Name:'Player', Q1_Label:'Future question', Q1_Pick:'Bob'});
  c.getRevealStatus_ = () => ({isVisible:false});
  const ledger = c.getSeasonResponsesTable();
  assert.deepEqual(Array.from(ledger.weeks), [1]);
  assert.deepEqual(Array.from(ledger.columns, col => col.label), ['Edited first week']);
});
