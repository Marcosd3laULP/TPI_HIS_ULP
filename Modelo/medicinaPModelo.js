const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const Medicina = sequelize.define('Medicina', {

    ID_med: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ID_Paciente: {
    type: DataTypes.INTEGER,
    allowNull: false
    },

    Medicina: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Origen: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Estado: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: "medicina_paciente"
});

module.exports = Medicina;