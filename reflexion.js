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

// ===============================
// Reflexion: expand/collapse áreas y botón flotante
// ===============================

// ===============================
// Reflexion: expand/collapse áreas y botón flotante (animación más lenta)
// ===============================

const areaIA = document.getElementById("areaIA");
const areaPolar = document.getElementById("areaPolar");
const btnSwitch = document.getElementById("btnSwitchArea");

/*function scrollToWithOffset(element, offset = 80) {
  const rect = element.getBoundingClientRect();
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  window.scrollTo({
    top: rect.top + scrollTop - offset,
    behavior: "smooth"
  });
}*/

if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}

btnSwitch.onclick = function() {topFunction()};

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


if (!areaIA || !areaPolar || !btnSwitch) {
  console.warn("Reflexion: elementos no encontrados");
}

// asignar fondos (data-img)
[areaIA, areaPolar].forEach(area => {
  const img = area.dataset.img;
  if (img) {
    area.style.backgroundImage = `url("${img}")`;
    area.style.backgroundSize = 'cover';
    area.style.backgroundPosition = 'center';
  }
});

// estado actual
let areaActiva = null; // "IA" o "POLAR"

// asegurar que btnSwitch sea hijo de la area expandida (lo moveremos dinámicamente)
function placeButtonInside(areaEl) {
  // quitar de donde esté y anexar al areaEl
  if (btnSwitch.parentElement !== areaEl) {
    if (btnSwitch.parentElement) btnSwitch.parentElement.removeChild(btnSwitch);
    areaEl.appendChild(btnSwitch);
  }
  // garantizar posicion relativo en area para que absolute funcione
  areaEl.style.position = 'relative';
  btnSwitch.classList.remove('hidden');
}

// remover btn del area (ocultarlo)
function hideButton() {
  if (btnSwitch.parentElement) {
    try { btnSwitch.parentElement.removeChild(btnSwitch); } catch(e){/*ignore*/ }
  }
  btnSwitch.classList.add('hidden');
}

// función principal para expandir
function expandir(area) {
  // si ya está expandida la misma, no hacemos nada
  if ((area === "IA" && areaActiva === "IA") || (area === "POLAR" && areaActiva === "POLAR")) {
    return;
  }

  // quitar clases de ambos primero
  areaIA.classList.remove("expandida", "oculta");
  areaPolar.classList.remove("expandida", "oculta");

  // ocultar contenidos inmediatamente para preparar animación
  hideContenido(areaIA);
  hideContenido(areaPolar);

  // aplicar transición "equilibrada": usar flex-basis cambio
  if (area === "IA") {
    areaIA.classList.add("expandida");
    areaPolar.classList.add("oculta");
    areaActiva = "IA";
    placeButtonInside(areaIA);
    setBtnBackground(areaPolar.dataset.img, "Ver Estado de Polarización");

    // comenzar la animación de mostrar contenido después de un delay (para que flex-basis empiece)
    setTimeout(() => {
      showContenido(areaIA);
    }, 600);

    // desplazamiento suave con offset para que no lo tape el header
    /*setTimeout(() => {
      const title = areaIA.querySelector(".title-wrapper");
      if (title) scrollToWithOffset(title, 120); // 120px = offset recomendado
    }, 80);*/
    // 80ms empata con la animación inicial (ajusta si quieres más sincronía)

  } else {
    areaPolar.classList.add("expandida");
    areaIA.classList.add("oculta");
    areaActiva = "POLAR";
    placeButtonInside(areaPolar);
    setBtnBackground(areaIA.dataset.img, "Ver IA / LLM");

    setTimeout(() => {
      showContenido(areaPolar);
    }, 600);

    /*setTimeout(() => {
      const title = areaPolar.querySelector(".title-wrapper");
      if (title) scrollToWithOffset(title, 120);
    }, 80);*/

  }

  // mostrar el botón (ya lo hace placeButtonInside pero por seguridad)
  btnSwitch.classList.remove("hidden");
}


// mostrar el contenido con animación dentro del area (más lento)
function showContenido(areaEl) {
  const contenido = areaEl.querySelector(".contenido-area");
  if (!contenido) return;
  // reset
  contenido.classList.remove('hiding');
  contenido.style.maxHeight = "0px";
  contenido.style.opacity = 0;
  contenido.style.transform = "translateY(12px)";

  // mayor timeout para coincidir con CSS (dejamos 220ms + 80ms)
  setTimeout(() => {
    contenido.style.transition = "max-height 1000ms ease, opacity 900ms ease, transform 900ms ease";
    contenido.style.maxHeight = "3000px";
    contenido.style.opacity = 1;
    contenido.style.transform = "translateY(0)";
  }, 160);
}

// ocultar contenido (cuando el area se contrae) — más lento
function hideContenido(areaEl) {
  const contenido = areaEl.querySelector(".contenido-area");
  if (!contenido) return;
  contenido.classList.add('hiding');
  contenido.style.transition = "max-height 800ms ease, opacity 700ms ease, transform 700ms ease";
  contenido.style.maxHeight = "0px";
  contenido.style.opacity = 0;
  contenido.style.transform = "translateY(12px)";
}

// restaurar estado 50%-50%
function restaurar() {
  areaIA.classList.remove("expandida", "oculta");
  areaPolar.classList.remove("expandida", "oculta");
  hideContenido(areaIA);
  hideContenido(areaPolar);
  hideButton();
  areaActiva = null;
}

// setear background del botón (imagen + texto accesible)
function setBtnBackground(imgUrl, texto) {
  if (imgUrl) {
    btnSwitch.style.backgroundImage = `url('${imgUrl}')`;
    btnSwitch.textContent = texto || "Ver otra sección";
    btnSwitch.style.color = "#fff";
  } else {
    btnSwitch.style.background = "";
    btnSwitch.textContent = "Ver otra sección";
  }
}

// Toggle desde el botón -> swap directo (A), con demora para la animación equilibrada
btnSwitch.addEventListener("click", (e) => {
  // evitar que el click burbujee y active other handlers
  e.stopPropagation();

  if (areaActiva === "IA") {
    expandir("POLAR");
  } else if (areaActiva === "POLAR") {
    expandir("IA");
  } else {
    expandir("IA");
  }
});

// Click directo en las areas (título wrapper y hover)
const titleWrappers = document.querySelectorAll(".title-wrapper");
titleWrappers.forEach(wrapper => {
  wrapper.addEventListener("click", (e) => {
    const parent = wrapper.closest(".area");
    if (!parent) return;
    const id = parent.id === "areaIA" ? "IA" : "POLAR";
    expandir(id);
  });

  wrapper.style.cursor = "pointer";
});

// Inicialización
(function init() {
  hideContenido(areaIA);
  hideContenido(areaPolar);
  hideButton();
  // btn background por defecto (imagen de la otra area)
  setBtnBackground(areaPolar.dataset.img, "Ver Estado de Polarización");
})();




