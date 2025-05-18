const express = require("express");
const router = express.Router();
const turnoControl = require("../Control/turnoControl");

router.get("/", turnoControl.mostrarOpTurnos);
router.get("/:id/turnosV2", turnoControl.formTurnoAdmision);
router.post("/:id/turnosV2", turnoControl.insertarTurnoV2);
router.get("/lista-turnos", turnoControl.buscarTodoTurno);
router.post("/:Nro_turno/anunciar", turnoControl.anunciar);
router.post("/:Nro_turno/cancelar", turnoControl.cancelar);

module.exports = router;