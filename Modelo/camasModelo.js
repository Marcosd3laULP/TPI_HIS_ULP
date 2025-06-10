const sequelize = require('../baseDatos/bd');
const { DataTypes } = require('sequelize');

const Cama = sequelize.define("Cama", {
     ID_hab: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'ID_hab',
        references: {
            model: 'habitación',
            key: 'ID_hab'
        }
    },
    ID_cama: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },

   
    Numero: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    Estado: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'libre'
    },

    Sexo_ocupante: {
        type: DataTypes.STRING,
        allowNull: true
    }

}, {
    timestamps: false,
    tableName: "camas"
});

module.exports = Cama;
