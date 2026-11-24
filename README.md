# OS6 - Sexto de primaria

https://donprofesor4-maker.github.io/os6/

## Los mismos dos juegos de OS4

- **Central de archivos:** diez niveles, treinta encargos y seis encargos de reto hacker.
- **Estación espacial:** diez niveles, treinta encargos y seis encargos de reto hacker.

Referencia: OS4, commit `62ba25d580800dfc495dd0d80d622c7d1a2b39e8`.

Se copiaron del OS4 publicado las reglas, misiones, archivos, nombres, rutas y estilos. Se mantienen Guardar como, Mover a, Crear carpeta, Cancelar, Siguiente encargo, Siguiente nivel, Reiniciar este nivel, selección de nivel, sonido opcional y el botón directo Reto hacker disponible desde el inicio de cada juego. Se cambia la identificación a OS6, sexto de primaria y Órbita 06, y se conecta el resultado al expediente.

Las reglas y la hoja de estilos de ambos juegos coinciden con la referencia OS4. No se sustituye el reto hacker original por una terminal distinta. La dificultad, el orden y el número de entregas se mantienen.

## Expediente

Los dos juegos registran fecha, nivel, encargo, destino, nombre final, carpetas y archivos resultantes, errores e intentos de guardado. Las competencias básicas y de hacker se distinguen. Mi expediente permite seleccionar alumno, descargar PDF y respaldar/restaurar JSON. Elegir el alumno en Mi expediente antes de entrar a cualquiera de las estaciones.

Los expedientes y progresos son locales por alumno y navegador. Descargar respaldos para conservar los registros fuera del equipo. La restauración del expediente recupera evidencias, no las sesiones independientes de las estaciones. La autonomía de los juegos de OS4 no se mide: se informa así explícitamente en el reporte. No se inventan evidencias de actividades realizadas antes de esta integración.

Se conservan las prácticas originales de OS6, las dos animaciones y las evidencias de las versiones anteriores del laboratorio. Esas versiones anteriores ya no sustituyen las dos estaciones ni aparecen como accesos principales.

## Verificación

`node tests/estaciones.cjs` comprueba los 72 encargos, las misiones idénticas a OS4, errores, versiones, movimiento, desbloqueos, hacker directo, evidencias compartidas y recarga.

`node tests/laboratorio.cjs` verifica la compatibilidad del motor anterior conservado.

Para revisión visual: `python3 -m http.server 8766`.

jsPDF 4.2.1 está incluido localmente con su licencia; el PDF se genera en el navegador.
