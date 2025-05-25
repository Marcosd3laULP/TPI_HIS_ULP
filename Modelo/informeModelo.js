const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Informe = sequelize.define("Informe", {

    Nro_historial: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

    Diagnostico: {
        type: DataTypes.STRING,
        allowNull: true
    },

    descripcion: {
        type: DataTypes.STRING,
        allowNull: true
    }
},{
    timestamps: false,
    tableName: "informes"

});

module.exports = Informe;