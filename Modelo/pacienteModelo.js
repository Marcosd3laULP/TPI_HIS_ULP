const { error } = require('console');
const { DataTypes } = require('sequelize');
const sequelize = require('../baseDatos/bd');

//Vinculamos la tabla 'paciente' de la base de datos:
const Paciente = sequelize.define('pacientes', {
    ID_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },

    DNI: {
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true
    },

    Sexo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Seguro: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Domicilio: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Telefono: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
   
});

//Obtener todos los pacientes
async function obtenerPacientes() {
    try {
       const pacientes = await Paciente.findAll();
       return pacientes.map(paciente => paciente.toJSON());
        
    } catch (error) {
        console.error("Error al querer obtener pacientes:", error.message);
        throw new Error ("No se pudieron obtener los datos de los pacientes");
    }
}

//Buscar paciente por id:
async function buscarPacientePorId(id) {
    try {
        const paciente = await Paciente.findOne({ where: {ID_paciente: id}
        });

        if (!paciente) {
            throw new Error("Paciente no encontrado");
        }

        return paciente.toJSON();
    } catch (error) {
        console.error("Error al buscar el paciente:", error.message);
        throw new Error("No se pudo hallar el paciente");
    }
}

//Actualizar datos de paciente:
// Actualizar un paciente por su ID
async function ActualizarPaciente(id, nuevosDatos) {
    try {
        // Usamos Sequelize para actualizar el paciente
        const [actualizado] = await Paciente.update(nuevosDatos, {
            where: { ID_paciente: id }
        });

        if (actualizado === 0) {
            throw new Error("No se pudo hallar el paciente o no hubo cambios");
        }

        return "Paciente actualizado exitosamente"; // Puedes devolver un mensaje o el paciente actualizado
    } catch (error) {
        console.error("Error al actualizar el paciente:", error.message);
        throw new Error("No se pudo guardar el paciente");
    }
}

//VALIDAR DATOS DEL PACIENTE:
async function validarDatos(paciente) {
    if (!paciente) {
        throw new Error("Se esperaba un objeto paciente y no se recibió ninguno");
    }

    const errores = {};

    // Validación de nombre
    if (!paciente.nombre || paciente.nombre.trim() === '') {
        errores.nombre = "Debe ingresar un nombre válido";
    }

    // Validación de edad
    if (isNaN(paciente.edad) || paciente.edad < 0 || paciente.edad > 120) {
        errores.edad = "Debe ingresar una edad válida (de 0 a 120)";
    }

    // Validación de sexo
    if (paciente.sexo !== "masculino" && paciente.sexo !== "femenino") {
        errores.sexo = "Sexo no válido. Debe ser 'masculino' o 'femenino'";
    }

    // Validación de domicilio
    if (!paciente.domicilio || paciente.domicilio.trim() === '') {
        errores.domicilio = 'El domicilio no puede estar vacío';
    }

    // Validación de teléfono
    if (!paciente.telefono || isNaN(paciente.telefono) || paciente.telefono.toString().length < 10) {
        errores.telefono = "Teléfono no válido. Debe ser un número con al menos 10 dígitos";
    }

    // Validación de DNI único
    if (!paciente.dni || isNaN(paciente.dni)) {
        errores.dni = "DNI no válido";
    } else {
        const pacienteExistente = await Paciente.findOne({
            where: { DNI: paciente.dni }
        });

        if (pacienteExistente) {
            errores.dni = "El DNI ingresado ya está registrado";
        }
    }

    return errores;
}


module.exports = {
    Paciente,
    obtenerPacientes,
    buscarPacientePorId,
    ActualizarPaciente,
    validarDatos
};