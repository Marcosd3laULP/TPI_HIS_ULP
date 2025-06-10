const { DataTypes } = require('sequelize');
const sequelize = require('../baseDatos/bd'); // Asegúrate de que esta ruta sea correcta

const ObraPaciente = sequelize.define('obra_pacientes', {
    ID_obra: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    Nombre: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    NumSocial: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false, 
    tableName: 'obra_pacientes', 
});

module.exports = ObraPaciente;