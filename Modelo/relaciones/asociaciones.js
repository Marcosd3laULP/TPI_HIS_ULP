const Paciente = require("../pacienteModelo");
const Turno = require("../turnoModelo");
const Prestador = require("../prestadorModelo");
const Informe = require("../informeModelo");
const Atenciones = require("../atencionesModelo");
const Habitacion = require("../habModelo");
const Cama = require("../camasModelo");
const Internacion = require("../internacionModelo");
const Ala = require("../alaModelo");
const Traslado = require("../trasladoModelo");
const EvaluacionEf = require("../evaEnfermeriaModelo");
const Medicina = require("../medicinaPModelo");
const ObservacionF = require("../obsEnfermeroModelo");
const Antecedente = require("../antecedenteModelo");

//EVALUACION E INTERNACION Y PROFESIONAL:
Internacion.hasMany(EvaluacionEf, { foreignKey: 'ID_internacion', as: 'Evaluaciones' });
EvaluacionEf.belongsTo(Internacion, { foreignKey: 'ID_internacion', as: 'Internacion' });

Prestador.hasMany(EvaluacionEf, { foreignKey: 'ID_Profesional', as: 'EvaluacionesRealizadas' });
EvaluacionEf.belongsTo(Prestador, { foreignKey: 'ID_Profesional', as: 'Profesional' });

//MEDICINA Y PACIENTE:
Paciente.hasMany(Medicina, {foreignKey: "ID_paciente", as: "Medicinas"});
Medicina.belongsTo(Paciente, {foreignKey: "ID_paciente", as: "Paciente"});

//ANTECEDENTES Y PACIENTE:
Paciente.hasMany(Antecedente, {foreignKey: "ID_paciente", as: "Antecedentes"});
Antecedente.belongsTo(Paciente, {foreignKey: "ID_paciente", as: "Paciente"});

//OBSERVACIONES E INTERNACION:
Internacion.hasMany(ObservacionF, {foreignKey: "ID_internacion", as: "Observaciones"});
ObservacionF.belongsTo(Internacion, {foreignKey: "ID_internacion", as: "Internacion"});

// TRASLADO E INTERNACION:
Internacion.hasMany(Traslado, { foreignKey: 'ID_internacion', as: "Traslados" });
Traslado.belongsTo(Internacion, { foreignKey: 'ID_internacion', as: "Internacion" });

// TRASLADO Y HABITACION:
Cama.hasMany(Traslado, { foreignKey: 'ID_cama', as: "Traslados" });
Traslado.belongsTo(Cama, { foreignKey: 'ID_cama', as: "Cama" });

//ALA Y HABITACION:
Ala.hasMany(Habitacion, { foreignKey: 'ID_ala', as: "Habs" });
Habitacion.belongsTo(Ala, { foreignKey: 'ID_ala', as: "Ala" });

//HABITACION Y CAMAS:
Habitacion.hasMany(Cama, { foreignKey: 'ID_hab', as: "Camas" });
Cama.belongsTo(Habitacion, { foreignKey: 'ID_hab', as: "Hab" });

//PACIENTE E INTERNACION:
Paciente.hasMany(Internacion, { foreignKey: 'ID_paciente', as: "Internaciones" });
Internacion.belongsTo(Paciente, { foreignKey: 'ID_paciente', as: "Paciente" });

//CAMAS E INTERNACION:
Cama.hasMany(Internacion, { foreignKey: 'ID_cama', as: "Internaciones" });
Internacion.belongsTo(Cama, { foreignKey: 'ID_cama', as: "Cama" });

//PACIENTE Y TURNO:
Paciente.hasMany(Turno, {foreignKey: "ID_paciente", as: 'Turnos' }); //RELACION 1 A N PACIENTE LE PASA SU CLAVE A TURNO COMO FORANEA
Turno.belongsTo(Paciente,{ foreignKey: "ID_paciente",  as: 'Paciente'}); // RELACION 1 A N TURNOS LLEVA LA FORANEA

//PRESTADOR Y TURNO
Prestador.hasMany(Turno, {foreignKey: "ID_Profesional", as: "Turnos"});
Turno.belongsTo(Prestador, {foreignKey: "ID_Profesional", as: "Prestador"});

//PRESTADOR E INFORME
Prestador.hasMany(Informe, {foreignKey: "ID_Profesional"}); // RELACION 1 A N PRESTADOR LE DA COMO FORANEA SU CLAVE A INFORMES
Informe.belongsTo(Prestador, {foreignKey: "ID_Profesional"}); //RELACION 1 A N INFORME TIENE DE FORANEA EL ID DE PRESTADOR

Paciente.hasMany(Informe, {foreignKey: "ID_paciente",as: "Informes"});

Informe.belongsTo(Paciente, {foreignKey: "ID_paciente", as: "Paciente"});

Paciente.belongsToMany(Prestador, {
  through: Atenciones,
  foreignKey: "ID_paciente",
  otherKey: "ID_Profesional",
  as: "Prestadores",
});

Prestador.belongsToMany(Paciente, {
  through: Atenciones,
  foreignKey: "ID_Profesional",
  otherKey: "ID_paciente",
  as: "Pacientes", // ← corregido el alias
});

// Relación directa entre Paciente y Atenciones
Paciente.hasMany(Atenciones, { foreignKey: "ID_paciente", as: "Atenciones" });
Atenciones.belongsTo(Paciente, { foreignKey: "ID_paciente", as: "Paciente" });

// Relación directa entre Prestador y Atenciones
Prestador.hasMany(Atenciones, { foreignKey: "ID_Profesional", as: "Atenciones" });
Atenciones.belongsTo(Prestador, { foreignKey: "ID_Profesional", as: "Prestador" });

module.exports ={
    Paciente,
    Turno,
    Prestador,
    Informe,
    Atenciones,
    Ala,
    Cama,
    Internacion,
    Traslado,
    Habitacion,
    ObservacionF,
    Medicina,
    EvaluacionEf,
    Antecedente
}