const {Paciente} = require('../Modelo/relaciones/asociaciones');

// Renderiza la vista inicial de pacientes
exports.mostrarOpPaciente = function (req, res) { //SI ERA EXPORTS AL FINAL JAJA
    res.render("pacientes");
};

// Obtener todos los pacientes
exports.obtenerPacientes = async function(req, res) {
    try {
        const pacientes = await Paciente.findAll();
        res.render("listaPaciente", { pacientes });
    } catch (error) {
        console.error("Error al obtener pacientes:", error.message);
        throw new Error("No se pudieron obtener los datos de los pacientes");
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

        res.render("editarPaciente", {paciente});
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
    try {
        const datos = req.body

        if(!datos.Nombre || datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(!datos.Apellido || datos.Apellido.trim() === ""){
            throw new Error("Ingrese un apellido valido");
            
        }

        if(!datos.DNI ||datos.DNI.length < 8 || datos.DNI.trim() === ""){
            throw new Error("Ingrese un DNI valido");
            
        }//VALIDADOR SI YA HAY UN DNI CARGADO

        if(!datos.Sexo || datos.Sexo.trim() === ""){
            throw new Error("Ingrese un genero");
            
        }
        if(!datos.Domicilio || datos.Domicilio.trim() === ""){
            throw new Error("Debe ingresar un domicilio");
        
            
        }

         if(!datos.Seguro || datos.Seguro.trim() === ""){
            throw new Error("Debe ingresar una obra social");
            
        }

        if(!datos.Telefono || datos.Telefono.length < 4 || datos.Telefono.trim() === ""){
            throw new Error("Debe ingresar un telefono valido");
            
        }


        const paciente = await Paciente.create(datos);

        res.redirect(`/turnos/${paciente.ID_paciente}/turnosV2`);
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
    console.log("URL:", req.originalUrl);
    console.log("req.params.id:", req.params.id);
    try {
        const id = req.params.id;
        const datos = req.body;
        
        if(datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(datos.Apellido.trim() === ""){
            throw new Error("Ingrese un apellido valido");
            
        }

        if(datos.DNI.length < 8 || datos.DNI.trim() === ""){
            throw new Error("Ingrese un DNI valido");
            
        }//VALIDADOR SI YA HAY UN DNI CARGADO

        if(!datos.Sexo || datos.Sexo.trim() === ""){
            throw new Error("Ingrese un genero");
            
        }
        if(datos.Domicilio.trim() === ""){
            throw new Error("Debe ingresar un domicilio");
            
        }
        if(datos.Telefono.length < 4 || datos.Telefono.trim() === ""){
            throw new Error("Debe ingresar un telefono valido");
            
        }

        const [actualizado] = await Paciente.update(datos, {
            where: { ID_paciente: id }
        });
        
        if (actualizado === 0) {
            throw new Error("No se pudo hallar el paciente para hacer los cambios");
        }
        res.redirect("/pacientes/lista-pacientes");
    } catch (error) {
        console.error("Error al actualizar el paciente:", error.message);
        res.render("editarPaciente", {
        error: error.message,
        datos: req.body,
        paciente: { ID_paciente: req.params.id }
        });
    }
}

