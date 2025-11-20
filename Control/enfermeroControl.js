const { where, Model } = require("sequelize");
const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require('../Modelo/relaciones/asociaciones');
const { Internacion } = require("../Modelo/relaciones/asociaciones");
const { Antecedente } = require("../Modelo/relaciones/asociaciones"); // as "Antecedentes"
const { Medicina } = require("../Modelo/relaciones/asociaciones"); //as "Medicinas"
const { ObservacionF } = require ("../Modelo/relaciones/asociaciones");
const { EvaluacionEf } = require("../Modelo/relaciones/asociaciones");
//VISTAS:

exports.mostrarOpEnfermero = async function (req, res) {
    res.render("enfermeria/seccionEnf");
};

exports.vistaInternosLista = async function (req, res) {
    try {
        const internados = await buscarInternadosConPlan();

        res.render("enfermeria/InternosCuidados", {internados});
    } catch (error) {
        console.error("Error al buscar los internados con plan:", error.message);
        res.status(500).send("Error al cargar la vista de lista de internados.");
    }
    
}

exports.vistaCuidados = async function (req, res) {
    try {
        const id = req.params.id;

        const internado = await buscarInternadoConPlan(id);
        const evaluacion = await buscarPlanesDeCuidados(id);

        res.render("enfermeria/vistaCuidados", {paciente: internado.Paciente, evaluaciones: evaluacion});
    } catch (error) {
          console.error("Error al buscar los planes del internado:", error.message);
        res.status(500).send("Error al cargar la vista de lista de planes.");
    }
}


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
        const idPaciente = req.params.ID_Paciente;
        const idEnfermero = req.params.ID_Profesional;
        
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

exports.vistaCuidadoPreliminar = async function (req, res) {
    try {
        const idPaciente = req.params.ID_Paciente;
        const idEnfermero = req.params.ID_Profesional;
        
        const enfermero = await Prestador.findByPk(idEnfermero);
        const paciente = await Paciente.findByPk(idPaciente);

        const internacion = await Internacion.findOne({
            where: {ID_Paciente: idPaciente, Activo: true}
        });

        if(!internacion){
            return res.status(404).send("Este paciente no tiene internacion");

        }

        res.render("enfermeria/cuidadoPreliminar", {
            enfermero,
            paciente,
            internacion
        });
        
    } catch (error) {
        console.error("Error al cargar la vista de cuidados preliminares: ", error.message);
        res.status(500).send("No se pudo cargar la vista");
    }
}

//METODOS POSTS
exports.guardarAntecedenteYMedicina = async function (req, res) {
    try {
        await registrarAntecedente(req.body);
        
        await registrarMedicina(req.body);

        res.redirect(`/enfermeria/evaObservacion/${req.body.ID_Paciente}/${req.body.ID_Profesional}`);

    }catch (error){
        console.error("Error al guardar el antecedente y medicacion: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.guardarObservacion = async function (req, res){
    try {
        await registrarObservacion(req.body);

        res.redirect(`/enfermeria/cuidadoPreliminar/${req.body.ID_Paciente}/${req.body.ID_Profesional}`);
    } catch (error) {
        console.error("Error al registrar observacion: ", error.message);
        res.status(500).send("No se pudo registrar la observacion.");
    }
};

exports.guardarPlanPreliminar = async function(req, res) {
    try {
        await registrarCuidadoPreliminar(req.body);
        res.redirect("/prestador/enfermeros");
    } catch (error) {
        console.error("Error al registrar el plan de cuidados: ", error.message);
        res.status(500).send("No se pudo registrar el plan de cuidados.");
    }
}

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
        Fecha: new Date(),
        Presion_arterial,
        Frecuencia_cardiaca,
        Temperatura,
        Frecuencia_respiratoria
    });

    return nuevaObservacion;
}

async function registrarCuidadoPreliminar(datos) {
    const {ID_Paciente, ID_Profesional, Necesidades_basicas, Acciones_inm, Medicacion_Inicial, Observaciones} = datos;

     const internacion = await Internacion.findOne({
        where: {
            ID_Paciente,
            Activo: true
        }
    });

    if(!internacion){
        throw new Error("El paciente no tiene internación activa.");

    }

    const nuevoPlan = await EvaluacionEf.create({
        ID_internacion: internacion.ID_internacion,
        Fecha: new Date(),
        Necesidades_basicas,
        Acciones_inm,
        Medicacion_Inicial,
        Observaciones,
        ID_Profesional
    });
    
}

async function buscarInternadosConPlan() {
    
        const internoYPlan = await EvaluacionEf.findAll({
            include: [{model: Internacion, as: "Internacion", where: {Activo: true},
            include: [{model: Paciente, as: "Paciente"}]
        }]
        });
    return internoYPlan;
}

async function buscarInternadoConPlan(idInternacion) {
    return await Internacion.findOne({ where: {ID_internacion: idInternacion, Activo: true},
        include:[{model: Paciente, as: "Paciente"}]
    });
}


async function buscarPlanesDeCuidados(idInternacion) {
    return await EvaluacionEf.findAll({
        where: {ID_internacion: idInternacion},
        include: [{model: Prestador, as: "Profesional"},
                  {model: Internacion, as: "Internacion"}]
    });
}