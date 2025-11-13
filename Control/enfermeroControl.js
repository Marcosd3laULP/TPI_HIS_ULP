const { where } = require("sequelize");
const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require('../Modelo/relaciones/asociaciones');
const { Internacion } = require("../Modelo/relaciones/asociaciones");
const { Antecedente } = require("../Modelo/relaciones/asociaciones"); // as "Antecedentes"
const { Medicina } = require("../Modelo/relaciones/asociaciones"); //as "Medicinas"
const { ObservacionF } = require ("../Modelo/relaciones/asociaciones");
//VISTAS:

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

exports.vistaAntecedentes =async function (req, res) {
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

exports.vistaObservacion =async function (req, res) {
    try {
        const {idEnfermero, idPaciente} = req.query;
        
        const enfermero = await Prestador.findByPk(idEnfermero);
        const paciente = await Paciente.findByPk(idPaciente);

        const internacion = await Internacion.findOne({
            where: {ID_Paciente: idPaciente, Activo: true}
        });

        if(!internacion){
            return res.status(404).send("Este paciente no tiene internacion");

        }

        res.render("enfermeria/evaObservacion", {
            enfermero,
            paciente,
            internacion
        });
    } catch (error) {
        console.error("Error al cargar la vista de observacion: ", error.message);
        res.status(500).send("No se pudo cargar la vista");
    }
    
};

//METODOS POSTS
exports.guardarAntecedenteYMedicina = async function (req, res) {
    try {
        await registrarAntecedente(req.body);
        
        await registrarMedicina(req.body);

        res.redirect(`enfermeria/evaObservacion`);

    }catch (error){
        console.error("Error al guardar el antecedente y medicacion: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.guardarObservacion = async function (req, res){
    try {
        await registrarObservacion(req.body);

        res.redirect(`enfermero/etc`)
    } catch (error) {
        console.error("Error al registrar observacion: ", error.messaege);
        res.status(500).send("No se pudo registrar la observacion.");
    }
};

//LOGICAS:

async function registrarAntecedente(datos) {
    const {ID_Paciente, Enfermedad, Tipo, Observaciones } = datos;
    
    const nuevoAntecedente = await Antecedente.create({
        ID_Paciente,
        Enfermedad,
        Tipo,
        Observaciones
    });

    return {nuevoAntecedente};
}

async function registrarMedicina(datos) {
    const {ID_Paciente, Medicina: nombreMed, Origen } = datos;

    const nuevaMedicina = await Medicina.create({
        ID_Paciente,
        Medicina: nombreMed,
        Origen
    });
    return { nuevaMedicina };
}

async function registrarObservacion(datos) {
    const {ID_Paciente, Presion_arterial, Frecuencia_cardiaca, Temperatura, Frecuencia_respiratoria} = datos;

    const internacion = await Internacion.findOne({
        where: {
            ID_Paciente,
            Activo: true
        }
    });

    if(!internacion){
        throw new Error("El paciente no tiene internación activa.");

    }

    const nuevaObservacion = await ObservacionF.create({
        ID_internacion: internacion.ID_internacion,
        fecha: new Date(),
        Presion_arterial,
        Frecuencia_cardiaca,
        Temperatura,
        Frecuencia_respiratoria
    });

    return nuevaObservacion;
}