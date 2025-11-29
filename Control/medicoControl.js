const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require('../Modelo/relaciones/asociaciones');
const { Informe } = require("../Modelo/relaciones/asociaciones");
const { EvaluacionEf } = require("../Modelo/relaciones/asociaciones");
const { Antecedente } = require("../Modelo/relaciones/asociaciones"); // as "Antecedentes"
const { Medicina } = require("../Modelo/relaciones/asociaciones"); //as "Medicinas"
const { ObservacionF } = require ("../Modelo/relaciones/asociaciones");
const { Internacion } = require ("../Modelo/relaciones/asociaciones");
const { EvaluacionMed } = require("../Modelo/relaciones/asociaciones");
const { PedidoMed } = require("../Modelo/relaciones/asociaciones");
const { Estudio } = require ("../Modelo/relaciones/asociaciones");
const { ResultadoEst } = require("../Modelo/relaciones/asociaciones");
const Proceso = require("../Modelo/tipoProcesoModelo");
const TraYTer = require("../Modelo/TraYTerModelo");


//VISTAS:
exports.mostrarOpPrestador = function(req, res){
    res.render("prestadores");
};

exports.vistaPrestadores = async function (req, res) {
    try {
        const medicos = await buscarTodosPrestadores();
        res.render("listaPrestador", { medicos });
    } catch (error) {
         console.error("Error al buscar a todos los prestadores:", error.message);
        res.status(500).send("Error al cargar la vista de lista de prestadores.");
    }
};

exports.seccionDeMedicos = function(req, res){
    res.render("medicos/seccionMedicos");
};


exports.vistaInternos = async function (req, res) {
    try {
        const medicos = await buscarTodosMedicos();
        const internados = await buscarInternadosConPlan();

        res.render("medicos/vistaInternos", {medicos, internados});
    } catch (error) {
        console.error("Error al buscar los internados con plan:", error.message);
        res.status(500).send("Error al cargar la vista de lista de internados.");
    }
    
}

exports.vistaEvaMedica = async function (req, res) {
    try {
        const {idMedico, idInterno} = req.query
    const medico = await Prestador.findByPk(idMedico);
    const interno = await Internacion.findOne({
        where: {ID_internacion: idInterno},
        include: [{model: Paciente, as: "Paciente"}]
    });
 
    res.render("medicos/evaMedica", {medico, interno});
    } catch (error) {
        console.error("Error al cargar la evaluación médica:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaInternadosEnSeccMedico = async function (req, res) {
    try {
        const internados = await buscarInternadosMasDatosPaciente();
        //console.log("INTERNADO EN LA TABLA:", internados);
        res.render("medicos/gestionInternos", { internados });
    } catch (error) {
        console.error("Error al cargar los internados para la seccion de medicos:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaEvaluacionesDeUnPaciente = async function (req, res) {
    try {
        const { idInterno } = req.query;
        const interno = await buscarUnInternadoYSusDatosDePaciente(idInterno);
        const evaluaciones = await buscarTodasEvaMedicasDeUnInterno(idInterno);
        res.render("medicos/gestionEvaluaciones", {interno, evaluaciones});
    } catch (error) {
         console.error("Error al cargar las evaluaciones para la seccion de medicos:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaDePedidosDeUnPaciente = async function (req, res) {
    try {
        const { idInterno, idEva } = req.query;
        const interno = await buscarUnInternadoYSusDatosDePaciente(idInterno);
        const evaluacion = await obtenerEvaluacionMedicaPorId(idEva);

        const pedidos = await buscarPedidosDeUnaEvaluacionPorId(idEva);
        //console.log(JSON.stringify(pedidos, null, 2));
        res.render("medicos/gestionPedidos", {interno, evaluacion, pedidos});
    } catch (error) {
        console.error("Error al cargar los pedidos de estudio de este paciente:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaDeTratamientos = async function(req, res) {
    try {

        const idInterno = req.query.idInterno;

        const IDMedEva = req.query.idEva;

        const interno = await buscarUnInternadoYSusDatosDePaciente(idInterno);
        
        const evaluacion = await buscarTodasEvaMedicasDeUnInterno(idInterno);

        const tratamientos = await buscarTodosTraYTerDeUnInterno(idInterno);

        res.render("medicos/gestionTratamientos", {interno, evaluacion, tratamientos, IDMedEva});
    } catch (error) {
        console.error("Error al cargar los tratamiento asociados a este internado:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaSolicitudPedido = async function (req, res) {
    try {
     const { idEva } = req.query

     const medicos = await buscarTodosMedicos();
     const evaluacion = await obtenerEvaluacionMedicaPorId(idEva);
     const tiposEstudios = await obtenerTipoEstudioParaSelect();
     
     res.render("medicos/nuevoPedido", {medicos, evaluacion, tiposEstudios});   
    } catch (error) {
        console.error("Error al cargar la evaluación médica:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaListadoDePedidos = async function (req, res){
    try {
        res.render("medicos/listaPedidos");
    } catch (error) {
        console.error("Error al cargar la vista para ver los pedidos:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaNuevoTratamiento = async function (req, res) {
    try {
        console.log("BODY:", req.body);
        const { idInterno, idEva } = req.query
        const interno = await buscarUnInternadoYSusDatosDePaciente(idInterno);
        const medicos = await buscarTodosMedicos();
        const evaluacion = await buscarEvaluacionPorID(idEva);
        const tipoProcesos = await buscarTodosProcesos();

        res.render("medicos/nuevoTratamiento", {interno, medicos, evaluacion, tipoProcesos, idEva, idInterno});
    } catch (error) {
        console.error("Error al cargar la vista del formulario nuevo tratamiento", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

//METODOS POST

exports.guardarEvaluacionMedica = async function (req, res) {
    try {

        await registrarAntecedente(req.body);
        
        await registrarMedicinaMedica(req.body);

        await registrarEvaluacionMedica(req.body);
        //console.log("DEBUG nuevaEvalMedica:", nuevaEvalMedica);
        res.redirect(`/medicos/seccionInternos`);
    }catch (error){
        console.error("Error al guardar la evaluacion medica: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.guardarTratamiento = async function (req, res) {
    try {
        console.log("BODY:", req.body);
        await registrarTratamientoOTerapia(req.body);
        res.redirect("/medicos/gestionInternos");
    } catch (error) {
        console.error("Error al guardar el tratamiento o terapia: ", error.message);
        res.status(500).send("Error al registrar el tratamiento o terapia del paciente");
    }
}

exports.guardarPedido = async function (req, res) {
    try {
        await registrarNuevoPedido(req.body);
        res.redirect("/medicos/listaPedidos");
    } catch (error) {
        console.error("Error al guardar el nuevo pedido: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.formularioNuevoPrestador = function(req, res){
    res.render("nuevoPrestador");
}

exports.formularioEditarPrestador = async function (req, res) {
    try {
        const id = req.params.id
        const profesional = await buscarPrestadorId(id);
        if(!profesional){
            throw new Error("No se pudo hallar al prestador");
            
        }

        res.render("editarPrestador", { profesional }); 
    } catch (error) {
        console.log("Ocurrio un error al buscar el prestador " + error.message);
         throw new Error("Ocurrio un fallo en traer al prestador..." + error.message);
    } 
}


async function buscarPrestadorId (id) { //exports no puede ir aca ANOTA EL PORQUE
    try {
        const prestador = await Prestador.findByPk(id);
        console.log("buscando a prestador con id " + id);
        if(!prestador){
            throw new Error("No se pudo hallar el prestador...");    
        }
        return prestador.toJSON();
    } catch (error) {
        console.log("No se pudo hallar el prestador por: " + error.message);
        throw new Error("Hubo un fallo en buscar al prestador...");
    }
}

exports.insertarPrestador = async function (req, res) {
    try {
        const datos = req.body;

        if(!datos.Nombre || datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

         if(!datos.Apellido || datos.Apellido.trim() === ""){
            throw new Error("Apellido no valido");
        }
         
        if(!datos.Rol|| datos.Rol.trim() === ""){
            throw new Error("Debe definir un rol");
        }

         if(datos.Rol === "Enfermero"){
            if(!datos.Especialidad || !datos.Especialidad.trim() === ""){
                datos.Especialidad = "Ninguna"
            }         
        }else if(datos.Rol === "Medico"){
            if(!datos.Especialidad || datos.Especialidad.trim() === ""){
            throw new Error("Debe definir una especialidad");
        }
        }

        await Prestador.create(datos);
        res.redirect("listaPrestador");
    } catch (error) {
        console.log("No se pudo insertar el nuevo prestador... " + error.message);
        res.render("nuevoPrestador", { //ANOTA EL PORQUE DE ESTO
            error: error.message, //COMO TRABAJA CON EL IF DE LA VISTA
            datos: req.body //ESTO LO QUE HACE ES MANTENER LOS DATOS Y EVITAMOS VOLVERLOS A ESCRIBIR
        });
    }
    
}

exports.actualizarPrestador = async function (req, res) {
        const id = req.params.id;
        const datos = req.body;

    try {
        
        if(!datos.Nombre || datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

         if(!datos.Apellido || datos.Apellido.trim() === ""){
            throw new Error("Apellido no valido");
        }
         
        if(!datos.Rol|| datos.Rol.trim() === ""){
            throw new Error("Debe definir un rol");
        }

        if(datos.Rol === "Enfermero"){
            if(!datos.Especialidad || !datos.Especialidad.trim() === ""){
                datos.Especialidad = "Ninguna"
            }         
        }else if(datos.Rol === "Medico"){
            if(!datos.Especialidad || datos.Especialidad.trim() === ""){
            throw new Error("Debe definir una especialidad");
        }
        }
        
        const [prestadorEditado] = await Prestador.update(datos, {
            where: {ID_Profesional: id}
        });

        if(prestadorEditado === 0){
            console.log("No se registraron cambios");
            
        }

        res.redirect("/prestador/listaPrestador"); //Aqui antes era "prestador/listaPrestador"
    } catch (error) {
        console.log ("Ocurrio un error y fue este: " + error.message);
        const prestador = await Prestador.findByPk(id)
         res.render("editarPrestador", { 
            error: error.message, 
            datos: req.body, 
            profesional: prestador
        });
        
    }
};

//LOGICAS:

async function buscarTodosMedicos() {
    medicos = await Prestador.findAll({
        where: {Rol: "medico"}
    });

    return medicos;
}

async function buscarTodosPrestadores() {
    medicos = await Prestador.findAll();

    return medicos;
}

async function obtenerPrestadorPorId(idMedico){
    const prestador = await Prestador.findOne({
        where: {ID_Profesional: idMedico}
    });

    return prestador;
}

async function buscarTodosProcesos() {
    procesos = await Proceso.findAll();

    return procesos;
}

async function buscarTodosPedidos() {
    pedidos = await PedidoMed.findAll();

    return pedidos
}

async function buscarEvaluacionPorID(idEva) {
    return await EvaluacionMed.findOne({
        where: { IDMedEva: idEva }
    });
}

//Incluye también buscar los datos del prestador, pero se hacia larguisimo el nombre xd
async function buscarPedidosDeUnaEvaluacionPorId(idEva) {
    return await PedidoMed.findAll({
        where: { IDMedEva: idEva },
        include: [
            { model: Prestador, as: "Profesional" },
            { model: Estudio, as: "TipoEstudio" }
        ]
    });
}


async function buscarTodasEvaMedicasDeUnInterno(idInterno) {
    EvaMedicaInterno = await EvaluacionMed.findAll({
        where: [{ID_internacion: idInterno}]
    });
    return EvaMedicaInterno;
}


async function buscarTodosTraYTerDeUnInterno(idInterno) {
    TratamientosYTerapiasInterno = await TraYTer.findAll({
         where: [{ID_internacion: idInterno}]
    });

    return TratamientosYTerapiasInterno;
}

async function buscarInternadosMasDatosPaciente() {
    
        const internados = await Internacion.findAll({
            where: {Activo: true}, include: [{model: Paciente, as: "Paciente"}]
        });
    return internados;
}

async function buscarUnInternadoYSusDatosDePaciente(idInterno) {
    
    const interno = await Internacion.findOne({
        where: {ID_internacion: idInterno},
        include: [{model: Paciente, as: "Paciente"}]
    });
    return interno;
}

async function buscarInternadosConPlan() {
    
        const internoYPlan = await EvaluacionEf.findAll({
            include: [{model: Internacion, as: "Internacion", where: {Activo: true},
            include: [{model: Paciente, as: "Paciente"}]
        }]
        });
    return internoYPlan;
}

async function obtenerIdPacienteDesdeInternacion(idInternacion) {
    const internacion = await Internacion.findOne({
        where: { ID_Internacion: idInternacion },
        attributes: ["ID_Paciente"]
    });

    if (!internacion) {
        throw new Error("No se encontró la internación");
    }

    return internacion.ID_Paciente;
}

async function obtenerTipoEstudioParaSelect() {
    const tiposEstudios = await Estudio.findAll();

    return tiposEstudios;
}

async function obtenerEvaluacionMedicaPorId(idEva) {
    const evaluacionMedica = await EvaluacionMed.findOne({
       where: {IDMedEva: idEva} 
    });

    return evaluacionMedica;
}

async function registrarAntecedente(datos) {
    const {ID_internacion, Enfermedad, Tipo, Observaciones } = datos;
    
    const ID_Paciente = await obtenerIdPacienteDesdeInternacion(ID_internacion);

    const nuevoAntecedente = await Antecedente.create({
        ID_Paciente,
        Enfermedad,
        Tipo,
        Observaciones
    });

    return {nuevoAntecedente};
}

async function registrarMedicinaMedica(datos) {
    const {ID_internacion, Medicina: nombreMed, Origen } = datos;

    const ID_Paciente = await obtenerIdPacienteDesdeInternacion(ID_internacion);

    const nuevaMedicina = await Medicina.create({
        ID_Paciente,
        Medicina: nombreMed,
        Origen: "Tratamiento",
        Estado: true
    });
    return { nuevaMedicina };
}


async function registrarEvaluacionMedica(datos) {
    const {ID_internacion, ID_Profesional, Diag_teorico, Diag_real, Indicaciones, Descripcion} = datos;

    const nuevaEvaMedica = await EvaluacionMed.create({
        ID_internacion,
        ID_Profesional,
        Fecha: new Date(),
        Diag_teorico,
        Diag_real,
        Indicaciones,
        Descripcion
    });

    return nuevaEvaMedica;

}

async function registrarTratamientoOTerapia(datos) {
    const {ID_internacion, ID_Profesional, IDMedEva, IdTipoProceso, Tipo, FechaInicio, FechaFin, Observaciones} = datos;

    const nuevoTratamientoOTerapia = await TraYTer.create({
        ID_internacion,
        ID_Profesional,
        IDMedEva,
        IdTipoProceso,
        Tipo,
        FechaInicio,
        FechaFin,
        Observaciones,
        Estado: "Activo"
    });
    return nuevoTratamientoOTerapia;
}

async function registrarNuevoPedido(datos) {
    const {ID_Profesional, IDMedEva, ID_tipoEstudio, Prioridad, Indicaciones} = datos;

    const nuevoPedido = await PedidoMed.create({
        ID_Profesional,
        IDMedEva,
        ID_tipoEstudio,
        Fecha: new Date(),
        Prioridad,
        Indicaciones,
        Estado: "Pendiente"
    });
    return nuevoPedido;
}