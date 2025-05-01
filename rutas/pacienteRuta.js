const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");

router.get("/",pacienteControl.mostrarOpPaciente);

router.get("/admision", pacienteControl.cargarPaciente);

router.post("/admision", pacienteControl.insertarPaciente);

router.get("/lista", pacienteControl.listarPacientes);

router.get("/edicion/:id", pacienteControl.cargarDatosAModificar);

router.post("/edicion/:id", pacienteControl.guardarLosCambios);

module.exports = router;