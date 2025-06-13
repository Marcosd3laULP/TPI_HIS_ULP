PROYECTO REALIZADO POR EL ALUMNO:
Sosa Chirino Marcos Antonio
DNI: 46807958

QUE SE UTILIZO PARA EL DESARROLLO:
para el desarrollo, se utilizaron las herramientas vistas en clase y provistas por el equipo docente:
-NodeJS
-Express
-Sequelize (y mysql)
-Pug

Este proyecto tiene una base de datos en la nube, esta conectada a traves de Railway:
(Link de la base de datos):
https://railway.com/project/b48ac618-8046-46d8-8ba5-ec039b2abd61/settings/members?environmentId=55a3642c-4c70-47ce-b6d1-a524c4fc17b2
(Segundo link por las dudas):
https://railway.com/invite/6pJNz1MMe81

El proyecto fue subido a la web a traves de Render, tanto como Railway y Vercel no me resultaron
(Link del proyecto en la web):
https://tpi-his-ulp.onrender.com

ANTES DE EJECUTAR EL PROYECTO:
si usted va a probar el proyecto de forma local, recuerde hacer "npm install" para instalar todos los paquetes
y dependencias que sean necesarias.

EL ARCHIVO .ENV (por si necesita revisar las variables que utilice):
DB_HOST=crossover.proxy.rlwy.net
DB_USER=root
DB_PASSWORD=HwUcmnUZABlSqIDTXNCJjpsNlPdSZJTD
DB_PORT=10493
DB_NAME=railway
DB_DIALECT=mysql
PORT = 10000 (Es '10000' por que lo exige render)

EXPLICACIÓN DE USO DEL SISTEMA:
A este sistema, lo testeee un millar de veces, corrigiendo errores y sellando huecos de validaciones.
Hasta aqui, no deberia de romperse el sistema, pero si poder mostrar los errores.
Falto algunas puliciones menores que no afectan al flujo de internación.

Con respecto al flujo, solo esta disponible la parte de cargar un paciente e internarlo, faltan las 
partes de la evaluación por enfermeria por el medico y también la parte de emergencias.
Asi que el sistema solo puede internar pacientes cuya situación siempre sera una "Internacion planeada"

En el video se muestra como realizar el proceso de internación y nada más, en cuanto a las demas vistas
quedan como invitación a probarlas.

(Link del video): https://youtu.be/7nTCFYa049E 

LO QUE PUEDE HACER MI SISTEMA (por ahora):

*Proceso de internación de un paciente, ya sea un nuevo paciente o uno ya cargado en la base de datos.
*Edición de datos de pacientes
*Insercion y edicion de medicos y enfermeros (los enfermeros por el momento no tienen alguna funcionalidad particular)
*Eliminación de internaciones, para mayor comodidad deje una funcion que elimina una internación.
Esto por si se quiere limpiar toda la base de datos.

MI SINCERA OPINION:
Todo esto resulta nuevo para mi, si bien, el año pasado, aprendí como hacer un sitio web simple, el realizar este trabajo integrador
que me resulto COLOSAL. 
Aprender a usar nuevas herramientas, pensar y organizar el codigo, experimentar con funciones o modelos de interfaces
interactivas etc. Aunque hoy no lo maneje con gran destreza, me alegra saber que pude dar mi primeros pasos en el mundo del desarrollo web.