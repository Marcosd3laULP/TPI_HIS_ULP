const express = require('express');
const router = express.Router();
const internacionControl = require('../Control/internacionControl');
const internacionUtilsControl = require('../Control/internacionUtilsControl');

router.get('/habitaciones/:idAla', internacionControl.buscarHabitacionPorAla);

router.get('/camas/habitacion/:idhab', internacionControl.buscarCamaPorHabitacion);

router.get('/verificar-sexo/:idCama/:sexoPaciente',internacionUtilsControl.verificarSexo);

module.exports = router;
