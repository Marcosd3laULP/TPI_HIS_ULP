const { Sequelize } = require('sequelize');
require('dotenv').config(); // Carga las variables del .env

const sequelize = new Sequelize(
  process.env.DB_NAME || 'railway',     // Nombre de la BD
  process.env.DB_USER || 'root',        // Usuario
  process.env.DB_PASSWORD || '',        // Contraseña
  {
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: false, // Opcional: desactiva logs de SQL en consola
  }
);

module.exports = sequelize;