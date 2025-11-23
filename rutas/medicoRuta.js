const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");

//FLUJO DEL EQUIPO MEDICO
router.get("/vistaInternos", prestadorControl.vistaInternos);
router.get("/evaMedica", prestadorControl.vistaEvaMedica);
router.post("/guardarEvaluacionMedica", prestadorControl.guardarEvaluacionMedica);
router.get("/nuevoPedido", prestadorControl.vistaSolicitudPedido);

module.exports = router;