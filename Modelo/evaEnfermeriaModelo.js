const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const EvaluacionEf = sequelize.define('EvaluacionEf', {

    ID_eva: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ID_Profesional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Necesidades_basicas: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Acciones_inm: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Medicacion_inicial: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    timestamps: false,
    tableName: 'evaluacion_enfermeria'
});

module.exports = EvaluacionEf