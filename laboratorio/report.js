(function(root){'use strict';
function report(data){const doc=new root.jspdf.jsPDF();let y=22;let page=1;const txt=s=>String(s).replaceAll('–','-').replaceAll('→','/').replaceAll('·',' / ');
function footer(){doc.setFontSize(9);doc.setTextColor(90);doc.text('OS6 / Expediente de aprendizaje / Página '+page,18,286);doc.setTextColor(20,45,70);}
function line(s,size=11){doc.setFontSize(size);const lines=doc.splitTextToSize(txt(s),174);for(const l of lines){if(y>272){footer();doc.addPage();page++;y=22;}doc.text(l,18,y);y+=size===17?9:5.5;}y+=3;}
line('Expediente de Tecnología - OS6',17);line('6.º de primaria / Ciclo escolar 2026-2027');line('Alumno: '+(data.student||'Sin identificar')+' / Grupo: '+(data.group||'Sin indicar'));line('Explorador: '+data.basic+'/15 / Hacker Lab: '+data.advanced+'/10');line('Autonomía basada en pistas solicitadas en la aplicación. Evidencias locales, sin certificación externa. No mide ayuda fuera de la aplicación.',10);
line('Habilidades acreditadas',14);
for(const e of data.logs.filter(x=>x.action==='accredited')){line(`${new Date(e.date).toLocaleString('es-MX')} / ${e.module} / Misión ${e.mission}\n${e.detail.skill}\nIntentos: ${e.detail.attempts} / Errores: ${e.detail.errors} / ${e.detail.autonomy}`,10);}
line('Bitácora y evidencias',14);for(const e of data.logs){line(`${e.date} / ${e.module} / Misión ${e.mission} / ${e.action} / ${e.ok?'Correcto':'Error'}`,10);line(JSON.stringify(e.detail,null,2),9);}
footer();return doc;}
root.OS6Report=report;
})(globalThis);
