const express = require('express');
const router = express.Router();
const internacionControl = require('../Control/internacionControl');

// Ruta para obtener habitaciones por ala
router.get('/habitaciones/:idAla', internacionControl.buscarHabitacionPorAla);

// Ruta para obtener camas por habitación
router.get('/camas/habitacion/:idhab', internacionControl.buscarCamaPorHabitacion);

module.exports = router;
