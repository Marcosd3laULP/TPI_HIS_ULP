const { error } = require('console');
const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');


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
    }, {
    timestamps: false  // Desactivar los campos createdAt y updatedAt
   
});

module.exports = Paciente
