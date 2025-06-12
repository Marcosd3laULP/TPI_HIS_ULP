 let timerError;

const mostrarError = (mensaje) => {
  const divError = document.getElementById("mensajeError");
  const spanTexto = document.getElementById("textoError");
  const btnCerrar = document.getElementById("cerrarError");


  spanTexto.textContent = mensaje;
  divError.classList.remove("hidden");


  if (timerError) clearTimeout(timerError);


  timerError = setTimeout(() => {
    divError.classList.add("hidden");
  }, 5000);


  btnCerrar.onclick = () => {
    divError.classList.add("hidden");
    if (timerError) clearTimeout(timerError);
  };
};

document.querySelectorAll(".ala-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const idAla = btn.dataset.id;
    const contenedor = document.getElementById("habitaciones");
    contenedor.innerHTML = "";

    try {
      const habRes = await fetch(`/api/habitaciones/${idAla}`);
      const habitaciones = await habRes.json();

      for (const hab of habitaciones) {
        const camasRes = await fetch(`/api/camas/habitacion/${hab.ID_hab}`);
        const camas = await camasRes.json();

        const habDiv = document.createElement("div");
        habDiv.className = "border rounded-lg bg-gray-100 p-6 mb-8 shadow-lg";

        habDiv.innerHTML = `
          <h4 class="text-2xl font-bold mb-4 text-blue-800">
            Habitación N° ${hab.numero} <span class="text-sm text-gray-600">(Capacidad: ${hab.capacidad})</span>
          </h4>
          <div class="camas grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"></div>
        `;

        const camasContenedor = habDiv.querySelector(".camas");

        camas.forEach((cama) => {
          const camaDiv = document.createElement("div");
          camaDiv.className = `rounded-md p-4 border shadow-md bg-white flex flex-col justify-between ${
            cama.Estado === "Libre" ? "border-green-300" : "border-red-300"
          }`;

          camaDiv.innerHTML = `
            <p class="text-base"><strong>N°:</strong> ${cama.Numero}</p>
            <p class="text-base"><strong>Estado:</strong> ${cama.Estado}</p>
            <p class="text-base"><strong>Sexo:</strong> ${cama.Sexo_ocupante || "N/A"}</p>
            ${
              cama.Estado === "Libre"
                ? `<button 
                    class="mt-3 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    onclick="mostrarFormulario(${cama.ID_cama})">
                    Asignar
                   </button>`
                : ""
            }
          `;

          camasContenedor.appendChild(camaDiv);
        });

        contenedor.appendChild(habDiv);
      }
    } catch (error) {
      console.error("Error al cargar habitaciones y camas:", error);
      contenedor.innerHTML = "<p class='text-red-600'>Error al cargar habitaciones.</p>";
    }
  });
});

// Mostrar formulario modal
window.mostrarFormulario = async function (idCama) {
  const sexoPaciente = document.getElementById("paciente-info").dataset.sexo?.trim().toLowerCase();
  const idPaciente = document.getElementById("paciente-info").dataset.idPaciente;

  try {
    const res = await fetch(`/api/verificar-sexo/${idCama}/${sexoPaciente}`);

    if (!res.ok) {
      const errorData = await res.json();
      mostrarError(errorData.error || "Error inesperado desde el servidor");
      return;
    }

    const data = await res.json();

    const esCompatible = Boolean(data?.compatible) === true;

    if (esCompatible) {
      document.getElementById("mensajeError").classList.add("hidden");

      const modal = document.getElementById("modalMotivo");
      modal.classList.remove("hidden");

      document.getElementById("inputIdCama").value = idCama;
      document.getElementById("inputIdPaciente").value = idPaciente;

    } else {
      mostrarError("No se puede internar en esta habitación: hay un paciente de sexo diferente.");
    }
  } catch (error) {
    mostrarError("Ocurrió un error al verificar compatibilidad.");
  }
};





document.getElementById("cancelarBtn").addEventListener("click", () => {
  const modal = document.getElementById("modalMotivo");
  modal.classList.add("hidden");
  document.getElementById("inputMotivo").value = "";
  document.getElementById("inputFecha").value = ""; 
});
