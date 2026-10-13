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
 function element(tag){return {tagName:tag.toUpperCase(),children:[],checked:false,appendChild(child){this.children.push(child);},set innerHTML(value){this.children=[];},querySelectorAll(selector){const inputs=[];function visit(node){if(node.tagName==='INPUT'&&node.type==='checkbox'&&(!selector.includes(':checked')||node.checked))inputs.push(node);node.children.forEach(visit);}visit(this);return inputs;}};}
 const groups=Object.fromEntries(Array.from({length:8},(_,i)=>['adminResultQ'+(i+1),element('div')]));const status={};
 const c=vm.createContext({document:{getElementById:id=>groups[id]||status,createElement:element},uniqueBy_:(items,key)=>items.filter((item,i)=>items.findIndex(other=>key(item)===key(other))===i)});
 const html=fs.readFileSync(path.join(root,'index.html'),'utf8');
 for(const name of ['populateAdminResultAnswerChoices','getAdminSelectedAnswers_']){
  const start=html.indexOf('function '+name+'('),end=html.indexOf('\n}',start)+2;
  vm.runInContext(html.slice(start,end),c);
 }
 return {c,groups,html};
}
test('checkboxes restore all saved answers, toggle independently, clear and reset on week change',()=>{
 const {c,groups,html}=frontend();const options=[{value:'Alice',label:'Alice Castaway'},{value:'Bob'}];
 c.populateAdminResultAnswerChoices([{key:'q1',correct:'alice|Retired',options}],1);
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Alice','Retired']);
 assert.equal(options.length,2);
 const boxes=groups.adminResultQ1.querySelectorAll('input[type="checkbox"]');
 assert.equal(groups.adminResultQ1.children[0].children[1].textContent,'Alice Castaway');
 boxes[1].checked=true;
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Alice','Bob','Retired']);
 boxes[0].checked=false;
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Bob','Retired']);
 boxes.forEach(box=>box.checked=false);
 assert.equal(c.getAdminSelectedAnswers_('adminResultQ1').length,0);
 c.populateAdminResultAnswerChoices([{key:'q1',correct:'Bob',options:[{value:'Alice'},{value:'Bob'}]}],2);
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['Bob']);
 for(let i=1;i<=8;i++)assert.ok(html.includes('id="adminResultQ'+i+'" class="admin-answer-options"'));
 assert.ok(!html.includes('Hold Ctrl'));
 assert.equal(c.getAdminSelectedAnswers_('adminResultQ8').length,0);
 assert.equal(groups.adminResultQ8.children[0].textContent,'No answer choices for this question.');
});
test('answer labels remain literal and repeated loads produce unique checkbox IDs',()=>{
 const {c,groups}=frontend();const questions=[{key:'q1',correct:'<script>bad</script>',options:[{value:'<script>bad</script>'},{value:'BOB'},{value:'bob'}]}];
 c.populateAdminResultAnswerChoices(questions,1);c.populateAdminResultAnswerChoices(questions,1);
 const boxes=groups.adminResultQ1.querySelectorAll('input[type="checkbox"]');
 assert.equal(boxes.length,2);assert.equal(new Set(boxes.map(box=>box.id)).size,2);
 assert.equal(groups.adminResultQ1.children[0].children[1].textContent,'<script>bad</script>');
 assert.deepEqual(Array.from(c.getAdminSelectedAnswers_('adminResultQ1')),['<script>bad</script>']);
});
