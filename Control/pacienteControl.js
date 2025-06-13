const sequelize = require('../baseDatos/bd');
const {Paciente} = require('../Modelo/relaciones/asociaciones');
const {Internacion} = require('../Modelo/relaciones/asociaciones');
const { Op, fn, col, where: sequelizeWhere } = require('sequelize');

// Renderiza la vista inicial de pacientes
exports.mostrarOpPaciente = function (req, res) { //SI ERA EXPORTS AL FINAL JAJA
    res.render("pacientes");
};

exports.seccionInternados = function (req, res){
    res.render("Internos/internados");
}

exports.listaPacientesInternar = async function (req, res) {
    try{
        const pacientes = await Paciente.findAll({
            include: [{
                model: Internacion,
                as: 'Internaciones',
                required: false, // Incluir pacientes aunque no tengan internaciones
                where: {Activo: true} }],
            where: { '$Internaciones.ID_internacion$': null }
        });
        res.render("Internos/nuevaInternacion", { pacientes });
    }catch(error) {
        console.error("Error al obtener pacientes:", error.message);
        throw new Error("No se pudieron obtener los datos de los pacientes");
    }
}

// Obtener todos los pacientes
exports.obtenerPacientes = async function(req, res) {
    const {criterio, valor} = req.query
    try {
         if (!criterio && !valor) {
      const pacientes = await Paciente.findAll();
      return res.render("listaPaciente", {pacientes});
    }

        if(!criterio || !valor || valor.trim() === ''){
            throw new Error("Seleccione un criterio e ingrese un valor");
        }

        if(criterio === 'dni' || criterio === 'id'){
            if(isNaN(valor)){
                throw new Error(`El campo ${criterio.toUpperCase()} debe ser un número`);
            }
        }
         let where = {};

       if (criterio  === "dni") {
            where.DNI = valor;
        } else if (criterio  === "id") {
            where.ID_paciente = valor;
        } else if (criterio  === "nombre") {
             where = {[Op.and]: [sequelizeWhere(
            fn('LOWER', col('Nombre')),
            { [Op.like]: `%${valor.toLowerCase()}%` }
          )]
      };
    } else {
      throw new Error("Criterio inválido, no se pudo filtrar...");
    }
        const pacientes = await Paciente.findAll( { where } );

        if(pacientes.length === 0){
            throw new Error("No se pudieron traer los pacientes filtrados");
            
        }

        res.render("listaPaciente", { pacientes });
        
    } catch (error) {
        console.error("Error al obtener pacientes:", error.message);
        res.render("listaPaciente", {
        pacientes: [],
        error: error.message
        });
    }
}

exports.formularioAdmision = async function (req, res) {
    res.render("ingresoPaciente");
}

exports.formularioEdicionPaciente = async function (req, res) {
    try {
        const id = req.params.id
        const paciente = await buscarPacientePorId(id);
        if(!paciente){
            throw new Error("No se pudo hallar al paciente");
            
        }

        res.render("editarPaciente", {
            paciente,
            modo: "edicion"
        });
    } catch (error) {
        console.log("Ocurrio un error al buscar al paciente " + error.message);
         throw new Error("Ocurrio un fallo en traer al paciente..." + error.message);
    }
}

exports.formularioConfirmacionPaciente = async function (req, res) {
    try {
        const id = req.params.id
        const paciente = await buscarPacientePorId(id);
        if(!paciente){
            throw new Error("No se pudo hallar al paciente");
            
        }

        res.render("editarPaciente", {
            paciente,
            modo: "confirmacion"
        });
    } catch (error) {
        console.log("Ocurrio un error al buscar al paciente " + error.message);
         throw new Error("Ocurrio un fallo en traer al paciente..." + error.message);
    }
}

// Buscar paciente por ID
async function buscarPacientePorId(id) {
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            throw new Error("Paciente no encontrado");
        }
        return paciente.toJSON();
    } catch (error) {
        console.error("Error al buscar el paciente:", error.message);
        throw new Error("No se pudo hallar el paciente");
    }
}

// Crear (cargar) un nuevo paciente
exports.cargarPaciente = async function(req, res) {
        const datos = req.body 
    try {
        
        if(!datos.Nombre || datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(!datos.Apellido || datos.Apellido.trim() === ""){
            throw new Error("Ingrese un apellido valido");
            
        }

        if(!datos.DNI ||datos.DNI.length < 8 || datos.DNI.trim() === ""){
            throw new Error("Ingrese un DNI valido");
            
        }

        if(!datos.Sexo || datos.Sexo.trim() === ""){
            throw new Error("Ingrese un genero");
            
        }
        if(!datos.Domicilio || datos.Domicilio.trim() === ""){
            throw new Error("Debe ingresar un domicilio");
        
            
        }

        if(!datos.Telefono || datos.Telefono.length < 4 || datos.Telefono.trim() === ""){
            throw new Error("Debe ingresar un telefono valido");
            
        }

        const pacienteYaCargado =  await Paciente.findOne({where: { DNI: datos.DNI } });

        if(pacienteYaCargado){
            throw new Error("Este paciente ya esta cargado");
        }
            const paciente = await Paciente.create(datos);
        
        if(datos.dar_turno){
            res.redirect(`/turnos/${paciente.ID_paciente}/turnosV2`);
        }else{
            res.redirect("lista-pacientes");
        }
        
        
    } catch (error) {
        console.error("Error al cargar paciente:", error.message);
        res.render("ingresoPaciente", {
            error: error.message,
            datos: req.body
        });      
    }
}

// Actualizar un paciente por su ID
exports.actualizarPaciente = async function(req, res) {
         const id = req.params.id;
        const datos = req.body;
    try {
        
        if(datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(datos.Apellido.trim() === ""){
            throw new Error("Ingrese un apellido valido");
            
        }

        if(!datos.Sexo || datos.Sexo.trim() === ""){
            throw new Error("Ingrese un genero");
            
        }
        if(datos.Domicilio.trim() === ""){
            throw new Error("Debe ingresar un domicilio");
            
        }
        if(datos.Telefono.length < 4 || datos.Telefono.trim() === ""){
            throw new Error("Debe ingresar un telefono valido");
            
        }

        const pacienteExistente =  await Paciente.findByPk(id);

        if(!pacienteExistente){
            throw new Error("No se pudo encontrar el paciente");
        }

        const [actualizado] = await Paciente.update(datos, {
            where: { ID_paciente: id }
        });
        
        if (actualizado === 0) {
            console.log("No hubo cambios, pero se confirmó la información del paciente");
        }
        res.redirect("/pacientes/lista-pacientes");
    } catch (error) {
        console.error("Error al actualizar el paciente:", error.message);
        
        const pacienteDatos = await Paciente.findByPk(id);
        res.render("editarPaciente", {
        error: error.message,
        datos: req.body,
        paciente: pacienteDatos,
        modo: "edicion"
        });
    }
}

exports.ConfirmarDatosPaciente = async function(req, res) {
         const id = req.params.id;
        const datos = req.body;
    try {
        
        if(datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(datos.Apellido.trim() === ""){
            throw new Error("Ingrese un apellido valido");
            
        }

        if(!datos.Sexo || datos.Sexo.trim() === ""){
            throw new Error("Ingrese un genero");
            
        }
        if(datos.Domicilio.trim() === ""){
            throw new Error("Debe ingresar un domicilio");
            
        }
        if(datos.Telefono.length < 4 || datos.Telefono.trim() === ""){
            throw new Error("Debe ingresar un telefono valido");
            
        }

        const pacienteExistente =  await Paciente.findByPk(id);

        if(!pacienteExistente){
            throw new Error("No se pudo encontrar el paciente");
        }

        const [actualizado] = await Paciente.update(datos, {
            where: { ID_paciente: id }
        });
        
        if (actualizado === 0) {
            console.log("No hubo cambios, pero se confirmó la información del paciente");
        }
        res.redirect(`/pacientes/internaciones/internar/${id}`);
    } catch (error) {
        console.error("Error al actualizar el paciente:", error.message);
        
        const pacienteDatos = await Paciente.findByPk(id);
        res.render("editarPaciente", {
        error: error.message,
        datos: req.body,
        paciente: pacienteDatos,
        modo: "confirmacion"
        });
    }
}

