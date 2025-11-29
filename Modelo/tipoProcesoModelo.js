const { DataTypes } = require("sequelize");
const sequelize = require ("../baseDatos/bd");

const Proceso = sequelize.define('Proceso', {

    IdTipoProceso: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    Nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },

      Descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    },
    
    Categoria: {
        type: DataTypes.STRING,
        allowNull: false
    }

},{
    timestamps: false,
    tableName: 'tipoproceso'
});

module.exports = Proceso