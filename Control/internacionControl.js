const {Internacion} = require("../Modelo/relaciones/asociaciones");
const {Habitacion} = require("../Modelo/relaciones/asociaciones");
const internacionUtils = require("./internacionUtilsControl");
const {Paciente} = require("../Modelo/relaciones/asociaciones");
const {Ala} = require("../Modelo/relaciones/asociaciones");
const {Cama} = require("../Modelo/relaciones/asociaciones");
const {Turno} = require("../Modelo/relaciones/asociaciones");
const { where } = require("sequelize");

/*exports.internacionInterfaz = async function (req, res) {
    res.render("Internos/pacienteInternado")
}*/

exports.buscarTodoInternados = async function (req, res) {
    try {
        const internaciones = await Internacion.findAll({
            where: { Activo: true },
            include: [
                {model: Paciente,as: "Paciente",
                    include:[{model: Turno,as: "Turnos", where: { Estado: true }, required: false}]
                },
                {model: Cama,as: "Cama",include: [{ model: Habitacion, as: "Hab"}],required: true,
                    attributes: ['ID_hab', 'numero', 'ID_cama', 'Numero', 'Estado', 'Sexo_ocupante']}]
        });

        res.render("Internos/listaInternos", { internaciones });
    } catch (error) {
        console.error("Error al buscar los internados:", error.message);
        res.status(500).send("No se pudo localizar los internados");
    }
};


exports.interfazInternacion = async function (req, res) {
    try {
        const id = req.params.id
        const paciente =  await Paciente.findByPk(id);
        const alas = await internacionUtils.buscarTodasAlas();

        if(!paciente){
            res.status(404).send("Paciente no encontrado");
        }
        res.render("Internos/pacienteInternado", {paciente, alas}) //esto son arreglos cuando estan dentro de las "{}"
    } catch (error) {
        console.error("Error al buscar el paciente:", error.message);
        throw new Error("No se pudo localizar el paciente");
        
    }
}

exports.buscarHabitacionPorAla = async function (req, res) {
    try {
        const habitaciones =await Habitacion.findAll({
            where: {ID_ala: req.params.idAla}
        });
        res.json(habitaciones); //DEBE IR json NO JSON
    } catch (error) {
         console.error("Error al buscar las habitaciones:", error.message);
        res.status(500).json({ error: "No se pudo localizar la habitación" });

    }
}

exports.buscarCamaPorHabitacion =async function (req, res) {
    try {
        const camas = await Cama.findAll({
        attributes: ['ID_cama', 'Numero', 'Estado', 'Sexo_ocupante', 'ID_hab'], // explícito
        where: { ID_hab: req.params.idhab }
        });

        res.json(camas);
    } catch (error) {
        console.error("Error al buscar las camas:", error.message);
        res.status(500).json({ error: "No se pudo localizar la cama" });
    }
    
}

exports.realizarInternacion = async function (req, res) {
        const {idCama, idPaciente, motivo} = req.body;
    try {
        const paciente = await Paciente.findByPk(idPaciente);
        
        if(!paciente) 
            return res.status(404).render('Internos/pacienteInternado', {
            paciente,
            alas: await Ala.findAll(),
            error: "Paciente o cama no encontrado"
        });
   
       const nuevaInternacion = await Internacion.create({
            ID_cama: idCama,
            ID_paciente: idPaciente,
            Fecha_ingreso: new Date(),
            Motivo: motivo,
            Activo: true
        });

    const turnoConsumido = await Turno.findOne({
      where: {
        ID_paciente: idPaciente,
        Es_tomado: true
      },
      order: [['Fecha', 'DESC']] 
    });

    if (turnoConsumido && turnoConsumido.Fecha) {
     
      await nuevaInternacion.update({ Fecha_ingreso: turnoConsumido.Fecha });
    }

 await internacionUtils.cambiarEstadoCama(idCama, paciente.Sexo);

        res.redirect("lista-internados");
    } catch (error) {
        console.error("Error al asignar cama:", error);
    res.status(500).send("Error al asignar cama");
    }
}

//ESTE METODO QUEDO POSIBLEMENTE OBSOLETO, SI NO LE LLEGO A ENCONTRAR USO
/*exports.cancelarInternacion = async function (req, res) {
    const {id} = req.params;
    try {
        const internado = await Internacion.findByPk(id);

        if(!internado) res.status(404).send("No encontrado");
        if(internado.ID_cama){
            await internacionUtils.liberarCama(internado.ID_cama);
        } 
        await internado.destroy();
        res.redirect('/pacientes/internaciones/lista-internados');
    } catch (error) {
         console.error("Error al eliminar:", error);
    res.status(500).send("Error al eliminar");
    }
}*/ 