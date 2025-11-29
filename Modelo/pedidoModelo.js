const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const PedidoMed = sequelize.define('PedidoMed', {

    IdPedido: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    IDMedEva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    
    ID_Profesional: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    ID_tipoEstudio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Prioridad: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Indicaciones: {
        type: DataTypes.STRING,
        allowNull: true
    },

    Estado: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: 'pedidodiagnostico'
});

module.exports = PedidoMed