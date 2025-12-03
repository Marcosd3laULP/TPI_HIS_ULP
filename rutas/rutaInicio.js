const express = require("express");
const router = express.Router();
const inicioControl = require("../Control/inicioControl");

router.get("/principal",inicioControl.mostrarInicio);
router.get("/",inicioControl.mostrarSectores);
module.exports = router; 