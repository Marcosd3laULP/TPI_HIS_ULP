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

exports.verificarSexo = async function (req, res) {
  const { idCama, sexoPaciente } = req.params;


  try {
    const cama = await Cama.findByPk(idCama);
    if (!cama) {
      return res.status(404).json({ error: "Cama no encontrada" });
    }



    const camasHabitacion = await Cama.findAll({
      where: { ID_hab: cama.ID_hab },
      include: {
        model: Internacion, as: 'Internaciones',
        where: { Activo: true },
        required: false,
        include: {
          model: Paciente, as: 'Paciente',
          attributes: ['Sexo']
        }
      }
    });


    for (const camaH of camasHabitacion) {
      if (camaH.Internaciones.length > 0) {
        const pacienteSexo = camaH.Internaciones[0].Paciente.Sexo;

        if (pacienteSexo !== sexoPaciente) {
    
          return res.json({ compatible: false });
        }
      }
    }

   
    return res.json({ compatible: true });

  } catch (error) {
    console.error("Error inesperado:", error);
    return res.status(500).json({ error: "Error en el servidor" });
  }
};

