require('dotenv').config();
const express = require("express"); 
const PORT = process.env.PORT || 3000;
const path = require("path");
const sequelize = require("./baseDatos/bd");
const app = express(); 

//AUTENTICACION:
const session = require("express-session");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const csrf = require("csurf");
///////////////////////////////////////////////////////
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

//AUTENTICACION:
app.use(helmet());
const limiter = rateLimit({windowMs: 5*60*1000, max:100});
app.use(limiter);

const sessionStore = new SequelizeStore({db:sequelize});
app.use(session({
  secret: process.env.SESSION_SECRET || 'el_misterio_del_misterio',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'firmamento',
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000
  }
}));
sessionStore.sync();

app.use (csrf());

app.use(async (req, res, next) =>{
  res.locals.currentUser = req.session.user || null;
  next();
});
///////////////////////////////////////////////////////

const rutas = require('./rutas/rutaInicio'); //Importamos las rutas
const userRutas = require('./rutas/userRuta');
const pacientesRutas = require('./rutas/pacienteRuta');
const prestadorRutas = require("./rutas/prestadorRuta");
const medicoRutas = require("./rutas/medicoRuta");
const enfermeroRutas = require("./rutas/enfermeroRuta");
const turnoRutas = require("./rutas/turnoRuta");
const apiRutas = require("./rutas/apiRuta");



app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./Vista"));

app.use("/api", apiRutas);
app.use('/', rutas);       
app.use('/usuario', userRutas);
app.use('/pacientes', pacientesRutas);
app.use('/prestador', prestadorRutas);
app.use('/enfermeria', enfermeroRutas);
app.use('/medicos', medicoRutas);
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
