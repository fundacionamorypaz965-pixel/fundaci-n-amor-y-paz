// ---------- CONEXIÓN CON SUPABASE ----------
const SUPABASE_URL = 'https://nfiodlwhyfshqykmvzax.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5maW9kbHdoeWZzaHF5a212emF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAzMDE5ODUsImV4cCI6MjA3NTg3Nzk4NX0.0wMTF1tRycGXm6mXL-UhacDlkrTCcezPSimYxVet01s';

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ---------- ENVÍO DEL FORMULARIO ----------
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registroForm");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const registro = Object.fromEntries(formData.entries());

    // Insertar datos en la tabla registros
    const { data, error } = await supabase.from('registros').insert([registro]);

    if (error) {
      console.error('Error:', error);
      alert('❌ Error al guardar los datos: ' + error.message);
    } else {
      alert('✅ Registro guardado correctamente en la base de datos');
      form.reset();
    }
  });
});

// ---------- SCROLL SUAVE ----------
document.querySelectorAll('nav a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const destino = document.querySelector(link.getAttribute('href'));
    destino.scrollIntoView({ behavior: 'smooth' });
  });
});
