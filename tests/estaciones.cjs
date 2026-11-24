const assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
const R=require('../actividades/archivo-engine/rules.js'),OS6Lab=require('../laboratorio/engine.js');
const read=p=>fs.readFileSync(require('node:path').join(__dirname,'..',p),'utf8');
assert.equal(require('node:crypto').createHash('sha256').update(read('actividades/archivo-engine/rules.js')).digest('hex'),'5bedf87d6f88d99f5f4cdc4461e5b6c8d7b9fc96ecbe7b3e342acda63a960bd9','Las misiones coinciden con OS4 de referencia');
class El{constructor(){this.children=[];this.style={};this.dataset={};this.value='';this.attrs={}}append(x){this.children.push(x)}replaceChildren(){this.children=[]}setAttribute(k,v){this.attrs[k]=v}getAttribute(k){return this.attrs[k]}focus(){}showModal(){this.open=true}close(){this.open=false}set innerHTML(v){this.html=v;this.children=[]}get innerHTML(){return this.html}}
let storage={};
for(const theme of ['central','space']){
const els={},events=[];const c={ArchiveRules:R,OS6Lab,document:{body:{dataset:{theme}},getElementById:id=>els[id]??=new El(),createElement:()=>new El()},localStorage:{getItem:k=>storage[k]||null,setItem:(k,v)=>storage[k]=v},CustomEvent:class{constructor(type,v){this.type=type;this.detail=v.detail}},window:{dispatchEvent:e=>events.push(e),location:{href:''}}};vm.createContext(c);vm.runInContext(read('actividades/archivo-engine/evidence.js'),c);vm.runInContext(read('actividades/archivo-engine/game.js'),c);const run=s=>vm.runInContext(s,c);
assert.equal(run('sound'),false);run("$('continue').onclick()");assert.equal(run('taskIndex'),0);run('selectLevel(9)');assert.equal(run('level'),0);
// Acceso directo al hacker, como OS4, sin exigir completar los niveles.
run("$('hacker').onclick()");assert.equal(run('level'),10);assert.equal(run('model.tasks.length'),6);run('selectLevel(0)');
for(let level=0;level<11;level++){
run(`selectLevel(${level})`);assert.equal(run('level'),level);
for(let i=0;i<(level===10?6:3);i++){
assert.equal(run('taskIndex'),i);run("$('begin').onclick();path='';save()");assert.equal(run('solved'),false);assert.equal(els.onomatopoeia.textContent,'¡UPS!');
run("path=task().path;$('filename').value=task().name");
if(level>=8)run("{let parent='';for(const part of task().path.split('/')){const r=R.createFolder(model.folders,parent,part);if(r.ok)model.folders.push(r.path);parent=parent?parent+'/'+part:part}}");
if(level===5||level===6){run("$('filename').value='incorrecto.txt';save()");assert.equal(run('solved'),false);run("$('filename').value=task().name")}
run('save()');assert.equal(run('solved'),true);assert.equal(els.onomatopoeia.textContent,'¡CLIC!');assert(run('model.files.some(f=>f.name===task().name&&f.path===task().path)'));if(level===6)assert(run('model.files.some(f=>f.name===task().file&&f.path===task().path)'));if(level===7||level===10&&i>=4)assert(!run('model.files.some(f=>f.name===task().file&&f.path===task().from)'));
const eventCount=events.length;run('save()');assert.equal(events.length,eventCount);run("$('continue').onclick()");
}}
assert.equal(events.length,36);assert.equal(run('completed.length'),11);assert.equal(c.window.location.href,'../../');
const record=JSON.parse(storage['os6-expediente-v1']),module=theme==='central'?'Central de archivos':'Estación espacial';const credit=record.logs.filter(x=>x.module===module&&x.action==='accredited');assert.equal(credit.length,36);assert.equal(credit.filter(x=>x.detail.competence==='Avanzada').length,6);assert(credit.every(x=>x.detail.errors>=1&&x.detail.attempts>=2&&x.detail.evidence.files&&x.date));
// Recarga y aislamiento por alumno: el juego nunca escribe en la clave de OS4.
assert(storage[`os6-archivos-${theme}-v1-default`]);assert(!storage[`os4-archivos-${theme}-v1`]);run("selectLevel(0);$('begin').onclick();path=task().path;$('filename').value=task().name;save();restore();loadTask()");assert.equal(run('taskIndex'),1);
console.log('PASS '+theme+': 36 encargos de OS4, niveles, hacker directo, errores, versiones, movimiento, evidencias y recarga.');
}
const record=JSON.parse(storage['os6-expediente-v1']);assert(new Set(record.logs.filter(x=>x.action==='accredited').map(x=>x.module)).size===2);
assert.equal(R.createFolder(['Documentos'],'Documentos','../mal').ok,false);assert.equal(R.createFolder(['Documentos'],'Documentos','').ok,false);
console.log('PASS: ambas estaciones alimentan el mismo expediente de OS6.');
