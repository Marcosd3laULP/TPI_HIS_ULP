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
            const pacientes = await Paciente.findAll({
            include: [{
                model: Internacion, 
                as: 'Internaciones',
                where: {Activo: true} }]
        });
        res.render("enfermeria/listaInternosEval", { enfermeros: enfermero, pacientes})
    } catch (error) {
        console.error("Error al buscar enfermeros:", error.message);
        res.status(500).send("Error al cargar la vista de evaluación.");
    }
}

exports.faseAntecedentes =async function (req, res) {
try{
    const {idEnfermero, idPaciente} = req.query
    const enfermero = await Prestador.findByPk(idEnfermero);
    const paciente = await Paciente.findByPk(idPaciente);
 
    res.render("enfermeria/evaAntecedentes", {enfermero, paciente});
}catch(error){
    console.error("Error al cargar la pagina con el enfermero y paciente:", error.message)
    res.status(500).send("Error ocurrido :(")
     }
}