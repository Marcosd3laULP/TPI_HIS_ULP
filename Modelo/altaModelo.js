const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const AltaHospitalaria = sequelize.define(
    "AltaHospitalaria",
    {
        ID_alta: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        ID_internacion: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Fecha_alta: {
            type: DataTypes.DATE, 
            allowNull: false
        },
        Motivo: {
            type: DataTypes.STRING(255),
            allowNull: false
        },
        Observaciones: {
            type: DataTypes.TEXT
        },
        ID_Profesional: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        Estado_final: {
            type: DataTypes.STRING(100)
        }
    },
    {
        tableName: "alta_hospitalaria",
        timestamps: false
    }
);

module.exports = AltaHospitalaria;