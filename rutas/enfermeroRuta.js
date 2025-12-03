const express = require("express");
const router = express.Router();
const enfermeroControl = require("../Control/enfermeroControl");
//FLUJO DE ENFERMERO
router.get("/seccionEnf", enfermeroControl.mostrarOpEnfermero);
router.get("/internados", enfermeroControl.buscarTodoEnfermero);
router.get("/evaAntecedentes", enfermeroControl.vistaAntecedentes);
router.post("/guardarAntecedentes",enfermeroControl.guardarAntecedentes);
router.get("/evaObservacion/:ID_internacion/:profesionalOmodo", enfermeroControl.vistaObservacion);
router.post("/guardarObservacion", enfermeroControl.guardarObservacion);
router.get("/cuidadoPreliminar/:ID_internacion/:profesionalOmodo", enfermeroControl.vistaCuidadoPreliminar);
router.post("/guardarEvaluacionFinal",enfermeroControl.guardarPlanPreliminar);
router.get("/InternosCuidados", enfermeroControl.vistaInternosLista);
router.get("/vistaCuidados/:id", enfermeroControl.vistaCuidados);
router.get("/PlanCuidados/:idInterno", enfermeroControl.vistaDetalleInternado);

module.exports = router;