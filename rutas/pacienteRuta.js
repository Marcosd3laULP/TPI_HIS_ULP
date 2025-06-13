const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");
const internacionControl = require("../Control/internacionControl");

// Página principal de pacientes (menú u opciones)
router.get("/", pacienteControl.mostrarOpPaciente);
router.get("/internaciones", pacienteControl.seccionInternados);
router.get("/internaciones/internarPaciente",pacienteControl.listaPacientesInternar);
// Mostrar formulario de admisión
router.get("/admision", pacienteControl.formularioAdmision);
router.post("/admision", pacienteControl.cargarPaciente);
router.get("/lista-pacientes", pacienteControl.obtenerPacientes);
router.get("/edicion/:id", pacienteControl.formularioEdicionPaciente);
router.get("/confirmacion/:id", pacienteControl.formularioConfirmacionPaciente);
router.post("/edicion/:id", pacienteControl.actualizarPaciente);
router.post("/confirmacion/:id", pacienteControl.ConfirmarDatosPaciente);
//LOGICA DE LA INTERNACION:
router.get("/internaciones/internar/:id", internacionControl.interfazInternacion);
router.post("/internaciones/realizar-internacion", internacionControl.realizarInternacion);
router.get("/internaciones/lista-internados", internacionControl.buscarTodoInternados);
//router.post('/internaciones/cancelar/:id', internacionControl.cancelarInternacion);
module.exports = router;
