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

        const interno = await buscarInternadoConPlan(id);
        const evaluacion = await buscarPlanesDeCuidados(id);

        res.render("enfermeria/vistaCuidados", {interno, paciente: interno.Paciente, evaluaciones: evaluacion});
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


exports.vistaObservacion = async function (req, res) {
  try {
    const { ID_internacion, profesionalOmodo} = req.params;
    const next = req.query.next || "";
    // Buscamos internación + datos del paciente
    const internacion = await buscarUnInternadoYSusDatosDePaciente(ID_internacion);

    if (!internacion) {
      return res.status(404).send("Internación no encontrada.");
    }

    const paciente = internacion.Paciente; // Asumiendo que el include lo nombra así

    const modoIndividual = profesionalOmodo === "individual";

    let enfermero = null;
    let enfermeros = null;

    if (modoIndividual) {
      enfermeros = await Prestador.findAll({
        where: { Rol: "Enfermero" }
      });
    } else {
      // profesionalOmodo = ID del profesional
      enfermero = await Prestador.findByPk(profesionalOmodo);
    }

    res.render("enfermeria/evaObservacion", {
      internacion,
      paciente,
      enfermero,
      enfermeros,
      modoIndividual,
      next,
      formAction: "/enfermeria/guardarObservacion",
      buttonText: modoIndividual ? "Guardar observación" : "Guardar y continuar"
    });

  } catch (error) {
    console.error("Error:", error);
    res.status(500).send("Error al cargar la vista de observación");
  }
};



/*res.render("enfermeria/evaObservacion", {
            enfermero,
            paciente,
            internacion
        });*/

exports.vistaCuidadoPreliminar = async function (req, res) {
  try {
    // Params: /enfermeria/cuidadoPreliminar/:ID_Paciente/:ID_Profesional?/:modo?
    const { ID_internacion, profesionalOmodo} = req.params;
    const next = req.query.next || "";

    const internacion = await buscarUnInternadoYSusDatosDePaciente(ID_internacion);
    
    if (!internacion) {
      return res.status(404).send("Este paciente no tiene internación activa");
    }

    const paciente = internacion.Paciente;
    
    const modoIndividual = profesionalOmodo === "individual";

    // Enfermero (si viene)
    let enfermero = null;
    let enfermeros = null;

    if (modoIndividual) {
      enfermeros = await Prestador.findAll({
        where: {Rol: "Enfermero "}
      });
    } else{
      // Traemos todos los enfermeros (o filtrado si querés)
      enfermero = await Prestador.findByPk(profesionalOmodo);
    }

    // Render final
    res.render("enfermeria/cuidadoPreliminar", {
      paciente,
      enfermero,
      enfermeros,
      internacion,
      modoIndividual,
      next,
      formAction: "/enfermeria/guardarEvaluacionFinal",
      buttonText: modoIndividual ? "Guardar evaluacion final" : "Guardar y continuar"
    });

  } catch (error) {
    console.error("Error al cargar la vista de cuidados preliminares:", error.message);
    res.status(500).send("No se pudo cargar la vista");
  }
};


exports.vistaDetalleInternado = async function (req, res) {
    try {
        const { idInterno } = req.params;

        // Datos del internado
        const internacion = await Internacion.findByPk(idInterno);
        if (!internacion) return res.status(404).send("Internación no encontrada");

        // Paciente asociado
        const paciente = await Paciente.findByPk(internacion.ID_paciente);

        // Últimos registros
        const observacion = await obtenerUltimaObservacion(idInterno);
        const plan = await obtenerUltimoPlan(idInterno);
        //console.log(plan)
        res.render("enfermeria/PlanCuidados", {
            interno: internacion,
            paciente,
            observacion,
            plan
        });

    } catch (error) {
        console.error("Error al cargar el detalle del internado:", error);
        res.status(500).send("Error al cargar el detalle del internado");
    }
};


//METODOS POSTS
exports.guardarAntecedentes = async function (req, res) {
    try {
        await registrarAntecedente(req.body);
        
        res.redirect(`/enfermeria/evaObservacion/${req.body.ID_Paciente}/${req.body.ID_Profesional}`);

    }catch (error){
        console.error("Error al guardar el antecedente y medicacion: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.guardarObservacion = async function (req, res) {
    try {
        const { ID_internacion, ID_Profesional, next } = req.body;

        await registrarObservacion(req.body);

        //  Si vino desde la vista alternativa
        if (next) {
            //return res.redirect(`/enfermeria/PlanCuidados/${ID_internacion}/${ID_Profesional}`);
            return res.redirect(`${next}/${ID_internacion}`);
        }

        // Si vino desde la vista normal
        return res.redirect(`/enfermeria/cuidadoPreliminar/${ID_internacion}/${ID_Profesional}`);

    } catch (error) {
        console.error("Error al registrar observacion: ", error.message);
        res.status(500).send("No se pudo registrar la observacion.");
    }
};


exports.guardarPlanPreliminar = async function(req, res) {
    try {
        const {ID_internacion, next} = req.body;
        
        await registrarCuidadoPreliminar(req.body);

        if (next) {
            return res.redirect(`${next}/${ID_internacion}`);
        }

        return res.redirect("/enfermeria/seccionEnf");
    } catch (error) {
        console.error("Error al registrar el plan de cuidados: ", error.message);
        res.status(500).send("No se pudo registrar el plan de cuidados.");
    }
}

//LOGICAS:

async function obtenerUltimaObservacion(idInterno) {
    return await ObservacionF.findOne({
        where: { ID_internacion: idInterno },
        include: [{ model: Prestador, as: "Profesional" }],
        order: [["ID", "DESC"]],
    });
}

async function obtenerUltimoPlan(idInterno) {
    
    return await EvaluacionEf.findOne({
        where: { ID_internacion: idInterno },
        include: [{ model: Prestador, as: "Profesional" }],
        order: [["ID_eva", "DESC"]],
    });
}


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
        Origen,
        Estado: true
    });
    return { nuevaMedicina };
}

async function registrarObservacion(datos) {
    const {ID_internacion, ID_Profesional, Presion_arterial, Frecuencia_cardiaca, Temperatura, Frecuencia_respiratoria} = datos;

    const internacion = await Internacion.findOne({
        where: {
            ID_internacion,
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
        Frecuencia_respiratoria,
        ID_Profesional
    });

    return nuevaObservacion;
}

async function registrarCuidadoPreliminar(datos) {
    const {ID_internacion, ID_Profesional, Necesidades_basicas, Acciones_inm, Medicacion_Inicial, Observaciones} = datos;

     const internacion = await Internacion.findOne({
        where: {
            ID_internacion,
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
    return nuevoPlan;
}

async function buscarInternadosConPlan() {
    const internadosConPlan = await Internacion.findAll({
        where: { Activo: true },
        include: [
            {
                model: EvaluacionEf,
                as: "Evaluaciones",   
                required: true  
            },
            {
                model: Paciente,
                as: "Paciente"
            }
        ]
    });

    return internadosConPlan;
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

async function buscarUnInternadoYSusDatosDePaciente(idInterno) {
    
    const interno = await Internacion.findOne({
        where: {ID_internacion: idInterno},
        include: [{model: Paciente, as: "Paciente"}]
    });
    return interno;
}
