# OS6 - Sexto de primaria

Sitio: https://donprofesor4-maker.github.io/os6/

Conserva las prácticas originales (20 misiones normales, 30 avanzadas y las dos actividades de animación). El escritorio incluye:

- **Misiones de archivos:** 15 tareas progresivas evaluadas por operaciones y estado de archivos.
- **Hacker Lab:** 10 retos desbloqueables, terminal simulada sin acceso al sistema operativo ni ejecución de archivos. Se desbloquea al terminar Explorador.
- **Mi expediente:** alumnos separados, fechas, bitácora, errores, intentos, competencias, pistas solicitadas y evidencias de archivos. Las misiones originales registran su acreditación desde esta versión; no se inventan registros anteriores.
- **PDF:** descarga directa del reporte, incluyendo bitácora y evidencias, sin servicios externos. jsPDF 4.2.1 está incluido con su licencia.
- **Respaldo JSON:** descargar/restaurar el expediente del alumno. La restauración combina bitácoras y toma el estado de archivos del respaldo.

## Conservación

Los expedientes y las prácticas se almacenan en localStorage por alumno y navegador. Cambiar de equipo, borrar los datos del navegador o usar navegación privada no ofrece conservación garantizada. Descargar respaldos al finalizar cada sesión escolar. No hay servidor escolar ni sincronización de cuentas; los registros locales son editables y no equivalen a una certificación firmada. Las animaciones originales se conservan y no se atribuyen aprendizajes sin un evaluador propio. La autonomía indica uso de pistas en el laboratorio; no puede medir ayuda externa.

## Uso

Abrir Mi expediente, nombrar al alumno o crear otro expediente antes de practicar. Para crear o guardar archivos, abrir la carpeta de destino. Para copiar/mover, seleccionar archivo, Copiar/Cortar, abrir destino, Pegar. Para exportar la misión 12, seleccionar el informe en Proyecto y escribir `Evidencias/informe-final.html` como destino. En terminal: `help`, rutas absolutas con `/Documentos`, comillas para nombres o textos con espacios. No hay temporizadores ni botón para acreditar sin realizar operaciones.

## Validación

`node tests/laboratorio.cjs`

Cubre las 25 misiones, errores, copias, movimientos, recuperación, contenido, exportación, comandos simulados, persistencia y rechazo de rutas inválidas. Para revisión visual: `python3 -m http.server 8766`.
