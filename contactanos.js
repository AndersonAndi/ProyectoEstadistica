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