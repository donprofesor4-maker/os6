(function(root){'use strict';
const theme=document.body.dataset.theme,module=theme==='space'?'Estación espacial':'Central de archivos',profile=localStorage.getItem('os6-active-student')||'default',key='os6-expediente-v1'+(profile==='default'?'':'-'+profile);
function read(){const raw=localStorage.getItem(key);return raw?JSON.parse(raw):new OS6Lab.Lab().data;}
function write(data){try{localStorage.setItem(key,JSON.stringify(data));}catch{let warning=document.getElementById('record-warning');if(!warning){warning=document.createElement('p');warning.id='record-warning';warning.setAttribute('role','alert');document.querySelector('footer').append(warning);}warning.textContent='No se pudo conservar la evidencia. Revisa el almacenamiento antes de cerrar.';}}
function index(d){return d.level*3+d.taskIndex+1;}
function log(action,ok,detail){const data=read();data.logs.push({date:new Date().toISOString(),module,mission:index(detail),action,ok,detail});write(data);}
function credit(d){const data=read(),mission=index(d),prior=data.logs.filter(x=>x.module===module&&x.mission===mission&&x.action!=='accredited');const skill=(theme==='space'?ArchiveRules.spaceNames:ArchiveRules.levelNames)[d.level];data.logs.push({date:new Date().toISOString(),module,mission,action:'accredited',ok:true,detail:{skill,level:d.level+1,order:d.taskIndex+1,competence:d.level===10?'Avanzada':'Básica',attempts:prior.filter(x=>x.action==='guardar').length+1,errors:prior.filter(x=>!x.ok).length,autonomy:'No medido: instrucciones del encargo disponibles',evidence:{request:d.task,destination:d.path,name:d.name,folders:[...d.model.folders],files:d.model.files.map(f=>({...f}))}}});write(data);}
root.ArchiveEvidence={log,credit};
})(globalThis);
