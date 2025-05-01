const fs = require('fs');
const path = require('path');
const rutaAlJSON = path.join(__dirname, "../paciente.json");

exports.mostrarOpPaciente = (req, res) => {
    res.render("paciente");
};

exports.cargarPaciente = (req, res) => { //ESTE SOLO RENDERIZA EL FORMULARIO
    res.render("ingresoPaciente");
}

//LISTADO DE PACIENTES

exports.listarPacientes = (req, res) => {
    fs.readFile(rutaAlJSON, "utf8", (error, data) => {
        if(error) return res.status(500).send("error al leer el JSON");

        const listadoDePacientes = JSON.parse(data);
        res.render("listaPaciente",{ listadoDePacientes });
    })
}

//INSERCIÓN DE NUEVO PACIENTE

exports.insertarPaciente = (req, res) => { //ESTE ES EL METODO QUE CARGA LO INGRESADO EN EL FORMULARIO
    let pacienteNuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        sexo: req.body.genero === 'M' ? 'Masculino' : 'Femenino',
        domicilio: req.body.domicilio,
        telefono: parseInt(req.body.telefono)
    };

    

    //Leyendo el JSON
    fs.readFile(rutaAlJSON, 'utf8', (error, data) => {
        if(error)
            return res.status(500).send("Error al leer el archivo JSON");
        
        let pacientes = [];

        try {
            pacientes = JSON.parse(data);
        } catch (parseError) {
            return res.status(500).send("Error al convertir los datos a JSON");
        }

        pacientes.push(pacienteNuevo);

        fs.writeFile(rutaAlJSON, JSON.stringify(pacientes, null, 2), (error) => {
            if(error) 
                return res.status(500).send("No se pudo cargar el nuevo paciente");

            res.send("Cargado con exito el paciente :)");
        });

    });

};

//EDICION DE UN PACIENTE

exports.cargarDatosAModificar = (req, res) => {
    const id = parseInt(req.params.id);

    fs.readFile(rutaAlJSON, "utf8", (error, data) => {
        if(error) return res.status(500).send("No se pudo leer el JSON");

    const pacientes = JSON.parse(data);
    const elPaciente = pacientes.find(p => p.id === id);    

    if(!elPaciente) return res.status(404).send("paciente no encontrado");

    res.render("editarPaciente", { elPaciente }); // Renderizamos el formulario ya con los datos para modificar.
});
}

//GUARDAR LOS DATOS MODIFICADOS

exports.guardarLosCambios = (req, res) => {
    const id = parseInt(req.params.id)

    fs.readFile(rutaAlJSON, "utf8", (error, data) => {
        if(error) return res.status(500).send("error al leer el JSON");

        const pacientes = JSON.parse(data);
        const indice = pacientes.findIndex(p => p.id === id);

        if(indice === -1) return res.status(404).send("No se encontro el paciente");

        pacientes[indice].nombre = req.body.nombre
        pacientes[indice].edad = req.body.edad
        pacientes[indice].sexo = req.body.genero === 'M' ? 'Masculino' : 'Femenino';
        pacientes[indice].domicilio = req.body.domicilio
        pacientes[indice].telefono = req.body.telefono

        fs.writeFile(rutaAlJSON, JSON.stringify(pacientes, null, 2), (err) => {
            if(err) return res.status(500).send("error al modificar los datos");
            res.redirect("/pacientes/lista");
        });
    });
};