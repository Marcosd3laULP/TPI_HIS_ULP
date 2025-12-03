const { DataTypes } = require("sequelize");
const sequelize = require("../baseDatos/bd");

const ObservacionF = sequelize.define('ObservacionF', {

    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

     ID_internacion: {
    type: DataTypes.INTEGER,
    allowNull: false
    },

     ID_Profesional: {
    type: DataTypes.INTEGER,
    allowNull: false
    },

    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Presion_arterial: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Frecuencia_cardiaca: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Temperatura: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Frecuencia_respiratoria: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: "observaciones_enfermeria"
});

module.exports = ObservacionF;