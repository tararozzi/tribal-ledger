const {test}=require('node:test');
const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),path=require('path');
const root=path.resolve(__dirname,'..');
function backend(){const c=vm.createContext({console});for(const file of ['Code.js','Web.js'])vm.runInContext(fs.readFileSync(path.join(root,file==='Code.js'?'code.gs':'web.gs'),'utf8'),c);return c;}
test('every correct answer matches once with existing case and whitespace normalization',()=>{
 const c=backend();
 for(const answer of ['Alice',' bob ','CAROL'])assert.equal(c.scoreAnswer51_(answer,'Alice|Bob|Carol',5),5);
 assert.equal(c.scoreAnswer51_('Dave','Alice|Bob|Carol',5),0);
 assert.equal(c.scoreAnswer51_('','Alice||Bob',5),0);
 assert.equal(c.scoreAnswer51_('Alice','Alice',5),5);
 assert.equal(c.scoreAnswer51_('Alice','Alice|Alice',5),5);
 assert.equal(c.matchesCorrect51_('bob',['Alice','Bob']),true);
});
test('admin saves arrays in the legacy format and can clear results',()=>{
 const c=backend();let saved;
 c.verifyAdminPasscodeOrThrow_=()=>{};c.SpreadsheetApp={getActive:()=>({})};
 c.ensureSheetWithHeaders_=()=>{};c.mustGetSheet_=()=>({appendRow:row=>saved=row});
 c.getHeaders_=()=>['Week','Q1_Correct','Q2_Correct','Q3_Correct','Q1_Points'];
 c.readTable_=()=>[];c.readConfig_=()=>({});c.getQuestionConfigForWeek_=()=>({Q1Points:5});
 c.logAdminChange51_=()=>{};c.syncQuestionWeeksToHistory51_=()=>{};
 c.adminSaveResults('admin',{week:2,q1:[' Alice ','Bob','alice',''],q2:'Carol',q3:[]});
 assert.deepEqual(Array.from(saved),[2,'Alice|Bob','Carol','',5]);
 assert.deepEqual(Array.from(c.normalizeCorrectList_(saved[1])),['Alice','Bob']);
});
function frontend(){
 const selects=Object.fromEntries(Array.from({length:8},(_,i)=>['adminResultQ'+(i+1),{
 options:[],disabled:false,set innerHTML(value){this.options=[];},appendChild(option){this.options.push(option);},get selectedOptions(){return this.options.filter(option=>option.selected);}
 }]));const status={};
 const c=vm.createContext({document:{getElementById:id=>selects[id]||status,createElement:()=>({selected:false})},uniqueBy_:(items,key)=>items.filter((item,i)=>items.findIndex(other=>key(item)===key(other))===i)});
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const name of ['populateAdminResultAnswerChoices','getAdminSelectedAnswers_']){
  const start=html.indexOf('function '+name+'('),end=html.indexOf('\nfunction ',start+1);
  vm.runInContext(html.slice(start,end),c);
 }
 return {c,selects,html};
}
test('admin loads all saved answers, preserves retired choices, and resets on week change',()=>{
 const {c,selects,html}=frontend();
 c.populateAdminResultAnswerChoices([{key:'q1',correct:'alice|Retired',options:[{value:'Alice'},{value:'Bob'}]}],1);
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Alice','Retired']);
 selects.adminResultQ1.options[1].selected=true;
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Alice','Bob','Retired']);
 selects.adminResultQ1.options.forEach(option=>option.selected=false);
 assert.equal(c.getAdminSelectedAnswers_('adminResultQ1').length,0);
 c.populateAdminResultAnswerChoices([{key:'q1',correct:'Bob',options:[{value:'Alice'},{value:'Bob'}]}],2);
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Bob']);
 for(let i=1;i<=8;i++)assert.ok(html.includes('id="adminResultQ'+i+'" class="text-input" multiple'));
});
