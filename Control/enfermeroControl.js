const { where } = require("sequelize");
const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require('../Modelo/relaciones/asociaciones');
const { Internacion } = require("../Modelo/relaciones/asociaciones");

exports.mostrarOpEnfermero = async function (req, res) {
    res.render("enfermeria/seccionEnf");
};


exports.buscarTodoEnfermero = async function (req, res) {
    try {
        const enfermero =  await Prestador.findAll({where:{ Rol: 'Enfermero'}}) 
        res.render("enfermeria/listaInternosEval", { enfermeros: enfermero})
    } catch (error) {
        console.error("Error al buscar enfermeros:", error.message);
        res.status(500).send("Error al cargar la vista de evaluación.");
    }
}