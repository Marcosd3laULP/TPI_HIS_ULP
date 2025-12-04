const express = require("express");
const router = express.Router();
const enfermeroControl = require("../Control/enfermeroControl");
const { checkRole } = require("../Control/userMiddleware");

const soloEnfermero = checkRole("enfermero");
//FLUJO DE ENFERMERO
router.get("/seccionEnf", soloEnfermero, enfermeroControl.mostrarOpEnfermero);
router.get("/internados", soloEnfermero, enfermeroControl.buscarTodoEnfermero);
router.post("/internados/escoger", soloEnfermero, enfermeroControl.escogerEnfermero);
router.get("/evaAntecedentes", soloEnfermero, enfermeroControl.vistaAntecedentes);
router.post("/guardarAntecedentes", soloEnfermero, enfermeroControl.guardarAntecedentes);
router.get("/evaObservacion/:ID_internacion/:profesionalOmodo", soloEnfermero, enfermeroControl.vistaObservacion);
router.post("/guardarObservacion", soloEnfermero, enfermeroControl.guardarObservacion);
router.get("/cuidadoPreliminar/:ID_internacion/:profesionalOmodo", enfermeroControl.vistaCuidadoPreliminar);
router.post("/guardarEvaluacionFinal", soloEnfermero,enfermeroControl.guardarPlanPreliminar);
router.get("/InternosCuidados", soloEnfermero, enfermeroControl.vistaInternosLista);
router.get("/vistaCuidados/:id", soloEnfermero, enfermeroControl.vistaCuidados);
router.get("/PlanCuidados/:idInterno", soloEnfermero, enfermeroControl.vistaDetalleInternado);

module.exports = router;