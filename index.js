const express = require("express"); //Aqui invocamos el paquete express
const app = express(); // pasamos el paquete express a una variable, para poder usar sus funciones
const PORT = 3000; //El puerto por defecto es "3000".

app.use(express.json()); //Con este codigo, podremos leer cualquier archivo JSON,
//Se llama eso "middleware".

//Ruta de prueba:
app.get("/", (req, res) =>{
    res.send("Servidor funcionando exitosamente :D :D");
   
});

//Levantamos e iniciamos el servidor:
app.listen(PORT, () => {
    console.log(`servidor escuchando en http://localhost:${PORT}`);
});