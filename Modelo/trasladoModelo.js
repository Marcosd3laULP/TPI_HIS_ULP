const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Traslado = sequelize.define("Traslado", {
  ID_traslado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },

  Fecha_traslado: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  Responsable: {
    type: DataTypes.STRING,
    allowNull: false
  },

  Motivo: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  timestamps: false,
  tableName: "traslados"
});

module.exports = Traslado;
