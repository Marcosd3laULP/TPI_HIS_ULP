const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const Medicina = sequelize.define('Medicina', {

    ID_med: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Medicina: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Origen: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    timestamps: false,
    tableName: "medicina_paciente"
});

module.exports = Medicina;