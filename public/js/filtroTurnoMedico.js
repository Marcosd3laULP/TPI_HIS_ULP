document.addEventListener("DOMContentLoaded", function () {
    const checkboxID = document.getElementById("filtrarID");
    const divDelInput = document.getElementById("filtroIDContainer");
    const inputId = document.getElementById("inputIDMedico");
    const selector = document.getElementById("ID_prestador");

const opcionesOriginales = Array.from(selector.options).slice(1) //Recuperamos todas las opciones menos el "--seleccione--"

checkboxID.addEventListener("change", ()=>{
if(checkboxID.checked){
    divDelInput.classList.remove("hidden");
}else{
    divDelInput.classList.add("hidden");
    inputId.value= "";
    restaurarOpciones();
}

});

inputId.addEventListener("input", ()=>{
    const valor = inputId.value.trim();

    if(valor === ""){
        restaurarOpciones();
        return;
    }

    const opFiltradas = opcionesOriginales.filter(op => {
        const id = op.getAttribute("data-id");
        return id && id.includes(valor);
    });

    actualizarOpciones(opFiltradas);
});


 function restaurarOpciones(){
     actualizarOpciones(opcionesOriginales);
}

function actualizarOpciones(nuevasOp) {
    selector.options.length = 1; //Reducimos las opciones exceptuando la primera (el place holder)
     nuevasOp.forEach(op => {
        selector.appendChild(op.cloneNode(true));
    });
}

});