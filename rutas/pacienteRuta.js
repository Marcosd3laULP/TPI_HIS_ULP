const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");

// Página principal de pacientes (menú u opciones)
router.get("/", pacienteControl.mostrarOpPaciente);
// Mostrar formulario de admisión (vista pug)
router.get("/admision", pacienteControl.formularioAdmision);
router.post("/admision", pacienteControl.cargarPaciente);
router.get("/lista-pacientes", pacienteControl.obtenerPacientes);
router.get("/edicion/:id", pacienteControl.formularioEdicionPaciente);
router.post("/:id", pacienteControl.actualizarPaciente);

module.exports = router;
