const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Ala = sequelize.define("Ala", {

    ID_ala: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Sector: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Ubicacion: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    tableName: "ala"

});

module.exports = Ala;