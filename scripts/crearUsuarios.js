const bcrypt = require("bcrypt");
const User = require("../Modelo/usuarioModelo");
const sequelize = require("../baseDatos/bd");

async function crearUsuarios() {
    try {
        await sequelize.authenticate();
        console.log("Conexión establecida.");

        const passHash = await bcrypt.hash("1234", 10);

        const usuarios = [
            {
                Email: "recepcion@test.com",
                PassHash: passHash,
                Nombre: "Ana",
                Apellido: "Lopez",
                Rol: "recepcion"
            },
            {
                Email: "enfermero@test.com",
                PassHash: passHash,
                Nombre: "Carlos",
                Apellido: "Gomez",
                Rol: "enfermero"
            },
            {
                Email: "medico@test.com",
                PassHash: passHash,
                Nombre: "Laura",
                Apellido: "Martinez",
                Rol: "medico"
            },
            {
                Email: "admin@test.com",
                PassHash: passHash,
                Nombre: "Juan",
                Apellido: "Perez",
                Rol: "admin"
            }
        ];

        for (const u of usuarios) {
            await User.create(u);
        }

        console.log("Usuarios creados correctamente.");
        process.exit();

    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
}

crearUsuarios();
