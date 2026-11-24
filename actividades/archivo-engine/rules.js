(function(root){
'use strict';
const roots=['Escritorio','Descargas','Documentos','Imágenes','Música','Videos'];
const central=[
 [['Jaguar.png','Imágenes'],['Cuento.txt','Documentos'],['Bosque.mp3','Música']],
 [['Recreo.mp4','Videos'],['Mapa.png','Imágenes'],['Aviso.txt','Documentos']],
 [['Tortuga.png','Imágenes/Animales'],['Montaña.png','Imágenes/Paisajes'],['Delfín.png','Imágenes/Animales']],
 [['Plantas.txt','Documentos/Ciencias'],['Leyenda.txt','Documentos/Español'],['Fracciones.txt','Documentos/Matemáticas']],
 [['Semillas.txt','Documentos/Ciencias/Plantas'],['Jaguar.txt','Documentos/Ciencias/Animales'],['Girasol.png','Imágenes/Plantas']],
 [['archivo01.png','Imágenes/Animales','Jaguar del bosque.png'],['archivo02.txt','Documentos/Ciencias','Reporte de plantas.txt'],['archivo03.mp4','Videos','Experimento.mp4']],
 [['Volcán.png','Imágenes/Paisajes','Volcán nuevo.png'],['Cuento.txt','Documentos/Español','Cuento nuevo.txt'],['Canto.mp3','Música','Canto nuevo.mp3']],
 [['Tortuga.png','Imágenes/Animales',null,'Documentos'],['Experimento.mp4','Videos',null,'Música'],['Leyenda.txt','Documentos/Español',null,'Imágenes']],
 [['Portada.png','Documentos/Museo'],['Guion.txt','Documentos/Museo'],['Recorrido.mp4','Documentos/Museo']],
 [['Portada.png','Documentos/Feria/Imágenes'],['Invitación.txt','Documentos/Feria/Textos'],['Presentación.mp4','Documentos/Feria/Videos']]
];
const space=[
 [['Luna.png','Imágenes'],['Bitácora.txt','Documentos'],['Señal.mp3','Música']],
 [['Despegue.mp4','Videos'],['Marte.png','Imágenes'],['Tripulación.txt','Documentos']],
 [['Marte.png','Imágenes/Planetas'],['Andrómeda.png','Imágenes/Galaxias'],['Venus.png','Imágenes/Planetas']],
 [['Motor.txt','Documentos/Ingeniería'],['Gravedad.txt','Documentos/Ciencia'],['Rumbo.txt','Documentos/Navegación']],
 [['Órbita.txt','Documentos/Ciencia/Planetas'],['Hielo.txt','Documentos/Ciencia/Lunas'],['Europa.png','Imágenes/Lunas']],
 [['captura01.png','Imágenes/Planetas','Superficie de Marte.png'],['informe02.txt','Documentos/Ingeniería','Reporte del motor.txt'],['registro03.mp3','Música','Señal de Europa.mp3']],
 [['Marte.png','Imágenes/Planetas','Marte nuevo.png'],['Rumbo.txt','Documentos/Navegación','Rumbo nuevo.txt'],['Señal.mp3','Música','Señal nueva.mp3']],
 [['Saturno.png','Imágenes/Planetas',null,'Documentos'],['Aterrizaje.mp4','Videos',null,'Música'],['Motor.txt','Documentos/Ingeniería',null,'Imágenes']],
 [['Mapa.png','Documentos/Misión Europa'],['Bitácora.txt','Documentos/Misión Europa'],['Llegada.mp4','Documentos/Misión Europa']],
 [['Superficie.png','Documentos/Expedición/Imágenes'],['Hallazgos.txt','Documentos/Expedición/Reportes'],['Descenso.mp4','Documentos/Expedición/Videos']]
];
const levelNames=['Recibir y guardar','Cuatro destinos','Dentro de una carpeta','Archivos por materia','Rutas de tres pasos','Nombres que explican','Conservar los originales','Rescate de archivos','Crea la carpeta','Organiza un proyecto'];
const spaceNames=['Primer contacto','Carga de la estación','Atlas del universo','Departamentos a bordo','Exploración profunda','Identifica los registros','Dos versiones','Rescate en órbita','Misión Europa','La gran expedición'];
central.push([
 ['captura01.png','Documentos/Museo digital/Animales/Imágenes','Jaguar - portada.png'],
 ['informe.txt','Documentos/Museo digital/Animales/Reportes','Jaguar - informe final.txt'],
 ['Volcán.png','Documentos/Museo digital/Geografía/Imágenes','Volcán - versión nueva.png'],
 ['audio02.mp3','Documentos/Museo digital/Animales/Audio','Jaguar - narración.mp3'],
 ['ensayo.mp4','Documentos/Museo digital/Presentación/Videos','Recorrido final.mp4','Descargas'],
 ['resumen.txt','Documentos/Museo digital/Geografía/Reportes','Resumen revisado.txt','Documentos/Borradores']
]);
space.push([
 ['captura01.png','Documentos/Expedición Orión/Europa/Imágenes','Europa - superficie.png'],
 ['informe.txt','Documentos/Expedición Orión/Europa/Reportes','Europa - informe final.txt'],
 ['Marte.png','Documentos/Expedición Orión/Marte/Imágenes','Marte - versión nueva.png'],
 ['señal02.mp3','Documentos/Expedición Orión/Europa/Audio','Europa - señal limpia.mp3'],
 ['ensayo.mp4','Documentos/Expedición Orión/Aterrizaje/Videos','Descenso final.mp4','Descargas'],
 ['resumen.txt','Documentos/Expedición Orión/Marte/Reportes','Resumen revisado.txt','Documentos/Borradores']
]);
levelNames.push('Reto hacker · Museo digital');spaceNames.push('Reto hacker · Expedición Orión');
function normalize(s){return String(s).normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('es')}
function build(theme,index){
 const source=theme==='space'?space:central, tasks=source[index].map(([file,path,name,from])=>({file,path,name:name||file,from:from||null}));
 const folders=new Set(roots);let files=[];
 const addPath=path=>{const parts=path.split('/');for(let i=1;i<=parts.length;i++)folders.add(parts.slice(0,i).join('/'))};
 tasks.forEach(t=>{if(index<8)addPath(t.path);if(t.from){addPath(t.from);files.push({name:t.file,path:t.from})}if(index===6)files.push({name:t.file,path:t.path})});
 if(index>=2&&index<8){['Imágenes/Animales','Imágenes/Paisajes','Documentos/Proyectos'].forEach(addPath)}
 if(index===10){
  const duplicate=tasks[2];addPath(duplicate.path);files.push({name:duplicate.file,path:duplicate.path});
  addPath('Documentos/Borradores');addPath('Documentos/Proyecto anterior/Reportes');
  addPath(tasks[0].path.split('/').slice(0,2).join('/')+'/Borradores');
  files.push({name:tasks[1].file,path:'Descargas'},{name:'informe final.txt',path:'Documentos/Borradores'});
 }
 return {tasks,folders:[...folders],files};
}
function validate(task,path,name,files){
 if(normalize(path)!==normalize(task.path))return {ok:false,message:`El destino es ${task.path.replaceAll('/',' › ')}. Revisa la ruta antes de guardar.`};
 if(normalize(name)!==normalize(task.name))return {ok:false,message:`Escribe el nombre solicitado: ${task.name}`};
 if(files.some(f=>f.path===path&&normalize(f.name)===normalize(name)))return {ok:false,message:'Ese nombre ya existe. Conserva el original y usa el nombre nuevo del encargo.'};
 return {ok:true};
}
function createFolder(folders,parent,name){
 name=String(name).trim();if(!name||/[\\/<>:"|?*]/.test(name)||/^\.+$/.test(name))return {ok:false,message:'Escribe un nombre de carpeta válido, sin diagonales ni signos especiales.'};
 if(parent&&!folders.includes(parent))return {ok:false,message:'Abre primero una carpeta válida.'};
 const path=parent?parent+'/'+name:name;if(folders.some(p=>normalize(p)===normalize(path)))return {ok:false,message:'Esta carpeta ya existe. Ábrela para continuar.'};
 return {ok:true,path};
}
const api={build,validate,createFolder,normalize,levelNames,spaceNames};
if(typeof module!=='undefined')module.exports=api;else root.ArchiveRules=api;
})(typeof window!=='undefined'?window:globalThis);
