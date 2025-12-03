const {Sequelize, DataTypes} = require('sequelize');
const sequelize = require("../baseDatos/bd");

const User = sequelize.define('User', {
    ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true, validate: {isEmail: true}
    },

    PassHash: {
        type: DataTypes.STRING,
        allowNull: false
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
        type: DataTypes.ENUM('recepcion', 'enfermero','medico', 'admin'),
        allowNull: false,
        defaultValue: 'recepcion'
    }
},{
    timestamps: false,
    tableName: "usuario"
});

module.exports = User