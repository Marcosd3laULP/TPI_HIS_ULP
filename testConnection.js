// testConnection.js
const sequelize = require('./baseDatos/bd'); // Ajusta la ruta según tu estructura

async function test() {
  try {
    await sequelize.authenticate();
    console.log('✅ Conexión exitosa a MySQL en Railway');

    // Opcional: Listar las tablas para confirmar que todo funciona
    const [results] = await sequelize.query('SHOW TABLES;');
    console.log('📊 Tablas en la base de datos:', results);
  } catch (error) {
    console.error('❌ Error de conexión:', error);
  } finally {
    await sequelize.close(); // Cierra la conexión después de la prueba
  }
}

test();