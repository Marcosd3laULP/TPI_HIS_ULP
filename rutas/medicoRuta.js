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
router.get("/detallePedido/:idPedido", soloMedico, prestadorControl.detallePedido);
router.post("/guardarPedido", soloMedico, prestadorControl.guardarPedido);
router.get("/listaPedidos", soloMedico, prestadorControl.vistaListadoDePedidos);
router.get("/realizarPedido", soloMedico, prestadorControl.vistaRealizacionDeUnPedido);
router.post("/guardarResultado", soloMedico, prestadorControl.guardarResultado);
router.get("/gestionInternos", soloMedico, prestadorControl.vistaInternadosEnSeccMedico);
router.get("/gestionTratamientos", soloMedico, prestadorControl.vistaDeTratamientos);
router.get("/gestionEvaluaciones", soloMedico, prestadorControl.vistaEvaluacionesDeUnPaciente);
router.get("/nuevoTratamiento", soloMedico, prestadorControl.vistaNuevoTratamiento);
router.post("/guardarTratamiento", soloMedico, prestadorControl.guardarTratamiento);

//FLUJO ALTA:
router.get("/alta", soloMedico, prestadorControl.vistaFormularioAlta);
router.post("/alta", soloMedico, prestadorControl.guardarAlta);
router.get("/listaAltas", soloMedico, prestadorControl.listarAltas);
router.get("/altaDetalle", soloMedico, prestadorControl.detalleAlta);


module.exports = router;