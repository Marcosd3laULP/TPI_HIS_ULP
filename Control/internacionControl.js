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

exports.realizarInternacion = async function (req, res) {
  const { idCama, idPaciente, motivo, sexoPaciente } = req.body;

  try {
    // 1. Traer paciente
    const paciente = await Paciente.findByPk(idPaciente);
    if (!paciente) {
      return res.status(404).render('Internos/pacienteInternado', {
        paciente: null,
        alas: await Ala.findAll(),
        error: "Paciente no encontrado"
      });
    }

    // 2. Validar compatibilidad de sexo
    const resultadoSexo = await internacionUtils.verificarSexo(idCama, sexoPaciente);

    if (!resultadoSexo.compatible) {
      return res.status(400).render('Internos/pacienteInternado', {
        paciente,
        alas: await Ala.findAll(),
        error: `La habitación ya tiene un paciente de sexo ${resultadoSexo.sexoExistente}. No se puede mezclar.`
      });
    }

    // 3. Crear internación
    const nuevaInternacion = await Internacion.create({
      ID_cama: idCama,
      ID_paciente: idPaciente,
      Fecha_ingreso: new Date(),
      Motivo: motivo,
      Activo: true
    });

    // 4. Ajustar Fecha según turno
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

    // 5. Cambiar estado de la cama
    await internacionUtils.cambiarEstadoCama(idCama, paciente.Sexo);

    // 6. Redirigir
    res.redirect("lista-internados");

  } catch (error) {
    console.error("Error al asignar cama:", error);
    res.status(500).send("Error al asignar cama");
  }
};

exports.realizarInternacionDeEmergencia = async function (req, res) {
  const { idCama, idPaciente, motivo, sexoPaciente } = req.body;

  try {
    // 1. Traer paciente
    const paciente = await Paciente.findByPk(idPaciente);
    if (!paciente) {
      return res.status(404).render('Internos/emergenciaInternacion', {
        paciente: null,
        alas: await Ala.findAll({ where: { Sector: 'Emergencia' } }),
        error: "Paciente no encontrado"
      });
    }

    // 2. Validar compatibilidad de sexo
    const resultadoSexo = await internacionUtils.verificarSexo(idCama, sexoPaciente);

    if (!resultadoSexo.compatible) {
      return res.status(400).render('Internos/emergenciaInternacion', {
        paciente,
        alas: await Ala.findAll({ where: { Sector: 'Emergencia' } }),
        error: `La habitación ya tiene un paciente de sexo ${resultadoSexo.sexoExistente}. No se puede mezclar.`
      });
    }

    // 3. Crear internación
    const nuevaInternacion = await Internacion.create({
      ID_cama: idCama,
      ID_paciente: idPaciente,
      Fecha_ingreso: new Date(),
      Motivo: motivo,
      Activo: true
    });

    // 4. Ajustar Fecha según turno
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

    // 5. Cambiar estado de la cama
    await internacionUtils.cambiarEstadoCama(idCama, paciente.Sexo);

    // 6. Redirigir
    res.redirect("/pacientes/lista-pacientes");

  } catch (error) {
    console.error("Error al asignar cama:", error);
    res.status(500).send("Error al asignar cama");
  }
};


//VISTA
exports.interfazInternacion = async function (req, res) {
  try {
    const id = req.params.id;
    const paciente = await Paciente.findByPk(id);

    if (!paciente) {
      return res.status(404).send("Paciente no encontrado");
    }

    const alas = await Ala.findAll({
      include: [
        {
          model: Habitacion,
          as: "habitaciones",
          include: [
            {
              model: Cama,
              as: "camas"
            }
          ]
        }
      ]
    });

    res.render("Internos/pacienteInternado", {
      paciente: paciente.get({ plain: true }),
      alas: alas.map(a => a.get({ plain: true })),
      csrfToken: req.csrfToken()
    });

  } catch (error) {
    console.error("Error en interfazInternacion:", error);
    res.status(500).send("Error interno del servidor");
  }
};


exports.vistaEmergencia = async function (req, res) {
    res.render("Internos/emergencia", { csrfToken: req.csrfToken() });
    
}

exports.vistaEmergenciaInternacion = async function (req, res) {
  try {
    const id = req.params.id;
    const paciente = await Paciente.findByPk(id);
    const csrfToken = req.csrfToken(); // obtenemos token CSRF

    // Traemos solo el ala de emergencia
    const alas = await Ala.findAll({
      where: { Sector: 'Emergencias' }, // filtro por ala de emergencia
      include: {
        model: Habitacion,
        as: "habitaciones",
        include: {
          model: Cama,
          as: "camas"
        }
      }
    });

    res.render('Internos/emergenciaInternacion', {
      alas,
      paciente,
      csrfToken,
      error: null
    });

  } catch (error) {
    console.error("Error cargando ala de emergencia:", error);
    res.status(500).send("Error cargando ala de emergencia");
  }
};

exports.vistaNormalizar = async function(req, res) {
  try {
    const csrfToken = req.csrfToken();

    // El paciente que llegó por emergencia (puede venir por req.params o req.query)
    const idPacienteEmergencia = req.params.id || null;

    res.render('Internos/normalizar', {
      csrfToken,
      idPacienteEmergencia,
      idPacienteNormal: null,
      mensaje: null
    });
  } catch (error) {
    console.error("Error renderizando normalizar:", error);
    res.status(500).send("Error renderizando normalizar");
  }
};

exports.mostrarConfirmar = async function(req, res) {
  try {
    const { idPacienteNormal, idPacienteEmergencia } = req.params;
    const csrfToken = req.csrfToken();

    const pacienteNormal = await Paciente.findByPk(idPacienteNormal);
    if (!pacienteNormal) {
      return res.status(404).send("Paciente normal no encontrado");
    }

    res.render('Internos/confirmar', {
      csrfToken,
      pacienteNormal,
      idPacienteNormal,
      idPacienteEmergencia
    });

  } catch (error) {
    console.error("Error renderizando confirmar:", error);
    res.status(500).send("Error renderizando confirmar");
  }
};

exports.mostrarRegistroAnonimo = async function(req, res) {
  try {
    const { idPacienteEmergencia } = req.params;
    const csrfToken = req.csrfToken();

    res.render('Internos/registroAnonimo', {
      csrfToken,
      idPacienteEmergencia
    });
  } catch (error) {
    console.error("Error renderizando registro anónimo:", error);
    res.status(500).send("Error renderizando registro anónimo");
  }
};

//POST
exports.registrarEmergencia = async function (req, res) {
        const { sexo } = req.body
    try {
        const paciente = await crearPacienteEnEmergencia(sexo);
        //console.log(paciente)
        res.redirect(`/pacientes/internaciones/emergenciaInternacion/${paciente.ID_paciente}`);
    } catch (error) {
        console.error("Error al cargar el paciente anonimo:", error.message);
        res.status(500).send("Error al registrar el paciente en emergencias.");
    }
}

exports.procesarBusqueda = async function(req, res) {
  try {
    const { dni, idPacienteEmergencia } = req.body;
    const csrfToken = req.csrfToken();

    // Buscamos al paciente
    const paciente = await buscarPacientePorDNI(dni);

    let mensaje;
    let idPacienteNormal = null;

    if (paciente) {
      mensaje = "Este paciente está en la base de datos";
      idPacienteNormal = paciente.ID_paciente; // llenamos input oculto
    } else {
      mensaje = "Este paciente no se encuentra cargado";
    }

    // Renderizamos la misma vista con el mensaje y el input actualizado
    res.render('Internos/normalizar', {
      csrfToken,
      idPacienteEmergencia,
      idPacienteNormal,
      mensaje
    });

  } catch (error) {
    console.error("Error procesando búsqueda:", error);
    res.status(500).send("Error procesando búsqueda");
  }
};

exports.confirmarDatosPaciente = async function(req, res) {
  try {
    const { idPacienteNormal, idPacienteEmergencia, nombre, apellido, dni, sexo, domicilio, telefono } = req.body;

    
    const pacienteNormal = await Paciente.findByPk(idPacienteNormal);
    if (!pacienteNormal) return res.status(404).send("Paciente normal no encontrado");

    await pacienteNormal.update({
      Nombre: nombre,
      Apellido: apellido,
      DNI: dni,
      Sexo: sexo,
      Domicilio: domicilio,
      Telefono: telefono
    });

    
    const internacionEmergencia = await Internacion.findOne({
      where: { ID_paciente: idPacienteEmergencia }
    });

    if (internacionEmergencia) {
      await internacionEmergencia.update({ ID_paciente: idPacienteNormal });
    }

   
    const pacienteEmergencia = await Paciente.findByPk(idPacienteEmergencia);
    if (pacienteEmergencia) await pacienteEmergencia.destroy();


    res.redirect('/pacientes/lista-pacientes');

  } catch (error) {
    console.error("Error confirmando datos del paciente:", error);
    res.status(500).send("Error confirmando datos del paciente");
  }
};


exports.guardarRegistroAnonimo = async function(req, res) {
  try {
    const { idPacienteEmergencia, nombre, apellido, dni, sexo, domicilio, telefono } = req.body;

    await IdentificarPaciente({ idPacienteEmergencia, nombre, apellido, dni, sexo, domicilio, telefono });

    res.redirect('/pacientes/lista-pacientes');

  } catch (error) {
    console.error("Error guardando registro anónimo:", error);
    res.status(500).send("Error guardando registro anónimo");
  }
};
//LOGICA

async function crearPacienteEnEmergencia(sexo) {
    return await Paciente.create({
    Nombre: "Anonimo",
    Apellido: "Anonimo",
    DNI: null,
    Sexo: sexo,
    Domicilio: null,
    Telefono: null});
}

buscarPacientePorDNI = async function(dni) {
    const paciente = await Paciente.findOne({
      where: { DNI: dni }
    });
    return paciente
};

IdentificarPaciente = async function({ idPacienteEmergencia, nombre, apellido, dni, sexo, domicilio, telefono }) {

    const pacienteEmergencia = await Paciente.findByPk(idPacienteEmergencia);
    if (!pacienteEmergencia) throw new Error("Paciente anónimo no encontrado");

    await pacienteEmergencia.update({
      Nombre: nombre,
      Apellido: apellido,
      DNI: dni,
      Sexo: sexo,
      Domicilio: domicilio,
      Telefono: telefono
    });

    return pacienteEmergencia;
};