const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const TraYTer = sequelize.define("TraYTer", {

    IdTraYTer: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    ID_internacion: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    IDMedEva: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    IdTipoProceso: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    FechaInicio: {
        type: DataTypes.DATE,
        allowNull: false
    },
    
    FechaFin: {
        type: DataTypes.DATE,
        allowNull: false
    },

    Observaciones: {
        type: DataTypes.STRING,
        allowNull: false
    },

    Estado: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: 'tratamientoyterapia'
});

module.exports = TraYTer