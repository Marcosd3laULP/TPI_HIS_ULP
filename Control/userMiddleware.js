const {body, validationResult } = require("express-validator");

exports.checkNotLoggedIn = (req, res, next) => {
    if(req.session.user) {
        return res.redirect("/")
    }
    next();
};

exports.checkLoggedIn = (req, res, next) => {
    if(!req.session.user) {
        return res.redirect("/login");
    }
    next();
};

exports.validateLoginData = [
    body("Email")
        .isEmail()
        .withMessage("El formato del email es inválido"),

    body("Contrasenia")
        .notEmpty()
        .withMessage("La contraseña es obligatoria"),

    // Middleware final para capturar errores
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.render("login", {
                error: errors.array()[0].msg,
                csrfToken: req.csrfToken()
            });
        }
        next();
    }
];

exports.checkRole = (...rolesPermitidos) => {
    return (req, res, next) => {
        if (!req.session.user) {
            return res.redirect("/login");
        }

        const rol = req.session.user.Rol;

        if (!rolesPermitidos.includes(rol)) {
            return res.status(403).send("No tienes permiso para acceder a esta sección");
        }

        next();
    };
};