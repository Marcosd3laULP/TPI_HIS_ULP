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
window.mostrarFormulario = function (idCama) {
  const modal = document.getElementById("modalMotivo");
  modal.classList.remove("hidden");

  const form = document.getElementById("formMotivo");
  form.dataset.idCama = idCama;
};

// Enviar internación
document.getElementById("formMotivo").addEventListener("submit", async (e) => {
  e.preventDefault();

  const idCama = e.target.dataset.idCama;
  const motivo = document.getElementById("inputMotivo").value;
  const idPaciente = document.getElementById("idPaciente").value;

  try {
    const res = await fetch("/pacientes/internaciones/realizar-internacion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        idPaciente,
        idCama,
        motivo
      })
    });

    if (res.ok) {
      window.location.href = "/pacientes/internaciones/lista-internados";
    } else {
      alert("Error al asignar internación.");
    }
  } catch (err) {
    console.error("Error en el envío:", err);
  }
});

// Cerrar el modal
document.getElementById("cancelarBtn").addEventListener("click", () => {
  const modal = document.getElementById("modalMotivo");
  modal.classList.add("hidden");
  document.getElementById("inputMotivo").value = "";
});
