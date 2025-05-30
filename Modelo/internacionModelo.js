const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Internacion = sequelize.define("Internacion", {
    ID_internacion: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Fecha_ingreso: {
        type: DataTypes.DATEONLY,
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
