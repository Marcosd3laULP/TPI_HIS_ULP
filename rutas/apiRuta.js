const express = require('express');
const router = express.Router();
const internacionControl = require('../Control/internacionControl');
const internacionUtilsControl = require('../Control/internacionUtilsControl');
console.log("internacionControlUtils:", internacionUtilsControl);
// Ruta para obtener habitaciones por ala
router.get('/habitaciones/:idAla', internacionControl.buscarHabitacionPorAla);

// Ruta para obtener camas por habitación
router.get('/camas/habitacion/:idhab', internacionControl.buscarCamaPorHabitacion);

router.get('/verificar-sexo/:idCama/:sexoPaciente',internacionUtilsControl.verificarSexo);

module.exports = router;
