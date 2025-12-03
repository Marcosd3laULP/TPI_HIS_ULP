const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");
const { checkRole } = require("../Control/userMiddleware");

const soloMedico = checkRole("medico");
//FLUJO DEL EQUIPO MEDICO
router.get("/vistaInternos", soloMedico, prestadorControl.vistaInternos);
router.get("/evaMedica", soloMedico, prestadorControl.vistaEvaMedica);
router.post("/guardarEvaluacionMedica", soloMedico, prestadorControl.guardarEvaluacionMedica);
router.get("/nuevoPedido", soloMedico, prestadorControl.vistaSolicitudPedido);
router.get("/gestionPedidos", soloMedico, prestadorControl.vistaDePedidosDeUnPaciente);
router.post("/guardarPedido", soloMedico, prestadorControl.guardarPedido);
router.get("/listaPedidos", soloMedico, prestadorControl.vistaListadoDePedidos);
router.get("/realizarPedido", soloMedico, prestadorControl.vistaRealizacionDeUnPedido);
router.post("/guardarResultado", soloMedico, prestadorControl.guardarResultado);
router.get("/gestionInternos", soloMedico, prestadorControl.vistaInternadosEnSeccMedico);
router.get("/gestionTratamientos", soloMedico, prestadorControl.vistaDeTratamientos);
router.get("/gestionEvaluaciones", soloMedico, prestadorControl.vistaEvaluacionesDeUnPaciente);
router.get("/nuevoTratamiento", soloMedico, prestadorControl.vistaNuevoTratamiento);
router.post("/guardarTratamiento", soloMedico, prestadorControl.guardarTratamiento);

module.exports = router;