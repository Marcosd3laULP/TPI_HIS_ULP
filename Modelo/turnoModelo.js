const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../baseDatos/bd");
const Paciente  = require("./pacienteModelo");

const Turno = sequelize.define("Turno", {

    Nro_turno: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Motivo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Es_tomado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: "turnos"
});

module.exports = Turno;