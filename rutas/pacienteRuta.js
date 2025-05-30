const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");
const internacionControl = require("../Control/internacionControl");

// Página principal de pacientes (menú u opciones)
router.get("/", pacienteControl.mostrarOpPaciente);
router.get("/internaciones", pacienteControl.seccionInternados);
router.get("/internaciones/internarPaciente",pacienteControl.listaPacientesInternar);
// Mostrar formulario de admisión (vista pug)
router.get("/admision", pacienteControl.formularioAdmision);
router.post("/admision", pacienteControl.cargarPaciente);
router.get("/lista-pacientes", pacienteControl.obtenerPacientes);
router.get("/edicion/:id", pacienteControl.formularioEdicionPaciente);
router.post("/:id", pacienteControl.actualizarPaciente);
//LOGICA DE LA INTERNACION:
router.get("/internaciones/internar/:id", internacionControl.interfazInternacion);

module.exports = router;
