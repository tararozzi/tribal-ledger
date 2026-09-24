const test=require('node:test'),assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm');
const sources=['index.html'];
for(const file of sources) test(file+': captions and reaction identity preserved; lightbox lifecycle isolated',()=>{
 const src=fs.readFileSync(file,'utf8');let card,dialog,focused=0;const calls=[];
 const image={removeAttribute(k){delete this[k];}};const close={addEventListener(t,fn){this[t]=fn;}};
 const opener={isConnected:true,focus(){focused++;},addEventListener(t,fn){this[t]=fn;}};
 const body={style:{overflow:'auto'},appendChild(el){dialog=el;}};
 const document={body,getElementById:()=>dialog,createElement(tag){if(tag==='div')return card={querySelector:()=>opener};return {events:{},setAttribute(){},querySelector:s=>s==='img'?image:close,addEventListener(t,fn){this.events[t]=fn;},showModal(){this.open=true;},close(){this.open=false;this.events.close();}};}};
 const ctx=vm.createContext({document,escapeAttr:v=>v,buildInteractionTargetId:(...v)=>v.join('|'),normalizePhotoKey_:p=>p.name+p.photoUrl,renderReactionBar:(...v)=>{calls.push(v);return '<button>React</button>';}});
 vm.runInContext(src.slice(src.indexOf('function createPhotoCard_('),src.indexOf('function uniqueBy_(')),ctx);
 const photo={name:'Admin',week:3,photoUrl:'https://example.com/a.jpg',caption:'<b>Sunset</b>',reactions:{like:2}};
 ctx.createPhotoCard_(photo);assert(!card.innerHTML.includes('Admin'));assert(card.innerHTML.includes('<b>Sunset</b>'));assert.equal(calls[0][0],'photo|3|Adminhttps://example.com/a.jpg');assert.equal(photo.name,'Admin');
 opener.click({currentTarget:opener});assert(dialog.open);assert.equal(image.src,photo.photoUrl);assert.equal(body.style.overflow,'hidden');dialog.events.click({target:image});assert(dialog.open);dialog.events.click({target:dialog});assert(!dialog.open);assert.equal(body.style.overflow,'auto');assert.equal(focused,1);assert(!image.src);
 ctx.openPhotoLightbox_('second',opener);close.click();assert(!dialog.open);assert.equal(focused,2);
 ctx.createPhotoCard_({...photo,caption:'',targetId:'existing-photo'});assert(!card.innerHTML.includes('photo-caption'));assert.equal(calls[1][0],'existing-photo');
 for(const script of src.matchAll(/<script(?:\s[^>]*)?>([\s\S]*?)<\/script>/g))new vm.Script(script[1]);
});
