const { DataTypes } = require("sequelize");
const sequelize = require("../baseDatos/bd");


const Antecedente = sequelize.define('Antecedente', {

    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ID_Paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
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
    tableName: "antecedentes_paciente"
});

module.exports = Antecedente;