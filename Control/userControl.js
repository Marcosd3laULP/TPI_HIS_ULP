const sequelize = require("../baseDatos/bd");
const User = require("../Modelo/usuarioModelo");
const bcrypt = require("bcrypt");


//Render para el login
exports.vistaLogin = async function (req, res) {
    const sector = req.query.sector || null;
    res.render("login", {
        csrfToken: req.csrfToken(),
        sector
    });
}

//POST para el login (procesa los datos)
exports.ValidarLogin = async function (req, res) {
    const { Email, Contrasenia, sector } = req.body;

    try {
        const user = await User.findOne({ where: { Email } });

        if (!user) {
            return res.render("login", {
                error: "Email o contraseña incorrectos",
                csrfToken: req.csrfToken(),
                sector
            });
        }

        const match = await bcrypt.compare(Contrasenia, user.PassHash);
        if (!match) {
            return res.render("login", {
                error: "Contraseña incorrecta",
                csrfToken: req.csrfToken(),
                sector
            });
        }

        // Validación de sector obligatorio
        if (!sector) {
            return res.render("login", {
                error: "No se seleccionó un sector.",
                csrfToken: req.csrfToken()
            });
        }

        //  Validación de rol – sector
        // usuario.Rol puede ser: "recepcion", "enfermeria", "medico", "admin"
        if (user.Rol !== sector) {
            return res.render("login", {
                error: `No tiene permisos para ingresar al sector "${sector}".`,
                csrfToken: req.csrfToken(),
                sector
            });
        }

        // LOGIN EXITOSO – Guardamos la sesión
        req.session.user = {
            ID: user.ID,
            Nombre: user.Nombre,
            Apellido: user.Apellido,
            Rol: user.Rol,
            Email: user.Email
        };

        let destino = "/";
        switch (user.Rol) {
            case "recepcion":
                destino = "/pacientes";
                break;
            case "enfermero":
                destino = "/enfermeria/seccionEnf";
                break;
            case "medico":
                destino = "/prestador/medicos";
                break;
            case "admin":
                destino = "/admin";  
                break;
        }

        return res.redirect(destino);

    } catch (err) {
        console.error(err);
        return res.status(500).send("Error interno en el servidor");
    }
};


// GET - Logout
exports.SalirDeSesion = function(req, res) {
    req.session.destroy(() => {
        res.redirect("/");
    });
}
