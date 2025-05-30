const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Habitacion = sequelize.define("Habitacion", {
    ID_hab: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    capacidad: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    timestamps: false,
    tableName: "habitacion"
});

module.exports = Habitacion;
