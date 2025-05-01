const fs = require('fs');
const path = require('path');

exports.mostrarOpPaciente = (req, res) => {
    res.render("paciente");
};

exports.cargarPaciente = (req, res) => {
    res.render("ingresoPaciente");
}

//INSERCIÓN DE NUEVO PACIENTE

exports.insertarPaciente = (req, res) => {
    let pacienteNuevo = {
        id: Date.now(),
        nombre: req.body.nombre,
        edad: parseInt(req.body.edad),
        sexo: req.body.genero === 'M' ? 'Masculino' : 'Femenino',
        domicilio: req.body.domicilio,
        telefono: parseInt(req.body.telefono)
    };

    const rutaAlJSON = path.join(__dirname, "../paciente.json");

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