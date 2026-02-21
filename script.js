console.log("✅ script cargado");

const SUPABASE_URL = "https://nfiodlwhyfshqykmvzax.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maW9kbHdoeWZzaHF5a212emF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDE5ODUsImV4cCI6MjA3NTg3Nzk4NX0.0wMTF1tRycGXm6mXL-UhacDlkrTCcezPSimYxVet01s";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");

  if (!form) {
    console.error("❌ No se encontró el formulario");
    return;
  }

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const registro = Object.fromEntries(formData.entries());

    const { error } = await supabaseClient
      .from("registros")
      .insert([registro]);

    if (error) {
      mostrarMensaje("❌ Error al guardar: " + error.message, "error");
    } else {
      mostrarMensaje("✅ Registro guardado correctamente", "exito");
      form.reset();
    }
  });
});


function mostrarMensaje(texto, tipo) {
  const mensaje = document.getElementById("notificacion");

  mensaje.innerHTML = `
    <span>${texto}</span>
    <button id="cerrarNoti">Aceptar</button>
  `;

  mensaje.className = "notificacion mostrar " + tipo;

  document.getElementById("cerrarNoti").addEventListener("click", () => {
    mensaje.classList.remove("mostrar");
  });
}