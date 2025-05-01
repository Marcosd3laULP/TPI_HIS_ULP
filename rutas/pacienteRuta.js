const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");

router.get("/",pacienteControl.mostrarOpPaciente);

router.get("/admision", pacienteControl.cargarPaciente);

router.post("/admision", pacienteControl.insertarPaciente);

module.exports = router;