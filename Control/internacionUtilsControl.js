const { where } = require("sequelize");
const { Ala } = require("../Modelo/relaciones/asociaciones");
const { Habitacion } = require("../Modelo/relaciones/asociaciones");
const { Cama } = require("../Modelo/relaciones/asociaciones");
const { Paciente } = require("../Modelo/relaciones/asociaciones");
const { Internacion } = require("../Modelo/relaciones/asociaciones");

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

exports.cambiarEstadoCama = async function (idCama, sexo) {
    try {

        await Cama.update(
            {Estado: 'Ocupada', Sexo_ocupante: sexo},
            {where: {ID_cama: idCama}}
        );
    } catch (error) {
        console.error("No se pudo actualizar la cama por esto: ", error.message);
        throw new Error("No se pudo cambiar el estado de la cama");
    }
}

exports.liberarCama = async function (idCama) {
    try {
        await Cama.update(
            {Estado: "Libre", Sexo_ocupante: null},
            {where: {ID_cama: idCama}}
        );
    } catch (error) {
         console.error("No se pudo actualizar la cama por esto: ", error.message);
        throw new Error("No se pudo cambiar el estado de la cama");
    }
    
}

exports.verificarSexo = async function (idCama, sexoPaciente) {
  
  try {
    // 1. Traemos la cama donde quiere internar
    const cama = await Cama.findByPk(idCama);
    if (!cama) {
      throw new Error("Cama no encontrada");
    }

    // 2. Buscamos todas las camas de esa habitación con internaciones activas
    const camasOcupadas = await Cama.findAll({
      where: { ID_hab: cama.ID_hab },
      include: {
        model: Internacion,
        as: "Internaciones",
        where: { Activo: true },
        required: true,
        include: {
          model: Paciente,
          as: "Paciente",
          attributes: ["Sexo"]
        }
      }
    });

    // 3. Si no hay camas ocupadas, es compatible
    if (camasOcupadas.length === 0) {
      return { compatible: true };
    }

    // 4. Verificamos el sexo existente en la habitación
    for (const camaOcupada of camasOcupadas) {
      const sexoExistente = camaOcupada.Internaciones[0].Paciente.Sexo;

      if (sexoExistente !== sexoPaciente) {
        return { compatible: false, sexoExistente };
      }
    }

    return { compatible: true };

  } catch (error) {
    console.error("Error en verificación de sexo:", error);
    throw error;
  }
};


