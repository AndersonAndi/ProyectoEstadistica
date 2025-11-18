// script.js

// DARK MODE TOGGLE
const darkModeBtn = document.getElementById('darkModeToggle');

darkModeBtn.addEventListener('click', () => {
    // Toggle la animación y el tema oscuro al mismo tiempo
    document.body.classList.toggle('active');        // para animación del toggle
    document.body.classList.toggle('dark-mode');     // para aplicar colores

    const iconDiv = darkModeBtn.querySelector('.sunnyAndMoon');

    // Guardar preferencia en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        iconDiv.innerHTML = '>>🌙';
    } else {
        localStorage.setItem('theme', 'light');
        iconDiv.innerHTML = '☀️&lt&lt';
    }
});

// Aplicar tema guardado al cargar la página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.add('active');  // si quieres que el toggle esté en posición "dark"
}

// DARK MODE TOGGLE2
const darkModeBtn2 = document.getElementById('darkModeToggle2');

darkModeBtn2.addEventListener('click', () => {
    // Toggle la animación y el tema oscuro al mismo tiempo
    document.body.classList.toggle('active');        // para animación del toggle
    document.body.classList.toggle('dark-mode');     // para aplicar colores

    const iconDiv2 = darkModeBtn2.querySelector('.sunnyAndMoon2');

    // Guardar preferencia en localStorage
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        iconDiv2.innerHTML = '>>🌙';
    } else {
        localStorage.setItem('theme', 'light');
        iconDiv2.innerHTML = '☀️&lt&lt';
    }
});

// Aplicar tema guardado al cargar la página
if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark-mode');
    document.body.classList.add('active');  // si quieres que el toggle esté en posición "dark"
}



// ---------- MOBILE MENU TOGGLE & ANIMATED DIAGONAL FILL ----------

const menuBtn = document.getElementById('menuToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Create an overlay to perform diagonal color animation
let diagOverlay = null;

function createDiagOverlay() {
  if (diagOverlay) return;
  diagOverlay = document.createElement('div');
  diagOverlay.id = 'diagOverlay';
  Object.assign(diagOverlay.style, {
    position: 'fixed',
    top: 0, left: 0,
    width: '0%',
    height: '0%',
    pointerEvents: 'none',
    zIndex: 1500,
    transformOrigin: '0 0',
    transition: 'width 1ms ease, height 1ms ease'
  });
  document.body.appendChild(diagOverlay);
}

function openMobileMenuAnimated() {
  createDiagOverlay();
  diagOverlay.style.background = `linear-gradient(135deg, var(--color-accent), var(--color-bg))`;
  diagOverlay.style.width = '120%';
  diagOverlay.style.height = '120%';

  // mostrar el menú inmediatamente
  mobileMenu.classList.add('active');

  // limpiar el overlay casi al instante
  diagOverlay.style.transition = 'opacity 0ms ease';
  diagOverlay.style.opacity = '0';
  setTimeout(() => {
    if (diagOverlay) {
      diagOverlay.remove();
      diagOverlay = null;
    }
  }, 100);
}


function closeMobileMenu() {
  menuBtn.classList.remove('active');
  mobileMenu.classList.remove('active');
  // remove overlay if present
  if (diagOverlay) {
    diagOverlay.remove();
    diagOverlay = null;
  }
}

if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('active');
    if (isOpen) {
      closeMobileMenu();
    } else {
      menuBtn.classList.add('active');
      openMobileMenuAnimated();
    }
  });
}

// close mobile menu when clicking any mobile link
const mobileLinks = document.querySelectorAll('.mobile-link');
mobileLinks.forEach(a => {
  a.addEventListener('click', () => {
    // mark corresponding desktop link active (optional)
    const text = a.textContent.trim();
    menuLinks.forEach(l => {
      if (l.textContent.trim() === text) {
        menuLinks.forEach(x => x.classList.remove('active'));
        l.classList.add('active');
      }
    });
    closeMobileMenu();
  });
});

// close menu on Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMobileMenu();
});

/* ------------------------------------------ */
// ======== BLOQUE 1: Botón de Continuar ========
document.getElementById('btnContinuar1').addEventListener('click', () => {
  document.getElementById('bloque2').scrollIntoView({ behavior: 'smooth' });
});

// ======== BLOQUE 2: Cambio de fondo y texto ========
const barras = document.querySelectorAll('.barra');
const bloque2 = document.getElementById('bloque2');
const textoBloque2 = document.getElementById('textoBloque2');

barras.forEach(barra => {
  barra.addEventListener('click', () => {
    barras.forEach(b => b.classList.remove('active'));
    barra.classList.add('active');
    bloque2.style.backgroundImage = `url(${barra.dataset.fondo})`;
    textoBloque2.textContent = barra.dataset.texto;
  });
});

document.getElementById('btnContinuar2').addEventListener('click', () => {
  document.getElementById('bloque3').scrollIntoView({ behavior: 'smooth' });
});

// ======== BLOQUE 3: Animación e interacción ========
const iconProceso = document.getElementById('IniciarHistoria');
const bloque3 = document.getElementById('bloque3');
const contenidoBloque3 = document.getElementById('contenidoBloque3');

const ANCHO_LIMITE = 870;



iconProceso.addEventListener('click', () => {
  bloque3.classList.add('activo');
  

  // Verificar el ancho actual de la ventana
  if (window.innerWidth < ANCHO_LIMITE) {
      // Si es menor a 870px, alternar la clase
      bloque3.style.height = '325vh';
      console.log("Ancho actual (" + window.innerWidth + "px) es menor a " + ANCHO_LIMITE + "px. Estilo cambiado.");
  } 

  contenidoBloque3.innerHTML = `
    <div class="historia-container">
        <div class="base">
          <div class="p1">
            <div class="paso">
            <p> <span> 1.</span> <br>Nos basamos en los comentarios en redes sociales y páginas de noticias, buscando publicaciones relacionadas a las elecciones del 15 de septiembre al 19 de octubre.</p>
            <div class="imagenes">
              <img src="img/PAT.png" class="img1" alt="PAT">
              <img src="img/Telepais.png" class="img2" alt="Telepais">
              <img src="img/Bolivisión.png" class="img3" alt="Bolivisión">
              <img src="img/Notivision.png" class="img4" alt="Notivisión">
            </div>
          </div>

          <div class="paso">
            <p><span> 2.</span> <br>Una vez encontrada una publicación relacionada a las elecciones y con varios comentarios:</p>
            <img src="img/publicacion.png" class="img5" alt="Publicación de ejemplo">
          </div>

          <div class="paso">
            <p><span> 3.</span> <br>Buscamos copiar los comentarios y guardarlos en archivos .txt</p>
            <div class="imagenes">
              <img src="img/ComentariosFace.png" class="img6" alt="Comentarios de Facebook">
              <img src="img/txt.png" class="img7" alt="Archivo TXT">
            </div>
          </div>

          <div class="paso">
            <p><span> 4.</span> <br>Una vez tenidos todos los .txt de cada publicación relevante:</p>
            <img src="img/txt.png" class="img8" alt="Texto procesado">
          </div>

          <div class="paso">
            <p><span> 5.</span> <br>Usábamos scripts de Python para procesar la gran cantidad de comentarios.</p>
            <img src="img/Python.png" class="img9" alt="Python script">
          </div>
          </div>
        
          <div class="p2">
            <div class="paso">
            <p><span> 6.</span> <br>Apoyándonos en la librería Pandas.</p>
            <img src="img/Pandas.png" class="img10" alt="Pandas">
          </div>

          <div class="paso">
            <p><span> 7.</span> <br>Obteníamos archivos .CSV donde ya estaban los datos filtrados.</p>
            <img src="img/CSV.png" class="img11" alt="CSV datos filtrados">
          </div>

          <div class="paso">
            <p><span> 8.</span> <br>Usamos la herramienta Ollama para poder usar LLMs de manera local.</p>
            <img src="img/Ollama.png" class="img12" alt="Ollama">
          </div>

          <div class="paso">
            <p><span> 9.</span> <br>Usamos DeepSeek (1.5B, 8B, online) para análisis adicionales.</p>
            <img src="img/Deepseek.png" class="img13" alt="Deepseek">
          </div>

          <div class="paso">
            <p><span> 10.</span> <br>Las evaluaciones se almacenaron en .CSV y luego usamos scripts Python con Pandas para calcular la puntuación total y categorizar.</p>
            <div class="imagenes">
              <img src="img/CSV.png" class="img14" alt="CSV evaluación">
              <img src="img/Python.png" class="img15" alt="Python procesamiento">
            </div>
          </div>
          </div>
        </div>
        
      

    </div>

    
  `;});


// Cargar desde el inicio y descavtivar el scroll automático al navegar
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

/*btnSwitch.onclick = function() {topFunction()};*/

function topFunction() {
  window.scrollTo({
    top: -100,
    behavior: 'smooth' // Desplazamiento suave
  });
}

// Ejecuta la función automáticamente cuando la página esté lista
document.addEventListener('DOMContentLoaded', (event) => {
    console.log('La página se ha cargado. Ejecutando topFunction().');
    topFunction();
});




  

