const {Sequelize} = require('sequelize');

const sequelize = new Sequelize('his_bd', 'root', '', {
host: "localhost",
dialect: "mysql",
});
module.exports = sequelize;
