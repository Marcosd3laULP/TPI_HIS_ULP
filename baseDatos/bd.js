const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME || 'railway',     
  process.env.DB_USER || 'root',        
  process.env.DB_PASSWORD || '',        
  {
    host: process.env.DB_HOST || 'mysql.railway.internal',
    port: process.env.DB_PORT || 3306,
    dialect: process.env.DB_DIALECT,
    dialectModule: require("mysql2"),
    logging: false, 
  }
);

module.exports = sequelize;