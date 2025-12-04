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
//LOGICA DE EMERGENCIAS:
router.get("/internaciones/emergencia", soloRecepcion, internacionControl.vistaEmergencia);
router.post("/internaciones/emergencia/registrarEmergencia", soloRecepcion, internacionControl.registrarEmergencia);
router.get("/internaciones/emergenciaInternacion/:id", soloRecepcion, internacionControl.vistaEmergenciaInternacion);
router.post("/internaciones/realizarInternacionDeEmergencia", soloRecepcion, internacionControl.realizarInternacionDeEmergencia);

router.get("/internaciones/normalizar/:id", soloRecepcion, internacionControl.vistaNormalizar);
router.post("/internaciones/normalizar/buscar", soloRecepcion, internacionControl.procesarBusqueda);
router.get("/internaciones/confirmar/:idPacienteNormal/:idPacienteEmergencia", soloRecepcion, internacionControl.mostrarConfirmar);
router.post("/internaciones/confirmar/guardar", soloRecepcion, internacionControl.confirmarDatosPaciente);
router.get("/internaciones/registroAnonimo/:idPacienteEmergencia", soloRecepcion, internacionControl.mostrarRegistroAnonimo);
router.post("/internaciones/anonimo/guardar", soloRecepcion, internacionControl.guardarRegistroAnonimo);

//FLUJO DE TRASLADO:

router.get('/internaciones/traslado/:idInternacion', soloRecepcion, internacionControl.vistaTraslado);
router.post('/internaciones/trasladar', soloRecepcion, internacionControl.realizarTraslado);

module.exports = router;
