const Paciente = require("../pacienteModelo");
const Turno = require("../turnoModelo");
const Prestador = require("../prestadorModelo");
const Informe = require("../informeModelo");
const Atenciones = require("../atencionesModelo");

//PACIENTE Y TURNO:
Paciente.hasMany(Turno, {foreignKey: "ID_paciente", as: 'Turnos' }); //RELACION 1 A N PACIENTE LE PASA SU CLAVE A TURNO COMO FORANEA
Turno.belongsTo(Paciente,{ foreignKey: "ID_paciente",  as: 'Paciente'}); // RELACION 1 A N TURNOS LLEVA LA FORANEA

//PRESTADOR Y TURNO
Prestador.hasMany(Turno, {foreignKey: "ID_Profesional", as: "Turnos"});
Turno.belongsTo(Prestador, {foreignKey: "ID_Profesional", as: "Prestador"});

//PRESTADOR E INFORME
Prestador.hasMany(Informe, {foreignKey: "ID_Profesional"}); // RELACION 1 A N PRESTADOR LE DA COMO FORANEA SU CLAVE A INFORMES
Informe.belongsTo(Prestador, {foreignKey: "ID_Prfesional"}); //RELACION 1 A N INFORME TIENE DE FORANEA EL ID DE PRESTADOR

Paciente.belongsToMany(Prestador, {
    through: 'Atenciones',
    foreignKey: 'ID_paciente',
    otherKey: 'ID_Profesional',
    as: 'Prestadores'
});

Prestador.belongsToMany(Paciente, {
    through: 'Atenciones',
    foreignKey: 'ID_Profesional',
    otherKey: 'ID_paciente',
    as: 'Pacientes'
});

module.exports ={
    Paciente,
    Turno,
    Prestador,
    Informe,
    Atenciones
}