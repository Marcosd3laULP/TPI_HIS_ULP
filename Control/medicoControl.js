const { Prestador } = require("../Modelo/prestadorModelo");

exports.mostrarOpPrestador = function(req, res){
    res.render("prestadores");
};

/*exports.listaDePrestadores = function(req, res){
    res.render("listaPrestador");
}*/

exports.formularioNuevoPrestador = function(req, res){
    res.render("nuevoPrestador");
}

//El metodo buscar todos los medicos y enfermeros:
//ANOTA ESTO QUE ES NUEVO Y GENIAL :D
exports.buscarTodoPrestador = async function (req, res) {
    try {
        const prestadores = await Prestador.findAll();
        const medicos = prestadores.map(p => p.toJSON());
        //console.log(medicos);
        res.render('listaPrestador', { medicos });
    } catch (error) {
        console.log("Error al querer buscar todos los prestadores: " + error.message);
        throw new Error("Ocurrio un fallo en traer a los prestadores...");
            }
};

exports.buscarPrestadorId = async function (id) {
    try {
        const prestador = await Prestador.findByPK(id);
        if(!prestadores){
            throw new Error("No se pudo hallar el prestador...");    
        }
        return prestador.toJSON();
    } catch (error) {
        console.log("No se pudo hallar el prestador por: " + error.message);
        throw new Error("Hubo un fallo en buscar al prestador...");
    }
}

exports.insertarPrestador = async function (req, res) {
    try {
        const datos = req.body;

        if(datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

        if(datos.Apellido.trim() === ""){
            throw new Error("Apellido no valido");
        }

        if(datos.Rol.trim() === ""){
            throw new Error("Rol no valido");
        }

        const prestadorNuevo = Prestador.create(datos);
        res.redirect("listaPrestador");
    } catch (error) {
        console.log("No se pudo insertar el nuevo prestador... " + error.message);
        res.render("nuevoPrestador", { //ANOTA EL PORQUE DE ESTO
            error: error.message, //COMO TRABAJA CON EL IF DE LA VISTA
            datos: req.body //ESTO LO QUE HACE ES MANTENER LOS DATOS Y EVITAMOS VOLVERLOS A ESCRIBIR
        });
    }
    
}

exports.actualizarPrestador = async function (id, nuevosDatos) {
    try {
        const [prestadorEditado] = await Prestador.update(nuevosDatos, {
            where: {ID_Profesional: id}
        });

        if(prestadorEditado === 0){
            throw new Error("No se pudo hallar el prestador o no se pudo hacer los cambios");
            
        }

        return "prestador correctamente actualizado";
    } catch (error) {
        console.log ("Ocurrio un error y fue este: " + error.message);
        throw new Error("Hubo un error al querer actualizar los datos");
        
    }
}