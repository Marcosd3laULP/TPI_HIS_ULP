const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const EvaluacionMed = sequelize.define('EvaluacionMed', {

    IDMedEva: {
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

    Sintomas: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Diag_teorico: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Diag_real: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Medicina: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Indicaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    timestamps: false,
    tableName: 'evaluacion_medica'
});

module.exports = EvaluacionMed