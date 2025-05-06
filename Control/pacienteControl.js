const modeloDePacientes = require("../Modelo/pacienteModelo");

exports.mostrarOpPaciente = (req, res) => {
    res.render("paciente");
};

//LISTADO DE PACIENTES

exports.listarPacientes = async (req, res) => {
try {
 const pacientes = await modeloDePacientes.obtenerPacientes(); 
 res.render("listaPaciente", {"listadoDePacientes": pacientes});
} catch (error) {
  res.status(500).send("No se pudo cargar bien la lista");
}
  
}

exports.cargarPaciente = (req, res) => { //ESTE SOLO RENDERIZA EL FORMULARIO
    res.render("ingresoPaciente");
}

//INSERCIÓN DE NUEVO PACIENTE

exports.insertarPaciente = async (req, res) => { //ESTE ES EL METODO QUE CARGA LO INGRESADO EN EL FORMULARIO
    
    let pacienteNuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        sexo: req.body.genero === 'M' ? 'Masculino' : 'Femenino',
        domicilio: req.body.domicilio,
        telefono: parseInt(req.body.telefono)
    };
    
    const errores = modeloDePacientes.validarDatos(pacienteNuevo);

    if(Object.keys(errores) > 0){
        return res.status(404).render("ingresoPaciente",{ errores, paciente: pacienteNuevo});
    }

    try {
        await modeloDePacientes.cargarPaciente(pacienteNuevo);
        res.send("paciente cargado bien hecho :D");
    } catch (error) {
        res.status(500).send("No se pudo cargar el paciente");
    }
};

//EDICION DE UN PACIENTE

exports.cargarDatosAModificar = async (req, res) => {
    const id = parseInt(req.params.id);
    let pacientes;
    try {
         pacientes = await modeloDePacientes.obtenerPacientes();
    } catch (error) {
        res.status(500).send("No se pudo leer la lista de pacientes");
    
    }
    const elPaciente = pacientes.find(p => p.id === id);    

    if(!elPaciente) return res.status(404).send("paciente no encontrado");

    res.render("editarPaciente", { elPaciente }); // Renderizamos el formulario ya con los datos para modificar.

}

//GUARDAR LOS DATOS MODIFICADOS

exports.guardarLosCambios = async (req, res) => {
    const id = parseInt(req.params.id);

    try {
        // Obtener la lista actual de pacientes desde el modelo
        const pacientes = await modeloDePacientes.obtenerPacientes();

        // Buscar el índice del paciente a modificar
        const indice = pacientes.findIndex(p => p.id === id);
        if (indice === -1) {
            return res.status(404).send("No se encontró el paciente");
        }

        // Actualizar los datos del paciente
        pacientes[indice].nombre = req.body.nombre;
        pacientes[indice].edad = parseInt(req.body.edad);
        pacientes[indice].sexo = req.body.genero === 'M' ? 'Masculino' : 'Femenino';
        pacientes[indice].domicilio = req.body.domicilio;
        pacientes[indice].telefono = parseInt(req.body.telefono);

        // Guardar la lista modificada
        await modeloDePacientes.guardarPacientes(pacientes);

        // Redirigir a la lista
        res.redirect("/pacientes/lista");
    } catch (error) {
        console.error(error);
        res.status(500).send("No se pudieron guardar los cambios");
    }
};
