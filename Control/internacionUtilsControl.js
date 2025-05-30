const { where } = require("sequelize");
const { Ala } = require("../Modelo/relaciones/asociaciones");
const { Habitacion } = require("../Modelo/relaciones/asociaciones");
const { Cama } = require("../Modelo/relaciones/asociaciones");

exports.buscarTodasAlas = async function () {
    try {
        const alas = await Ala.findAll();
        return alas
    } catch (error) {
        console.error("No pudimos traer todas las alas por esto:", error.message);
    throw new Error("No se pudieron obtener los datos de alas");
    }
}

exports.buscarTodasHab = async function () {
    try {
        const Habitaciones = await Habitacion.findAll();
        return Habitaciones
    } catch (error) {
        console.error("No se pudo traer todas la habitaciones por esto: ", error.message);
        throw new Error("No se pudieron traer todas las habitaciones");
        
    }
}

exports.buscarTodoCamas = async function () {
    try {
        const camas = await Cama.findAll();
        return camas
    } catch (error) {
         console.error("No se pudo traer todas la camas por esto: ", error.message);
        throw new Error("No se pudieron traer todas las camas");
    }
}

exports.cambiarEstadoCama = async function (id, sexo) {
    try {
        const ID_cama = await Cama.findByPk(id);

        await Cama.update(
            {Estado: 'Ocupada', Sexo_ocupante: sexo},
            {where: {ID_cama}}
        )
    } catch (error) {
        console.error("No se pudo actualizar la cama por esto: ", error.message);
        throw new Error("No se pudo cambiar el estado de la cama");
    }
}