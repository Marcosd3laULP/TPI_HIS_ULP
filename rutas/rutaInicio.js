const express = require("express");
const router = express.Router();
const inicioControl = require("../Control/inicioControl");

router.get("/",inicioControl.mostrarInicio);

module.exports = router; //MUY IMPORTANTE, ESTA LINEA
//¿NO EXPORTE BIEN LA RUTA? NI SUEÑO CON QUE TRABAJE BIEN