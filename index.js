require('dotenv').config();
const express = require("express"); 
const PORT = process.env.PORT || 3000;
const path = require("path");
const sequelize = require("./baseDatos/bd");
const app = express(); 


app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const rutas = require('./rutas/rutaInicio'); //Importamos las rutas
const pacientesRutas = require('./rutas/pacienteRuta');
const prestadorRutas = require("./rutas/prestadorRuta");
const turnoRutas = require("./rutas/turnoRuta");
const apiRutas = require("./rutas/apiRuta")


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./Vista"));

app.use("/api", apiRutas);
app.use('/', rutas);       
app.use('/pacientes', pacientesRutas);
app.use('/prestador', prestadorRutas);
app.use('/turnos', turnoRutas);

app.use(express.static('public'));


//PROBAMOS LA CONEXION A LA BASE
sequelize.authenticate()
  .then(() => {
    console.log("Conexión a la BD establecida.");
    if (process.env.NODE_ENV !== 'production') {
      return sequelize.sync({ alter: false });
    }
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Servidor en http://localhost:${PORT}`));
  })
  .catch((error) => console.error("Error:", error));

// Cierre limpio
process.on('SIGINT', async () => {
  await sequelize.close();
  process.exit(0);
});
