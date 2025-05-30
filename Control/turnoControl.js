const { where } = require("sequelize");
const { Turno } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Prestador } = require("../Modelo/relaciones/asociaciones");
const { Atenciones } = require("../Modelo/relaciones/asociaciones");

exports.mostrarOpTurnos = async function (req, res) {
    res.render("turnos");
}

exports.formTurnoAdmision = async function (req, res) {
    try {
        const idPaciente = req.params.id;
        const paciente = await Paciente.findByPk(idPaciente);
        const prestadores = await Prestador.findAll({
            where: {
                Rol: 'Medico'
            }
        });
        res.render("turnosV2", { paciente, prestadores });
    } catch (error) {
        console.log("Hubo un error y fue este: " + error.message);
        throw new Error("Error al cargar el formulario");
        
    }

}

exports.formTurno = async function (req, res) {
    res.render("turnos");
}

exports.buscarTodoTurno = async function(req, res){
    try {
        const turnos =  await Turno.findAll({
            include: [{ model: Paciente, as: 'Paciente', attributes: ["Nombre", "Apellido"]},
            {model: Prestador, as: 'Prestador', attributes: ['Nombre', 'Apellido', 'Especialidad']}
        ]
        });
        const turnosJson = turnos.map(t => t.toJSON());
        res.render("listaTurno", { turnos: turnosJson });
    } catch (error) {
        console.log("Hubo un error al buscar todos los turnos: ", error.message);
        res.status(500).send("No se pudo traer todos los turnos");
        
    }

}

async function buscarTurnoId(id) {
    try {
        const turno = await Turno.findByPk(id);

        if(!turno){
            throw new Error("No se hallo el turno con el id especifico");
        }
        return turno.toJSON();
    } catch (error) {
        console.log("ocurrio un error en busca el turno especifico y fue este: " , error.message);
        throw new Error("hubo un fallo en buscar el turno en especifico");
        
    }
}

exports.insertarTurnoV2 = async function (req, res) {
    try {
        const datos = req.body;
        const {Fecha, Motivo, ID_Profesional} = datos;

        if(!Fecha || Fecha.trim() === ""){
            throw new Error("Debe ingresar una fecha para el turno");
        }
        const fechaIngresada = new Date(Fecha);
        if(isNaN(fechaIngresada.getTime())){ //isNaN sirve también para fechas
            throw new Error("La fecha ingresada no es valida");
            
        }

        const hoy = new Date();
        hoy.setHours(0, 0, 0, 0); //Sacamos las horas, minutos y segundos para solo dejar la fecha.

        if(fechaIngresada < hoy){
            throw new Error("La fecha del turno no puede ser anterior a la de hoy");
            
        }

         if(!Motivo || Motivo === ""){
            throw new Error("Debe especificar un motivo");
            
        }

        if(!ID_Profesional || ID_Profesional === ""){
            throw new Error("Debe seleccionar a un medico");
            
        }


        await Turno.create(datos);
        res.redirect("/turnos/lista-turnos");
    } catch (error) {
        console.log("Hubo un error al insertar el turno: " + error.message);
        res.render("turnosV2", {
            error: error.message,
            datos: req.body
        });
    }
}

exports.anunciar = async function (req, res) {
    const {Nro_turno} = req.params
    const {Fecha, Motivo, ID_Profesional, ID_paciente} = req.body

    try {
        if(!Fecha) throw new Error("Fecha no proporcionada");
        if(!Motivo) throw new Error("Motivo no proporcionado");
        if(!ID_paciente) throw new Error("Paciente no especificado");
        if(!ID_Profesional) throw new Error("Profesional no especificado");

        const turno = Turno.findByPk(Nro_turno, {
            include: [ 
                {model: Paciente, as: "Paciente"},
                {model: Prestador, as: "Prestador"},
            ]
        });

        if(!turno){
            return res.status(404).send("Turno no encontrado.");
        }
        //console.log('Datos del turno:', turno.toJSON());
        //console.log('Body recibido:', req.body);
        await Atenciones.create({
            Fecha,
            Motivo,
            ID_paciente,
            ID_Profesional    
        });
        
        
        await Turno.update( 
            {Es_tomado: true, Estado: false },
            {where: { Nro_turno }}
        );
        res.redirect("/turnos/lista-turnos");
    } catch (error) {
        console.log("hubo un problema en anunciar y fue este: ", error.message);
        res.status(500).send("No se pudo anunciar el turno");
    }
}

exports.cancelar = async function (req, res) {
    console.log("PARAMS:", req.params)
    const {Nro_turno} = req.params

    try {
        const turno = Turno.findByPk(Nro_turno);

        if(!turno){
            return res.status(404).send("Turno no encontrado.");
        }
        await Turno.update( 
            {Es_tomado: false, Estado: false },
            {where: {Nro_turno}}
        );
        res.redirect("/turnos/listaTurno");
    } catch (error) {
        console.log("hubo un problema en anunciar y fue este: ", error.message);
        res.status(500).send("No se pudo anunciar el turno");
    }
}

