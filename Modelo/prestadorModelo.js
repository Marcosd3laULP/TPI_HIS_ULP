const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../baseDatos/bd");

const Prestador = sequelize.define("Prestador", {

    ID_Profesional: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    Apellido: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Rol: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Especialidad: {
        type: DataTypes.STRING,
        allowNull: true
    }
    },{
        timestamps: false, 
        freezeTableName: true,
        tableName: "profesionalessalud"
});

module.exports = { Prestador };