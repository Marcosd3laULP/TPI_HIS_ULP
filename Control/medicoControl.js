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


//VISTAS:
exports.mostrarOpPrestador = function(req, res){
    res.render("prestadores");
};

exports.seccionDeMedicos = function(req, res){
    res.render("medicos/seccionMedicos");
};

exports.vistaPrestadores = async function (req, res) {
    try {
        const medicos = await buscarTodosPrestadores();
        res.render("listaPrestador", { medicos });
    } catch (error) {
         console.error("Error al buscar los internados con plan:", error.message);
        res.status(500).send("Error al cargar la vista de lista de internados.");
    }
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

exports.vistaSolicitudPedido = async function (req, res) {
    res.render("medicos/nuevoPedido");
}

/*exports.NuevoInforme = async function(req, res){
    try {
        const id = req.params.id;
        const paciente = await Paciente.findByPk(id);
        if(!paciente){
            res.status(404).send("No se hallo al paciente");
        }

        res.render("medicos/informes", { paciente });
    } catch (error) {
        console.log("Ocurrio al buscar al paciente y fue este " + error.message);
         throw new Error("Ocurrio un fallo en traer al paciente..." + error.message);
    }     
};

exports.guardarInforme = async (req, res) => {
  try {
    const idPaciente = req.params.id;
    const { Diagnostico, Descripcion } = req.body;
    console.log('req.body:', req.body);

    // Buscar en Atenciones el prestador asociado al paciente
    const atencion = await Atenciones.findOne({
      where: { ID_paciente: idPaciente }
    });

    if (!atencion) {
      return res.status(404).send('No se encontró prestador para este paciente.');
    }

    const idPrestador = atencion.ID_Profesional;

    // Crear informe con ID de paciente y prestador
    await Informe.create({
      ID_paciente: idPaciente,
      ID_Profesional: idPrestador,
        Diagnostico,
        Descripcion
    });

    res.redirect('/prestador/medicos/pacientes');

  } catch (error) {
    console.error('Error al guardar el informe:', error);
    res.status(500).send('Error en el servidor');
  }
};*/

//METODOS POST

exports.guardarEvaluacionMedica = async function (req, res) {
    try {
        console.log("BODY:", req.body);

        await registrarAntecedente(req.body);
        
        await registrarMedicinaMedica(req.body);

        await registrarEvaluacionMedica(req.body);

        res.redirect(`/medicos/nuevoPedido`);
//${req.body.ID_internacion}/${req.body.ID_Profesional}
    }catch (error){
        console.error("Error al guardar la evaluacion medica: ", error.message);
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

exports.PacientesConTurno = async function(req, res) {
  try {
    const pacientes = await Paciente.findAll({
      include: {
        model: Atenciones,
        as: 'Atenciones',
        required: true, // Solo los que tienen al menos una atención
      },
      attributes: ['ID_paciente', 'Nombre', 'Apellido', 'DNI']
    });
    res.render("medicos/pacienteTurnos", { pacientes });

  } catch (error) {
    console.error("Error al buscar pacientes con atenciones:", error);
    res.status(500).send("Error interno del servidor");
  }
};

//LOGICAS:

async function buscarTodosMedicos() {
    medicos = await Prestador.findAll({
        where: {Rol: "medico"}
    });

    return medicos;
}

async function buscarInternadosConPlan() {
    
        const internoYPlan = await EvaluacionEf.findAll({
            include: [{model: Internacion, as: "Internacion", where: {Activo: true},
            include: [{model: Paciente, as: "Paciente"}]
        }]
        });
    return internoYPlan;
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
        Origen: "Recetado durante internacion",
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

    return {nuevaEvaMedica};

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