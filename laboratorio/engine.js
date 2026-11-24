(function(root){
'use strict';
const basic=[
['Crea la carpeta Proyecto en Documentos.','Creación de carpetas'],
['Dentro de Proyecto, crea Evidencias.','Jerarquía de carpetas'],
['Guarda una nota llamada informe.txt en Proyecto. Escribe al menos 10 palabras.','Guardado de documentos'],
['Renombra informe.txt a informe-final.txt.','Administración de archivos'],
['Copia informe-final.txt a Evidencias conservando el original.','Copiar documentos'],
['Mueve foto.svg desde Descargas a Imágenes.','Mover archivos'],
['Crea Respaldo dentro de Documentos.','Creación de carpetas'],
['Copia informe-final.txt desde Proyecto a Respaldo.','Respaldos'],
['Elimina borrador.txt de Descargas.','Eliminación segura'],
['Recupera borrador.txt de la Papelera.','Recuperación de archivos'],
['Mueve borrador.txt de Descargas a Proyecto.','Organización de documentos'],
['Exporta informe-final.txt de Proyecto como informe-final.html en Evidencias.','Guardado y exportación'],
['Busca informe-final.txt usando el buscador.','Búsqueda de archivos'],
['Abre el informe-final.txt guardado en Respaldo.','Verificación de respaldo'],
['Entrega: mueve informe-final.html de Evidencias a Documentos y conserva las dos copias de informe-final.txt.','Organización y entrega']];
const advanced=[
['Localiza y abre clave.txt, un archivo oculto de Documentos.','Archivos ocultos'],
['Lee imagen.txt en Descargas y corrige su extensión según su contenido.','Extensiones de archivos'],
['Recupera perdido.txt de la Papelera.','Recuperación de documentos'],
['Usa dir y cd para llegar a Documentos/Proyecto/Evidencias.','Navegación en terminal'],
['Crea Laboratorio dentro de Documentos usando mkdir.','Creación desde terminal'],
['Copia informe-final.txt de Proyecto a Laboratorio y mueve perdido.txt de Descargas a Laboratorio.','Copiar y mover desde terminal'],
['Abre mensaje.txt en Documentos. Descifra el código binario y guarda la respuesta en respuesta.txt dentro de Laboratorio.','Código binario'],
['Lee pista.txt en Documentos y encuentra el archivo indicado.','Búsqueda por pistas'],
['Lee los archivos de Descargas. Aísla el archivo sospechoso en una carpeta Cuarentena dentro de Documentos.','Identificación de riesgos'],
['Entrega final: crea Entrega en Documentos, copia allí respuesta.txt e informe-final.txt desde Laboratorio y guarda un diagnostico.txt de al menos 20 palabras explicando tus decisiones de seguridad.','Resolución autónoma']];
const clean=s=>String(s).normalize('NFC').toLowerCase();
class Lab{
 constructor(data){this.data=data||{version:1,student:'',group:'',cycle:'2026–2027',basic:0,advanced:0,logs:[],fs:{Documentos:{type:'folder'},Descargas:{type:'folder'},'Imágenes':{type:'folder'},'Descargas/foto.svg':{type:'file',text:'<svg xmlns="http://www.w3.org/2000/svg"><circle r="10"/></svg>'},'Descargas/borrador.txt':{type:'file',text:'Borrador para recuperar.'}},trash:{}};this.cwd='Documentos';this.module='basic';this.search='';this.visible=false;this.clip=null;this.hints={};}
 get index(){return this.data[this.module]}
 get tasks(){return this.module==='basic'?basic:advanced}
 get task(){return this.tasks[this.index]}
 exists(p){return !!this.data.fs[p]}
 log(action,ok,detail){this.data.logs.push({date:new Date().toISOString(),module:this.module,mission:this.index+1,action,ok,detail});}
 seedAdvanced(){if(this.data.seeded)return;Object.assign(this.data.fs,{'Documentos/clave.txt':{type:'file',hidden:true,text:'Archivo oculto localizado.'},'Descargas/imagen.txt':{type:'file',text:'<svg xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20"/></svg>'},'Documentos/mensaje.txt':{type:'file',text:'01010000 01000001 01011010 · ASCII: cada grupo de 8 bits representa una letra.'},'Documentos/pista.txt':{type:'file',text:'Busca en Imágenes un nombre que empieza por mapa.'},'Imágenes/mapa.txt':{type:'file',text:'Encontraste el mapa de la expedición.'},'Descargas/premio.exe':{type:'file',text:'Promete premios y solicita tu contraseña. No lo ejecutes: aíslalo.'},'Descargas/lectura.txt':{type:'file',text:'Lectura escolar sin solicitudes de contraseñas.'}});this.data.trash['Descargas/perdido.txt']={type:'file',text:'Documento recuperado'};this.data.seeded=true;}
 resolve(p){if(!p)return this.cwd;const absolute=p.startsWith('/');const parts=(absolute?[]:this.cwd.split('/')).filter(Boolean);for(const x of p.replaceAll('\\','/').split('/')){if(!x||x==='.')continue;if(x==='..')parts.pop();else parts.push(x)}return parts.join('/')}
 act(action,a='',b=''){
 const f=this.data.fs,t=this.data.trash;let out='Operación realizada.',ok=false;
 try{
 const parent=p=>p.split('/').slice(0,-1).join('/');const valid=p=>p&&f[parent(p)]?.type==='folder'&&!f[p]&&!/[<>:"|?*]/.test(p)&&!p.split('/').some(x=>!x.trim()||x==='.'||x==='..');
 if(action==='mkdir'){if(!valid(a))throw Error('Revisa el nombre, la carpeta de destino o un duplicado.');f[a]={type:'folder'};}
 else if(action==='write'){if(!f[parent(a)]||f[parent(a)].type!=='folder'||f[a]?.type==='folder'||(!f[a]&&!valid(a)))throw Error('Destino inválido.');f[a]={type:'file',text:b};}
 else if(['copy','move','rename','export'].includes(action)){if(!f[a]||f[a].type!=='file'||!valid(b))throw Error('Selecciona un archivo y un destino nuevo válido.');if(action==='export'&&!b.endsWith('.html'))throw Error('Exporta con extensión .html.');f[b]=JSON.parse(JSON.stringify(f[a]));if(action==='export')f[b].text='<!doctype html><meta charset="utf-8"><pre>'+f[a].text.replaceAll('&','&amp;').replaceAll('<','&lt;')+'</pre>';if(action==='move'||action==='rename')delete f[a];}
 else if(action==='delete'){if(!f[a]||f[a].type!=='file')throw Error('Selecciona un archivo.');t[a]=f[a];delete f[a];}
 else if(action==='restore'){if(!t[a]||f[a]||f[parent(a)]?.type!=='folder')throw Error('No se puede restaurar ese archivo en su ubicación original.');f[a]=t[a];delete t[a];}
 else if(action==='read'){if(!f[a]||f[a].type!=='file'||f[a].hidden&&!this.visible)throw Error('El archivo no está visible.');out=f[a].text;}
 else if(action==='cd'){if(f[a]?.type!=='folder')throw Error('La carpeta no existe.');this.cwd=a;}
 else if(action==='dir'){out=Object.keys(f).filter(p=>parent(p)===this.cwd&&(!f[p].hidden||this.visible)).join('\n')||'Carpeta vacía';}
 else if(action==='hidden'){this.visible=true;out='Archivos ocultos visibles.';}
 else if(action==='search'){this.search=a;out=Object.keys(f).filter(p=>clean(p).includes(clean(a))&&(!f[p].hidden||this.visible)).join('\n')||'Sin resultados';}
 else throw Error('Operación desconocida.');
 ok=true;
 }catch(e){out=e.message;}
 this.log(action,ok,{a,b});if(ok)this.check(action,a,b);return {ok,out};
 }
 check(action,a,b){const f=this.data.fs,t=this.data.trash;const has=p=>!!f[p],words=p=>(f[p]?.text||'').trim().split(/\s+/).filter(Boolean).length;const did=(act,from,to)=>this.data.logs.some(x=>x.module===this.module&&x.mission===this.index+1&&x.action===act&&x.ok&&x.detail.a===from&&(to===undefined||x.detail.b===to));const p='Documentos/Proyecto',e=p+'/Evidencias',r='Documentos/Respaldo',l='Documentos/Laboratorio';let pass=false;
 if(this.module==='basic')pass=[()=>f[p]?.type==='folder',()=>f[e]?.type==='folder',()=>words(p+'/informe.txt')>=10,()=>action==='rename'&&a===p+'/informe.txt'&&b===p+'/informe-final.txt',()=>has(p+'/informe-final.txt')&&has(e+'/informe-final.txt')&&action==='copy'&&a===p+'/informe-final.txt'&&b===e+'/informe-final.txt',()=>action==='move'&&a==='Descargas/foto.svg'&&b==='Imágenes/foto.svg'&&!has('Descargas/foto.svg'),()=>f[r]?.type==='folder',()=>action==='copy'&&a===p+'/informe-final.txt'&&b===r+'/informe-final.txt',()=>!!t['Descargas/borrador.txt'],()=>action==='restore'&&a==='Descargas/borrador.txt',()=>action==='move'&&b===p+'/borrador.txt',()=>action==='export'&&a===p+'/informe-final.txt'&&b===e+'/informe-final.html',()=>action==='search'&&clean(a)==='informe-final.txt',()=>action==='read'&&a===r+'/informe-final.txt',()=>action==='move'&&a===e+'/informe-final.html'&&b==='Documentos/informe-final.html'&&has(p+'/informe-final.txt')&&has(r+'/informe-final.txt')][this.index]?.();
 else pass=[()=>action==='read'&&a==='Documentos/clave.txt'&&this.visible,()=>action==='rename'&&a==='Descargas/imagen.txt'&&b==='Descargas/imagen.svg'&&did('read','Descargas/imagen.txt'),()=>action==='restore'&&a==='Descargas/perdido.txt',()=>action==='cd'&&this.cwd===e&&this.data.logs.some(x=>x.module==='advanced'&&x.mission===4&&x.action==='dir'&&x.ok),()=>action==='mkdir'&&b==='terminal'&&a===l,()=>has(l+'/informe-final.txt')&&has(p+'/informe-final.txt')&&has(l+'/perdido.txt')&&!has('Descargas/perdido.txt')&&did('move','Descargas/perdido.txt',l+'/perdido.txt')&&this.data.logs.some(x=>x.module==='advanced'&&x.mission===6&&x.action==='copy'&&x.ok&&x.detail.b===l+'/informe-final.txt'),()=>action==='write'&&a===l+'/respuesta.txt'&&clean(f[a].text.trim())==='paz'&&did('read','Documentos/mensaje.txt'),()=>action==='read'&&a==='Imágenes/mapa.txt'&&did('read','Documentos/pista.txt'),()=>has('Documentos/Cuarentena/premio.exe')&&!has('Descargas/premio.exe')&&this.data.logs.some(x=>x.module==='advanced'&&x.mission===9&&x.action==='read'&&x.detail.a==='Descargas/premio.exe'&&x.ok),()=>has('Documentos/Entrega/respuesta.txt')&&has('Documentos/Entrega/informe-final.txt')&&has(l+'/respuesta.txt')&&has(l+'/informe-final.txt')&&words('Documentos/Entrega/diagnostico.txt')>=20&&did('copy',l+'/respuesta.txt','Documentos/Entrega/respuesta.txt')&&did('copy',l+'/informe-final.txt','Documentos/Entrega/informe-final.txt')][this.index]?.();
 if(pass){const logs=this.data.logs.filter(x=>x.module===this.module&&x.mission===this.index+1);this.log('accredited',true,{skill:this.task[1],attempts:logs.filter(x=>x.action!=='hint').length,errors:logs.filter(x=>!x.ok).length,autonomy:logs.some(x=>x.action==='hint')?'Con apoyo de pista':'Sin pistas solicitadas',evidence:JSON.parse(JSON.stringify(f))});this.data[this.module]++;}return pass;
 }
 command(line){const tokens=line.match(/"[^"]*"|\S+/g)?.map(s=>s.replace(/^"|"$/g,''))||[];const cmd=(tokens.shift()||'').toLowerCase(),a=tokens[0],b=tokens[1];if(cmd==='help')return {ok:true,out:'dir · cd "carpeta" · mkdir "carpeta" · type "archivo" · attrib -h · copy "origen" "destino" · move "origen" "destino" · ren "archivo" "nombre" · restore "ruta original" · find "nombre" · write "archivo" "contenido". Usa /Documentos para rutas absolutas. Solo simulación.'};const map={dir:'dir',cd:'cd',mkdir:'mkdir',type:'read',copy:'copy',move:'move',ren:'rename',restore:'restore',find:'search',write:'write',attrib:'hidden'};if(!map[cmd]||(!['dir','attrib'].includes(cmd)&&!a)||(['copy','move','ren','write'].includes(cmd)&&b===undefined)||cmd==='attrib'&&a!=='-h'){this.log('command',false,{line});return {ok:false,out:'Comando o argumentos inválidos. Escribe help.'};}const dest=['copy','move','ren'].includes(cmd)?this.resolve(b):cmd==='mkdir'?'terminal':b;return this.act(map[cmd],cmd==='find'?a:this.resolve(a),dest);}
}
const api={Lab,basic,advanced};if(typeof module!=='undefined')module.exports=api;else root.OS6Lab=api;
})(globalThis);
