const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require('../Modelo/relaciones/asociaciones');
const { Internacion } = require("../Modelo/relaciones/asociaciones");

exports.mostrarOpEnfermero = async function (req, res) {
    res.render("enfermeria/seccionEnf");
};