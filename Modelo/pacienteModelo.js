const { error } = require('console');
const fs = require('fs');
const path = require('path');
const rutaAlJSON = path.join(__dirname, '../Paciente.json');

//Obtener todos los pacientes
async function obtenerPacientes() {
    try {
        const datos =  await fs.promises.readFile(rutaAlJSON, "utf-8");
        return JSON.parse(datos);
    } catch (error) {
        console.error("Error real al leer el JSON:", error.message);
        throw Error ("No pudo leerse el JSON");
    }
}

//Actualizar cargando los nuevos pacientes a una lista
async function guardarPacientes(pacientes) {
    try {
        await fs.promises.writeFile(rutaAlJSON, JSON.stringify(pacientes, null, 2));
    } catch (error) {
        throw new Error("No pudo guardarse los pacientes");
    }
}

async function cargarPaciente(nuevoPaciente) {
    try {
        const pacientes = await obtenerPacientes();
        pacientes.push(nuevoPaciente);
        await guardarPacientes(pacientes);
    } catch (error) {
        console.error("Error al cargar paciente:", error.message);
        throw new Error ("Hubo un error al cargar el nuevo paciente");
    }
}

//VALIDAR DATOS DEL PACIENTE:
function validarDatos(paciente){
        if (!paciente) {
          throw new Error("Se esperaba un objeto paciente y no se recibió ninguno");
        }
    
    const errores = {}

    if(!paciente.nombre || paciente.nombre.trim === ''){
        errores.nombre = "Debe ingresar un nombre valido";
    }

    if(isNaN(paciente.edad) || paciente.edad < 0){
        errores.edad = "Debe ingresar una edad valida";
    }

    if(paciente.sexo !== "masculino" || paciente.sexo !== "femenino"){
        errores.sexo = "sexo no valido";
    }

    if(!paciente.domicilio === ''){
        errores.domicilio = 'El domicilio no puede estar vacio';
    }

    if(!paciente.telefono || isNaN(paciente.telefono)){
        errores.telefono = "Telefono no valido"
    }

    return errores
}

//Buscar paciente por id:
async function buscarPacientePorId(id) {
    try {
        const pacientes = await obtenerPacientes();
        return pacientes.find(p => p.id === id);
    } catch (error) {
        throw new Error ("No se pudo hallar el paciente");
    }
}

//Actualizar datos de paciente:
async function ActualizarPaciente(id, nuevosDatos) {
    try {
        const pacientes = await obtenerPacientes();
        const indice = pacientes.findIndex(p => p.id === id);

        if(indice === -1){
            throw new error ("No se pudo hallar el paciente");
        }

        pacientes[indice] = {...pacientes[indice], ...nuevosDatos}
        await guardarPacientes();
    } catch (error) {
        throw new error ("No se pudo guardar el paciente");
    }
}

module.exports = {
    obtenerPacientes,
    guardarPacientes,
    cargarPaciente,
    buscarPacientePorId,
    ActualizarPaciente,
    validarDatos
};