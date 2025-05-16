const { Prestador } = require("../Modelo/relaciones/asociaciones");

exports.mostrarOpPrestador = function(req, res){
    res.render("prestadores");
};


exports.formularioNuevoPrestador = function(req, res){
    res.render("nuevoPrestador");
}

exports.formularioEditarPrestador = async function (req, res) {
    try {
        const id = req.params.id
        console.log("id recibido: " + id);
        const profesional = await buscarPrestadorId(id);
        console.log("prestador encontrado: " + profesional);
        if(!profesional){
            throw new Error("No se pudo hallar al prestador");
            
        }

        res.render("editarPrestador", { profesional }); 
    } catch (error) {
        console.log("Ocurrio un error al buscar el prestador " + error.message);
         throw new Error("Ocurrio un fallo en traer al prestador..." + error.message);
    } 
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

async function buscarPrestadorId (id) { //exports no puede ir aca ANOTA EL PORQUE
    try {
        const prestador = await Prestador.findByPk(id);
        console.log("buscando a prestador con id " + id);
        if(!prestador){
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

        await Prestador.create(datos);
        res.redirect("listaPrestador");
    } catch (error) {
        console.log("No se pudo insertar el nuevo prestador... " + error.message);
        res.render("nuevoPrestador", { //ANOTA EL PORQUE DE ESTO
            error: error.message, //COMO TRABAJA CON EL IF DE LA VISTA
            datos: req.body //ESTO LO QUE HACE ES MANTENER LOS DATOS Y EVITAMOS VOLVERLOS A ESCRIBIR
        });
    }
    
}

exports.actualizarPrestador = async function (req, res) {
    try {
        const id = req.params.id;
        const datos = req.body;

        if(datos.Nombre.trim() === ""){
            throw new Error("Nombre no valido");
        }

         if(datos.Apellido.trim() === ""){
            throw new Error("Apellido no valido");
        }
         
        if(datos.Rol.trim() === ""){
            throw new Error("Debe definir un rol");
        }
        
        const [prestadorEditado] = await Prestador.update(datos, {
            where: {ID_Profesional: id}
        });

        if(prestadorEditado === 0){
            throw new Error("No se pudo hallar el prestador o no se pudo hacer los cambios");
            
        }

        res.redirect("/prestador/listaPrestador"); //Aqui antes era "prestador/listaPrestador"
    } catch (error) {
        console.log ("Ocurrio un error y fue este: " + error.message);
        //throw new Error("Hubo un error al querer actualizar los datos");
         res.render("editarPrestador", { //ANOTA EL PORQUE DE ESTO
            error: error.message, //COMO TRABAJA CON EL IF DE LA VISTA
            datos: req.body, //ESTO LO QUE HACE ES MANTENER LOS DATOS Y EVITAMOS VOLVERLOS A ESCRIBIR
            profesional: { ID_Profesional: req.params.id } //ESTE ES IMPORATNTE PORQUE SINO CRASHEA
        });
        
    }
};