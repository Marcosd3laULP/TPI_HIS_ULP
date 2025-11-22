const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const Estudio = sequelize.define('Estudio', {

    ID_tipoEstudio: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    
    Categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },

    RequierePreparacion: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },

    Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }

},{
    timestamps: false,
    tableName: 'tipoestudio'
});

module.exports = Estudio