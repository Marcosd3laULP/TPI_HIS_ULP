const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");
const internacionControl = require("../Control/internacionControl");
const { checkRole } = require("../Control/userMiddleware");

const soloRecepcion = checkRole("recepcion");

// Página principal de pacientes (menú u opciones)
router.get("/", soloRecepcion, pacienteControl.mostrarOpPaciente);
router.get("/internaciones", soloRecepcion, pacienteControl.seccionInternados);
router.get("/internaciones/internarPaciente", soloRecepcion, pacienteControl.listaPacientesInternar);
// Mostrar formulario de admisión
router.get("/admision",soloRecepcion, pacienteControl.formularioAdmision);
router.post("/admision",soloRecepcion, pacienteControl.cargarPaciente);
router.get("/lista-pacientes",soloRecepcion, pacienteControl.obtenerPacientes);
router.get("/edicion/:id",soloRecepcion, pacienteControl.formularioEdicionPaciente);
router.get("/confirmacion/:id",soloRecepcion, pacienteControl.formularioConfirmacionPaciente);
router.post("/edicion/:id",soloRecepcion, pacienteControl.actualizarPaciente);
router.post("/confirmacion/:id",soloRecepcion, pacienteControl.ConfirmarDatosPaciente);
//LOGICA DE LA INTERNACION:
router.get("/internaciones/internar/:id",soloRecepcion, internacionControl.interfazInternacion);
router.post("/internaciones/realizar-internacion",soloRecepcion, internacionControl.realizarInternacion);
router.get("/internaciones/lista-internados",soloRecepcion, internacionControl.buscarTodoInternados);
router.post('/internaciones/cancelar/:id',soloRecepcion, internacionControl.cancelarInternacion);
module.exports = router;
