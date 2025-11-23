const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");
const enfermeroControl = require("../Control/enfermeroControl");

router.get("/", prestadorControl.mostrarOpPrestador); //Seccion de opciones
router.get("/medicos", prestadorControl.seccionDeMedicos);
router.get("/listaPrestador", prestadorControl.vistaPrestadores);//Buscamos a los prestadores
router.get("/insertar", prestadorControl.formularioNuevoPrestador);//Deriva a formulario
router.post("/insertar", prestadorControl.insertarPrestador);//Capturamos y mandamos los datos a la bd
router.get("/editar/:id",prestadorControl.formularioEditarPrestador);
router.post("/:id", prestadorControl.actualizarPrestador);
//FLUJO DE ENFERMERO
router.get("/enfermeros", enfermeroControl.mostrarOpEnfermero);
router.get("/enfermeros/internados", enfermeroControl.buscarTodoEnfermero);
router.get("/enfermeros/evaAntecedentes", enfermeroControl.vistaAntecedentes);
router.post("/guardarAntecedenteYMedicina",enfermeroControl.guardarAntecedenteYMedicina);
router.get("/evaObservacion/:ID_Paciente/:ID_Profesional", enfermeroControl.vistaObservacion);
router.post("/guardarObservacion", enfermeroControl.guardarObservacion);
router.get("/cuidadoPreliminar/:ID_Paciente/:ID_Profesional", enfermeroControl.vistaCuidadoPreliminar);
router.post("/guardarEvaluacionFinal",enfermeroControl.guardarPlanPreliminar);
router.get("/InternosCuidados", enfermeroControl.vistaInternosLista);
router.get("/vistaCuidados/:id", enfermeroControl.vistaCuidados);


module.exports = router;