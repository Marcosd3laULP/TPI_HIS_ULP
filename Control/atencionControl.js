const { Paciente, Atenciones } = require('../Modelo/relaciones/asociaciones');

// Obtener todas las atenciones con datos de pacientes
exports.obtenerAtencionesConPacientes = async function(req, res) {
    try {
        const atenciones = await Atenciones.findAll({
            include: [{
                model: Paciente,
                as: "Pacientes",
                attributes: ['ID_paciente', 'Nombre', 'Apellido', 'DNI', 'Telefono']
            }]  
        });

        res.render("medicos/pacienteTurnos", { atenciones });
    } catch (error) {
        console.error("Error al obtener atenciones:", error.message);
        res.status(500).render("pacienteTurnos", {
            error: "Error al cargar el historial de atenciones",
        });
    }
};
