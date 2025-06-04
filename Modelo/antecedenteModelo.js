const { DataTypes } = require("sequelize");
const sequelize = require("../baseDatos/bd");


const Antecedente = sequelize.define('Antecedente', {

    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Enfermedad: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Tipo: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Observaciones: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    tableName: "antecendentes_paciente"
});

module.exports = Antecedente;