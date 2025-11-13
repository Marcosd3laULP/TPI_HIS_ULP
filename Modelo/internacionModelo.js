const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Internacion = sequelize.define("Internacion", {
    ID_internacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    ID_Paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
    },

    Fecha_ingreso: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Activo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }


}, {
    timestamps: false,
    tableName: "internacion"
});

module.exports = Internacion;
