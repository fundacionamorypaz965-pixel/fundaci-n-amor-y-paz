const SUPABASE_URL = 'https://nfiodlwhyfshqykmvzax.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maW9kbHdoeWZzaHF5a212emF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDE5ODUsImV4cCI6MjA3NTg3Nzk4NX0.0wMTF1tRycGXm6mXL-UhacDlkrTCcezPSimYxVet01s';

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

async function cargarRegistros() {
   const { data, error } = await supabaseClient
  .from("registros")
  .select("*");
        

    if (error) {
        console.error("Error al cargar:", error);
        return;
    }

    const contenedor = document.getElementById("contenedorRegistros");
    contenedor.innerHTML = "";

    data.forEach(registro => {
        const tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta-registro");

        tarjeta.innerHTML = `
            <h3>${registro.nombre}</h3>
            <p><strong>Identificación:</strong> ${registro.tipo_id} - ${registro.numero_id}</p>
            <p><strong>Teléfono:</strong> ${registro.telefono}</p>
            <p><strong>Ubicación:</strong> ${registro.ubicacion}</p>
            <p><strong>Ayuda solicitada:</strong> ${registro.ayuda}</p>
            <p><strong>Correo:</strong> ${registro.correo || "No registrado"}</p>
            <p style="font-size: 12px; color: #ddd;"><strong>Fecha:</strong> ${registro.created_at}</p>
        `;

        contenedor.appendChild(tarjeta);
    });
}

cargarRegistros();