const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize("his_bd", "root", "", {
    host: "localHost",
    port:  3306,
    dialect: "mysql",
    logging: false,
    timezone: '-03:00'
  }
);

module.exports = sequelize;