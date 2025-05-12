const express = require("express");
const router = express.Router();
const pacienteControl = require("../Control/pacienteControl");

// Página principal de pacientes (menú u opciones)
router.get("/", pacienteControl.mostrarOpPaciente);

// Mostrar formulario de admisión (vista pug)
router.get("/admision", (req, res) => {
    res.render("ingresoPaciente"); // Asegúrate de que exista esta vista
});

// Registrar nuevo paciente
router.post("/admision", async (req, res) => {
     
    try {
        console.log("Datos recibidos para registrar paciente:", req.body);
        const errores = await pacienteControl.validarDatos(req.body);
        if (Object.keys(errores).length > 0) {
            return res.status(400).render("ingresoPaciente", { errores, paciente: req.body });
        }
        console.log("Intentando insertar paciente...");
        await pacienteControl.cargarPaciente(req.body);
        res.redirect("/pacientes/lista");

    } catch (error) {
        console.error("Error al insertar paciente:", error.message);
        res.status(500).send("Error del servidor");
    }
});

// Listado de pacientes
router.get("/lista", async (req, res) => {
    try {
        const pacientes = await pacienteControl.obtenerPacientes();
        res.render("listaPaciente", { pacientes });
    } catch (error) {
        console.error("Error al listar pacientes:", error.message);
        res.status(500).send("No se pudo obtener la lista");
    }
});

// Formulario de edición de paciente
router.get("/edicion/:id", async (req, res) => {
    try {
        const paciente = await pacienteControl.buscarPacientePorId(req.params.id);
        res.render("editarPaciente", { elPaciente: paciente });
    } catch (error) {
        res.status(404).send("Paciente no encontrado");
    }
});

// Guardar cambios de edición
router.post("/edicion/:id", async (req, res) => {
    try {
        await pacienteControl.actualizarPaciente(req.params.id, req.body);
        res.redirect("/pacientes/lista");
    } catch (error) {
        res.status(500).send("No se pudo actualizar el paciente");
    }
});

module.exports = router;
