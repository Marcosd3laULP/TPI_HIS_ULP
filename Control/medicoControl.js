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
const Cama = require("../Modelo/camasModelo");
const internacionUtils = require("../Control/internacionUtilsControl");
const AltaHospitalaria  = require("../Modelo/altaModelo");

//VISTAS:
exports.mostrarOpPrestador = function(req, res){
    res.render("prestadores");
};

exports.detallePedido = async (req, res) => {
  try {
    const { idPedido } = req.params;

    if (!idPedido) {
      return res.status(400).send("Falta el parámetro idPedido.");
    }

    const pedido = await PedidoMed.findOne({
      where: { IdPedido: idPedido },
      include: [
        {
          model: ResultadoEst,
          as: "Resultado",
          required: false // LEFT JOIN → permite que no exista resultado
        }
      ]
    });

    if (!pedido) {
      return res.status(404).send("Pedido no encontrado.");
    }

    res.render("medicos/detallePedido", { pedido });

  } catch (error) {
    console.error("Error al obtener detalle del pedido:", error.message);
    res.status(500).send("No se pudo obtener el detalle del pedido.");
  }
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
        const pedidos = await buscarTodosPedidos();
        res.render("medicos/listaPedidos", { pedidos });
    } catch (error) {
        console.error("Error al cargar la vista para ver los pedidos:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaRealizacionDeUnPedido = async function (req, res) {
    try {
        const { IdPedido } = req.query;
        const pedido = await buscarPedidoPorID(IdPedido);
        const eva = await buscarEvaluacionPorID(pedido.IDMedEva);
        const tipoEstudio = await buscarTipoEstudioPorID(pedido.ID_tipoEstudio);
        const Profesional = await buscarPrestadorId(pedido.ID_Profesional); 
        res.render("medicos/realizarPedido", {pedido, tipoEstudio, Profesional, eva});
    } catch (error) {
        console.error("Error al cargar la vista para realizar un pedido:", error.message);
        res.status(500).send("Error interno del servidor.");
    }
}

exports.vistaNuevoTratamiento = async function (req, res) {
    try {
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

exports.vistaFormularioAlta = async (req, res) => {
    try {
        const idInternacion = req.query.idInterno;

        if (!idInternacion) {
            return res.status(400).send("Falta el ID de internación en la query.");
        }
        
        const internacion = await Internacion.findByPk(idInternacion, {
            include: [
                { model: Paciente, as: "Paciente" },
                { model: Cama, as: "Cama" }
            ]
        });
        const medicos = await Prestador.findAll({ where: { Rol: "Medico" } });
        if (!internacion) {
            return res.status(404).send("Internación no encontrada.");
        }
//csrfToken: req.csrfToken()
        res.render("medicos/alta", {
            internacion,
            medicos,
            paciente: internacion.Paciente,
            cama: internacion.Cama,
            
        });

    } catch (error) {
        console.error("Error al mostrar el alta:", error);
        res.status(500).send("Error interno.");
    }
};

exports.listarAltas = async (req, res) => {
  try {
    const altas = await AltaHospitalaria.findAll({
      include: [
        {
          model: Internacion,
          as: "Internacion",
          include: [
            { model: Paciente, as: "Paciente" }
          ]
        },
        { model: Prestador, as: "Profesional" }
      ],
      order: [["Fecha_alta", "DESC"]]
    });

    res.render("medicos/listaAltas", { altas });

  } catch (error) {
    console.error("Error al listar altas:", error.message);
    res.status(500).send("No se pudo obtener la lista de altas.");
  }
};

exports.detalleAlta = async (req, res) => {
  try {
    const { idAlta } = req.query;

    if (!idAlta) {
      return res.status(400).send("Falta el parámetro idAlta.");
    }

    const alta = await AltaHospitalaria.findOne({
      where: { ID_alta: idAlta },
      include: [
        {
          model: Internacion,
          as: "Internacion",
          include: [
            { model: Paciente, as: "Paciente" }
          ]
        },
        { model: Prestador, as: "Profesional" }
      ],
    });

    if (!alta) {
      return res.status(404).send("Alta hospitalaria no encontrada.");
    }

    res.render("medicos/altaDetalle", { alta });

  } catch (error) {
    console.error("Error al obtener detalle de alta:", error.message);
    res.status(500).send("No se pudo obtener el detalle del alta.");
  }
};




//METODOS POST

exports.guardarAlta = async (req, res) => {
    try {
        const idInternacion = req.query.idInterno;

        if (!idInternacion) {
            return res.status(400).send("Falta el ID de internación en la query.");
        }

        const { Fecha_alta, Motivo, Observaciones, ID_Profesional, Estado_final } = req.body;

        const internacion = await Internacion.findByPk(idInternacion);

        if (!internacion) {
            return res.status(404).send("Internación no encontrada.");
        }

        // Registrar el alta
        await AltaHospitalaria.create({
            ID_internacion: idInternacion,
            Fecha_alta,
            Motivo,
            Observaciones,
            ID_Profesional,
            Estado_final
        });

        // Cambiar estado de internación
        internacion.Activo = false;
        await internacion.save();

        // Liberar cama
        await internacionUtils.liberarCama(internacion.ID_cama);

        // Redirigir al listado
        res.redirect("/medicos/listaAltas");

    } catch (error) {
        console.error("Error guardando el alta:", error);
        res.status(500).send("Error al guardar el alta.");
    }
};


exports.guardarEvaluacionMedica = async function (req, res) {
    try {

        await registrarAntecedente(req.body);

        await registrarEvaluacionMedica(req.body);
        //console.log("DEBUG nuevaEvalMedica:", nuevaEvalMedica);
        res.redirect(`/medicos/gestionInternos`);
    }catch (error){
        console.error("Error al guardar la evaluacion medica: ", error.message);
        res.status(500).send("Error al registrar la evaluación del paciente");
    }
}

exports.guardarTratamiento = async function (req, res) {
    try {
        //console.log("BODY:", req.body);
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

exports.guardarResultado = async function (req, res) {
    try {
        await registrarResultadoPedido(req.body);
        res.redirect("/medicos/listaPedidos");
    } catch (error) {
        console.error("Error al guardar el resultado del pedido: ", error.message);
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
        //console.log("buscando a prestador con id " + id);
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

async function obtenerPrestadorMedicoPorId(idMedico){
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
    pedidos = await PedidoMed.findAll({
        include: [{model: Prestador, as: "Profesional"},
            {model: Estudio, as: "TipoEstudio"}]
    });

    return pedidos
}

async function buscarEvaluacionPorID(idEva) {
    return await EvaluacionMed.findOne({
        where: { IDMedEva: idEva }
    });
}

async function buscarPedidoPorID(IdPedido) {
    pedido = await PedidoMed.findOne({
        where: {IdPedido}
    });
    return pedido;
}

async function buscarTipoEstudioPorID(ID_tipoEstudio) {
    tipoEstudio = await Estudio.findOne({
        where: {ID_tipoEstudio}
    });
    return tipoEstudio;
}

async function buscarTodosTipoEstudio() {
    tiposEstudios = await Estudio.findAll();
    return tiposEstudios;
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
         where: [{ID_internacion: idInterno}],
         include: [{model: Proceso, as: "TipoProceso"}]
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

async function obtenerIdPacienteDesdeInternacion(idInternacion) {
    const internacion = await Internacion.findOne({
        where: { ID_Internacion: idInternacion },
        attributes: ["ID_paciente"]
    });

    if (!internacion) {
        throw new Error("No se encontró la internación");
    }

    return internacion.ID_paciente;
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
    
    console.log("DEBUG: datos que llegan:", datos);
    console.log("DEBUG: ID_internacion:", ID_internacion);

    const ID_Paciente = await obtenerIdPacienteDesdeInternacion(ID_internacion);

    console.log("DEBUG: ID_Paciente calculado:", ID_Paciente);


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
    const {ID_internacion, ID_Profesional, Diagnostico, Indicaciones, Descripcion} = datos;

    const nuevaEvaMedica = await EvaluacionMed.create({
        ID_internacion,
        ID_Profesional,
        Fecha: new Date(),
        Diagnostico,
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

async function registrarResultadoPedido(datos) {
    const {InformeTextual, IdPedido} = datos;

    const resultado = await ResultadoEst.create({
        IdPedido,
        InformeTextual,
        Fecha: new Date()
    });
    await PedidoMed.update({Estado: "Realizado"},{where: {IdPedido} });
    return resultado;
}