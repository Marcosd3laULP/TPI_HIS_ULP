const express = require("express");
const router = express.Router();
const prestadorControl = require("../Control/medicoControl");
const enfermeroControl = require("../Control/enfermeroControl");

router.get("/", prestadorControl.mostrarOpPrestador); //Seccion de opciones
router.get("/medicos", prestadorControl.seccionDeMedicos);
router.get("/enfermeros", enfermeroControl.mostrarOpEnfermero);
//router.get("/listaPrestador", prestadorControl.listaDePrestadores); //listamos a los prestadores
//ANOTATE ESTE ERROR EH, ES UN DETALLE MUY FACIL DE PASARLO DESAPERCIBIDO
router.get("/listaPrestador", prestadorControl.buscarTodoPrestador);//Buscamos a los prestadores
router.get("/insertar", prestadorControl.formularioNuevoPrestador);//Deriva a formulario
router.post("/insertar", prestadorControl.insertarPrestador);//Capturamos y mandamos los datos a la bd
router.get("/editar/:id",prestadorControl.formularioEditarPrestador);
router.post("/:id", prestadorControl.actualizarPrestador);

module.exports = router;