const express = require("express"); 
const PORT = 3000; 
const path = require("path");
const sequelize = require("./baseDatos/bd");
const app = express(); 


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const rutas = require('./rutas/rutaInicio'); //Importamos las rutas
const pacientesRutas = require('./rutas/pacienteRuta');
const prestadorRutas = require("./rutas/prestadorRuta");


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./Vista"));

app.use('/',rutas);
app.use('/pacientes', pacientesRutas);
app.use('/prestador', prestadorRutas);


//PROBAMOS LA CONEXION A LA BASE
sequelize.authenticate()
    .then(() => {
        console.log("Conexión a la base de datos establecida con éxito.");
        return sequelize.sync(); // sincroniza modelos (opcional y cuidadoso en producción)
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Servidor escuchando en http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error("Error al conectar con la base de datos:", error);
    });

    // Cerrar la conexión cuando el servidor se apaga
process.on('SIGINT', async () => {
    try {
        await sequelize.close(); // Cierra la conexión de Sequelize
        console.log("Conexión a la base de datos cerrada correctamente.");
        process.exit(0); // Termina el proceso correctamente
    } catch (error) {
        console.error("Error al cerrar la conexión:", error);
        process.exit(1); // Termina el proceso con error
    }
});
