const express = require("express");
const res = require("express/lib/response");
const enrutador = express.Router();
const fs = require("fs");
const path = require("path");

//RUTA PARA LISTAR PACIENTES:
enrutador.get('/pacient', (req, res) =>{
fs.readFile(path.join(__dirname, '../Paciente.json'), "utf-8", (err, data) => {
    if(err){
        res.status(500).send('Hubo un error al leer los datos de los pacientes');
        return;
    }

    const paciente = JSON.parse(data);
    res.render(`listado, ${ paciente }`);
    
});
});

//EXPORTAMOS EL ARCHIVO RUTAS A INDEX.JS

module.exports = enrutador;