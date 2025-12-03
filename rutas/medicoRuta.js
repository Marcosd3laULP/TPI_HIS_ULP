const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");

//FLUJO DEL EQUIPO MEDICO
router.get("/vistaInternos", prestadorControl.vistaInternos);
router.get("/evaMedica", prestadorControl.vistaEvaMedica);
router.post("/guardarEvaluacionMedica", prestadorControl.guardarEvaluacionMedica);
router.get("/nuevoPedido", prestadorControl.vistaSolicitudPedido);
router.get("/gestionPedidos", prestadorControl.vistaDePedidosDeUnPaciente);
router.post("/guardarPedido", prestadorControl.guardarPedido);
router.get("/listaPedidos", prestadorControl.vistaListadoDePedidos);
router.get("/realizarPedido", prestadorControl.vistaRealizacionDeUnPedido);
router.post("/guardarResultado", prestadorControl.guardarResultado);
router.get("/gestionInternos", prestadorControl.vistaInternadosEnSeccMedico);
router.get("/gestionTratamientos", prestadorControl.vistaDeTratamientos);
router.get("/gestionEvaluaciones", prestadorControl.vistaEvaluacionesDeUnPaciente);
router.get("/nuevoTratamiento", prestadorControl.vistaNuevoTratamiento);
router.post("/guardarTratamiento", prestadorControl.guardarTratamiento);

module.exports = router;