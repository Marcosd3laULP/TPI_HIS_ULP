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
    ObraSocial: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Particular'
    },

    NumSocial: {
        type: DataTypes.STRING,
        allowNull: true
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
        allowNull: false,
        defaultValue: false
    },
    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
    }

},{
    timestamps: false,
    tableName: "turnos"
});

module.exports = Turno;