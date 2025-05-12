const {Paciente} = require('../Modelo/pacienteModelo');

// Renderiza la vista inicial de pacientes
function mostrarOpPaciente (req, res) { //ANOTAR ESTE ERROR ¡¡ACUERDATE!!! NO ES EXPORTS SI FUNCTION
    res.render("pacientes");
};

// Obtener todos los pacientes
async function obtenerPacientes() {
    try {
        const pacientes = await Paciente.findAll();
        return pacientes.map(p => p.toJSON());
    } catch (error) {
        console.error("Error al obtener pacientes:", error.message);
        throw new Error("No se pudieron obtener los datos de los pacientes");
    }
}

// Buscar paciente por ID
async function buscarPacientePorId(id) {
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            throw new Error("Paciente no encontrado");
        }
        return paciente.toJSON();
    } catch (error) {
        console.error("Error al buscar el paciente:", error.message);
        throw new Error("No se pudo hallar el paciente");
    }
}

// Crear (cargar) un nuevo paciente
async function cargarPaciente(datos) {
    try {
        const paciente = await Paciente.create(datos);
        return paciente.toJSON();
    } catch (error) {
        console.error("Error al cargar paciente:", error.message);
        throw new Error("No se pudo registrar el paciente");
    }
}

// Actualizar un paciente por su ID
async function actualizarPaciente(id, nuevosDatos) {
    try {
        const [actualizado] = await Paciente.update(nuevosDatos, {
            where: { ID_paciente: id }
        });

        if (actualizado === 0) {
            throw new Error("No se pudo hallar el paciente o no hubo cambios");
        }

        return "Paciente actualizado exitosamente";
    } catch (error) {
        console.error("Error al actualizar el paciente:", error.message);
        throw new Error("No se pudo guardar el paciente");
    }
}

// Validación de datos del paciente
async function validarDatos(paciente) {
    const errores = {};

    if (!paciente) {
        throw new Error("Se esperaba un objeto paciente");
    }

    // Validación de Nombre
    if (!paciente.Nombre || paciente.Nombre.trim() === '') {
        errores.Nombre = "Debe ingresar un nombre válido";
    }

    // Validación de Apellido
    if (!paciente.Apellido || paciente.Apellido.trim() === '') {
        errores.Apellido = "Debe ingresar un apellido válido";
    }

    // Validación de DNI
    if (!paciente.DNI || isNaN(paciente.DNI)) {
        errores.DNI = "DNI no válido";
    } else {
        const existente = await Paciente.findOne({ where: { DNI: paciente.DNI } });
        if (existente) {
            errores.DNI = "El DNI ingresado ya está registrado";
        }
    }

    // Validación de Sexo
    if (paciente.Sexo !== "masculino" && paciente.Sexo !== "femenino") {
        errores.Sexo = "Sexo no válido. Debe ser 'masculino' o 'femenino'";
    }

    // Validación de Domicilio
    if (!paciente.Domicilio || paciente.Domicilio.trim() === '') {
        errores.Domicilio = "El domicilio no puede estar vacío";
    }

    // Validación de Teléfono
    if (!paciente.Telefono || isNaN(paciente.Telefono) || paciente.Telefono.toString().length < 10) {
        errores.Telefono = "Teléfono no válido. Debe tener al menos 10 dígitos";
    }

    // Validación de Seguro
    if (!paciente.Seguro || paciente.Seguro.trim() === '') {
        errores.Seguro = "Debe indicar el seguro del paciente";
    }

    return errores;
}

// Exportar las funciones para su uso en rutas
module.exports = {
    mostrarOpPaciente,
    obtenerPacientes,
    buscarPacientePorId,
    cargarPaciente,
    actualizarPaciente,
    validarDatos
};
