document.querySelectorAll(".ala-btn").forEach((btn) => {
  btn.addEventListener("click", async () => {
    const idAla = btn.dataset.id;
    const contenedor = document.getElementById("habitaciones");
    contenedor.innerHTML = ""; // Limpiar contenido anterior

    try {
      const habRes = await fetch(`/api/habitaciones/${idAla}`);
      const habitaciones = await habRes.json();

      for (const hab of habitaciones) {
        const camasRes = await fetch(`/api/camas/habitacion/${hab.ID_hab}`);
        const camas = await camasRes.json();

        const habDiv = document.createElement("div");
        habDiv.style.border = "1px solid #000";
        habDiv.style.padding = "10px";
        habDiv.style.marginBottom = "10px";

        habDiv.innerHTML = `
          <h4>Habitación N° ${hab.numero} (Capacidad: ${hab.capacidad})</h4>
          <div class="camas" style="display: flex; gap: 10px; flex-wrap: wrap;"></div>
        `;

        const camasContenedor = habDiv.querySelector(".camas");

        camas.forEach(cama => {
          const camaDiv = document.createElement("div");
          camaDiv.style.border = "1px solid gray";
          camaDiv.style.padding = "5px";
          camaDiv.style.borderRadius = "5px";
          camaDiv.style.backgroundColor = cama.Estado === "Ocupada" ? "#f8d7da" : "#d4edda";

          camaDiv.innerHTML = `
            <p><strong>N°:</strong> ${cama.Numero}</p>
            <p><strong>Estado:</strong> ${cama.Estado}</p>
            <p><strong>Sexo:</strong> ${cama.Sexo_ocupante || "N/A"}</p>
            ${
              cama.Estado === "Disponible"
                ? `<button onclick="asignarCama(${cama.ID_cama})">Asignar</button>`
                : ""
            }
          `;

          camasContenedor.appendChild(camaDiv);
        });

        contenedor.appendChild(habDiv);
      }
    } catch (error) {
      console.error("Error al cargar habitaciones y camas:", error);
      contenedor.innerHTML = "<p>Error al cargar habitaciones.</p>";
    }
  });
});
