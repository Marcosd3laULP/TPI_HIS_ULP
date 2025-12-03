const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");
const { checkRole } = require("../Control/userMiddleware");
const soloMedico = checkRole("medico");
router.get("/", prestadorControl.mostrarOpPrestador); //Seccion de opciones
router.get("/medicos", soloMedico, prestadorControl.seccionDeMedicos);
router.get("/listaPrestador", prestadorControl.vistaPrestadores);//Buscamos a los prestadores
router.get("/insertar", prestadorControl.formularioNuevoPrestador);//Deriva a formulario
router.post("/insertar", prestadorControl.insertarPrestador);//Capturamos y mandamos los datos a la bd
router.get("/editar/:id",prestadorControl.formularioEditarPrestador);
router.post("/:id", prestadorControl.actualizarPrestador);

module.exports = router;