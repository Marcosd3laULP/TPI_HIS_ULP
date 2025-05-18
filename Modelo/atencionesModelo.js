const   sequelize  = require("../baseDatos/bd");
const { DataTypes } = require("sequelize");

const Atenciones = sequelize.define('Atenciones', {

    ID_paciente: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    ID_Profesional: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },

    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Motivo: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: "atenciones"
});

module.exports = Atenciones;