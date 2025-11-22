const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const ResultadoEst = sequelize.define('ResultadoEst', {

    IdResultado: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    idPedido: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    InformeTextual: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: 'resultadoestudio'
});

module.exports = ResultadoEst