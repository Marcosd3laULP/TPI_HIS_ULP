const {Internacion} = require("../Modelo/relaciones/asociaciones");
const {Habitacion} = require("../Modelo/relaciones/asociaciones");
const internacionUtils = require("./internacionUtilsControl");
const {Paciente} = require("../Modelo/relaciones/asociaciones");
const {Cama} = require("../Modelo/relaciones/asociaciones");

/*exports.internacionInterfaz = async function (req, res) {
    res.render("Internos/pacienteInternado")
}*/

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
         console.log("ID de la habitación recibido:", req.params.idhab); // <-- AGREGAR ESTO
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