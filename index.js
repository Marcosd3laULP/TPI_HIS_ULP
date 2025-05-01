const express = require("express"); 
const PORT = 3000; 
const path = require("path");

const app = express(); 
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

const rutas = require('./rutas/rutaInicio'); //Importamos las rutas
const pacientesRutas = require('./rutas/pacienteRuta');


app.set("view engine", "pug");
app.set("views", path.join(__dirname, "./Vista"));

app.use('/',rutas);
app.use('/pacientes', pacientesRutas);



app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});

/*const express = require("express"); //Aqui invocamos el paquete express
const app = express(); // pasamos el paquete express a una variable, para poder usar sus funciones
const PORT = 3000; //El puerto por defecto es "3000".
const path = require("path");


app.use(express.json()); //Con este codigo, podremos leer cualquier archivo JSON,
//Se llama eso "middleware".

//CONFIGURACIÓN PARA USAR PUG:
app.set("view engine", "pug");
//Añadimos la carptea "vista" a "index.js":
app.set("views", path.join(__dirname, "./Vista"));


//Levantamos e iniciamos el servidor:
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});*/ 


//Ruta de prueba:
/*app.get("/", (req, res) =>{
    res.send("Servidor funcionando exitosamente :D :D");
   
});*/