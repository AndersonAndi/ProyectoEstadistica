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

// ==============================
// 🔵 SECCIÓN 2: Calcular Puntuación del Estudio
// ==============================

// Obtener referencias a inputs
const inpAgresividad = document.getElementById("p_agresividad");
const inpOfensa = document.getElementById("p_ofensa");
const inpIdeologia = document.getElementById("p_ideologia");
const inpConstructividad = document.getElementById("p_constructividad");
const inpEmpatia = document.getElementById("p_empatia");
const inpDialogo = document.getElementById("p_dialogo");

const btnCalcular = document.getElementById("btnCalcularPuntuacion");
const valorPuntuacion = document.getElementById("valorPuntuacion");

// Función principal
function calcularPuntuacion() {
  const a = Number(inpAgresividad.value);
  const o = Number(inpOfensa.value);
  const i = Number(inpIdeologia.value);
  const c = Number(inpConstructividad.value);
  const e = Number(inpEmpatia.value);
  const d = Number(inpDialogo.value);

  // Fórmula total según tu descripción
  const total =
      a * 0.25 +
      o * 0.20 +
      i * 0.15 +
      (100 - c) * 0.20 +
      (100 - e) * 0.10 +
      (100 - d) * 0.10;

  // Mostrar resultado con 2 decimales
  valorPuntuacion.textContent = total.toFixed(2);
}

// Evento del botón
btnCalcular.addEventListener("click", calcularPuntuacion);


// ===== Sección 3: comportamientos botones grafica =====
(function(){
  const btnFecha = document.getElementById('btnOrdenarFecha');
  const btnMinMax = document.getElementById('btnOrdenarMinMax');
  let minMaxState = 0; // 0 = off, 1 = min, 2 = max (alternar)

  btnFecha?.addEventListener('click', () => {
    // emitir evento; tu módulo de graficas debe escuchar y reordenar
    window.dispatchEvent(new CustomEvent('ordenarPorFecha'));
  });

  btnMinMax?.addEventListener('click', () => {
    minMaxState = (minMaxState + 1) % 3; // 0->1->2->0
    if(minMaxState === 0) btnMinMax.classList.remove('active-min', 'active-max');
    if(minMaxState === 1) { // min
      btnMinMax.classList.add('active-min');
      btnMinMax.classList.remove('active-max');
      window.dispatchEvent(new CustomEvent('ordenarMin')); 
    }
    if(minMaxState === 2) { // max
      btnMinMax.classList.add('active-max');
      btnMinMax.classList.remove('active-min');
      window.dispatchEvent(new CustomEvent('ordenarMax')); 
    }
  });
})();

// ===== SECCIÓN 4: TABLA DE FRECUENCIAS DINÁMICA =====
(function(){

  const tbody = document.querySelector('#tablaFrecuencias tbody');
  const colTitulo = document.getElementById('col-titulo');

  const columnas = [
    "Puntuación",
    "Agresividad",
    "Ofensa",
    "Ideología",
    "Constructividad",
    "Empatía",
    "Diálogo"
  ];

  // -------------------------------------
  // Cambiar el nombre de la columna principal
  // -------------------------------------
  function actualizarTituloColumna(nombre) {
    colTitulo.innerHTML = `
      Valor <br> (${nombre})<br><span class="abbr">X</span>
    `;
  }

  // -------------------------------------
  // Generar datos aleatorios según columna
  // -------------------------------------
  function construirDatosPara(columna, n = 200){
    const arr = [];
    for(let i = 0; i < n; i++){
      arr.push({
        valor: Math.floor(Math.random() * 100) + 1
      });
    }
    return arr;
  }

  // -------------------------------------
  // Generar tabla
  // -------------------------------------
  function generarTablaFrecuencias(dataArray){

    const valores = dataArray.map(x => Number(x.valor));

    const freq = {};
    valores.forEach(v => freq[v] = (freq[v] || 0) + 1);

    const unicos = Object.keys(freq).map(Number).sort((a,b)=>a-b);

    const total = valores.length;
    let acumulada = 0;

    tbody.innerHTML = '';

    unicos.forEach(v => {
      const f = freq[v];
      acumulada += f;

      const fr = f / total;
      const Fr = acumulada / total;

      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${v}</td>
        <td>${f}</td>
        <td>${acumulada}</td>
        <td>${fr.toFixed(3)}</td>
        <td>${Fr.toFixed(3)}</td>
        <td>${(fr*100).toFixed(1)}%</td>
        <td>${(Fr*100).toFixed(1)}%</td>
      `;
      tbody.appendChild(tr);
    });
  }

  // -------------------------------------
  // Calcular estadísticos
  // -------------------------------------
  function estadisticas(dataArray){
    const vals = dataArray.map(x => Number(x.valor));
    const n = vals.length;

    if(n===0)
      return { media:'--', mediana:'--', moda:'--' };

    const media = (vals.reduce((a,b)=>a+b,0) / n).toFixed(2);
    const sorted = vals.slice().sort((a,b)=>a-b);
    const mediana = (n % 2 === 1)
      ? sorted[(n-1)/2].toFixed(2)
      : ((sorted[n/2 - 1] + sorted[n/2]) / 2).toFixed(2);

    const freq = {};
    sorted.forEach(v => freq[v] = (freq[v]||0)+1);

    let moda = sorted[0], maxf = 0;
    for(const k in freq){
      if(freq[k] > maxf){
        maxf = freq[k];
        moda = k;
      }
    }

    return { media, mediana, moda };
  }

  // -------------------------------------
  // Botones cambian columna
  // -------------------------------------
  document.querySelectorAll(".col-botones button").forEach(btn=>{
    btn.addEventListener("click", ()=>{
      const nombre = btn.dataset.col;

      actualizarTituloColumna(nombre);

      const datos = construirDatosPara(nombre, 200);
      generarTablaFrecuencias(datos);

      const est = estadisticas(datos);
      document.getElementById('stat-media').textContent = est.media;
      document.getElementById('stat-mediana').textContent = est.mediana;
      document.getElementById('stat-moda').textContent = est.moda;
    });
  });

  // -------------------------------------
  // Carga inicial por defecto: Puntuación
  // -------------------------------------
  document.addEventListener("DOMContentLoaded", ()=>{
    const datos = construirDatosPara("Puntuación");

    generarTablaFrecuencias(datos);

    const est = estadisticas(datos);
    document.getElementById('stat-media').textContent = est.media;
    document.getElementById('stat-mediana').textContent = est.mediana;
    document.getElementById('stat-moda').textContent = est.moda;
  });

})();




// ===== Seccion 5: exponer contenedores para tus graficas existentes =====
(function(){
  // Si tienes conteo de palabras en window.DATA.palabras.total
  document.addEventListener('DOMContentLoaded', () => {
    const totalPal = window.DATA?.palabras?.total ?? 0;
    document.getElementById('cantidadPalabras').textContent = totalPal;
    // Dispatch para que tus scripts monten las graficas con datos
    window.dispatchEvent(new CustomEvent('montarGraficasPalabras', { detail: window.DATA?.palabras }));
  });
})();


// ===== Seccion 6: controlar botones de vista y exponer datos =====
(function(){
  const btnPct = document.getElementById('vistaPorcentaje');
  const btnCnt = document.getElementById('vistaCantidad');

  btnPct.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('tortaVistaPct'));
  });
  btnCnt.addEventListener('click', () => {
    window.dispatchEvent(new CustomEvent('tortaVistaCnt'));
  });

  document.addEventListener('DOMContentLoaded', () => {
    const totals = window.DATA?.clasificacion || { total:0, destructivos:0, neutrales:0, constructivos:0 };
    document.getElementById('cantidadComentariosTotal').textContent = totals.total;
    document.getElementById('countDestructivos').textContent = totals.destructivos;
    document.getElementById('countNeutrales').textContent = totals.neutrales;
    document.getElementById('countConstructivos').textContent = totals.constructivos;
    // indicar al módulo de gráficos que pinte la torta
    window.dispatchEvent(new CustomEvent('montarTorta', { detail: totals }));
  });
})();

// ===== Seccion 7: click en medio -> abrir estudio específico =====
(function(){
  document.querySelectorAll('.medio-estudio').forEach(el => {
    el.addEventListener('click', () => {
      const id = el.dataset.id;
      // emitir evento con id; tu app puede escuchar y mostrar la vista detallada
      window.dispatchEvent(new CustomEvent('abrirEstudioMedio', { detail: { medio: id } }));
    });
  });
})();

// ======================================================
// 🔵 CARGAR DATOS DE LA PUBLICACION DEL DIA, DEL MEDIO SELECCIONADO EN LA SECCIÓN 1
// ======================================================

const urlParams = new URLSearchParams(window.location.search);
const medio = urlParams.get("medio");
const medioID = urlParams.get("medio");
const mes = urlParams.get("mes");
const dia = urlParams.get("dia");

const datosMedios = {
  bolivision: "Bolivision",
  pat: "PAT",
  telepais: "Telepais",
  notivision: "Notivision"
};

const rutaImagen = `${medio}/${mes}/${dia}/publicacion.jpg`;

(function cargarDatos() {

  if (!medio || !mes || !dia) return;

  // 🟦 Mostrar texto superior
  document.getElementById("fechaSeleccionada").textContent = `${mes} ${dia}`;
  document.getElementById("medioSeleccionado").textContent = datosMedios[medio];

  // 🟦 Imagen de la publicación
  document.getElementById("imagenPublicacion").style.backgroundImage =
    `url('${rutaImagen}')`;

  // 🟦 Datos de comentarios y palabras (ejemplo)
  // Aquí luego conectarás tus valores reales
  document.getElementById("cantComentarios").textContent = "350";
  document.getElementById("cantPalabras").textContent = "1200";

})();



// ======================================================
// 🔵 SECCIÓN 7 — DIAS POR MEDIO
// Cada medio tiene su lista editable con { mes, dia }
// ======================================================

// EDITA LIBREMENTE
const diasMedios = {
  bolivision: [
    { mes: "Septiembre", dia: 15 },
    { mes: "Septiembre", dia: 16 },
    { mes: "Septiembre", dia: 17 },
    { mes: "Septiembre", dia: 18 },
    { mes: "Septiembre", dia: 19 },
    { mes: "Septiembre", dia: 20 },
    { mes: "Septiembre", dia: 21 }
  ],
  pat: [
    { mes: "Septiembre", dia: 12 },
    { mes: "Septiembre", dia: 13 },
    { mes: "Septiembre", dia: 14 }
  ],
  telepais: [
    { mes: "Octubre", dia: 1 },
    { mes: "Octubre", dia: 2 }
  ],
  notivision: [
    { mes: "Agosto", dia: 20 },
    { mes: "Agosto", dia: 21 },
    { mes: "Agosto", dia: 22 }
  ]
};


// ==============================
// 🔵 SECCIÓN 7: Cargar días del medio seleccionado
// ==============================

// Renderizar SOLO los días del medio
if (medioID && diasMedios[medioID]) {

  // Cambiar el título
  document.getElementById("tituloDias").textContent =
    `Días analizados de ${datosMedios[medioID].nombre}`;

  // Renderizar con eventos CLICK
  renderDias(diasMedios[medioID], "diasMedioSeleccionado");
}


// Función para renderizar días con CLICK
function renderDias(lista, contenedorID) {
  const cont = document.getElementById(contenedorID);
  if (!cont) return;

  lista.forEach(d => {
    const div = document.createElement("div");
    div.className = "dia-card";

    div.innerHTML = `
      <div class="dia-mes">${d.mes}</div>
      <div class="dia-num">${d.dia}</div>
    `;

    // 🔵 CLICK -> subsubestudio
    div.addEventListener("click", () => {
      const url = `subsubestudio.html?medio=${medioID}&mes=${d.mes}&dia=${d.dia}`;
      window.location.href = url;
    });

    cont.appendChild(div);
  });
}
/*(function cargarDiasMedio() {
  if (!medioID || !diasMedios[medioID]) return;

  const titulo = document.getElementById("tituloDias");
  const contenedor = document.getElementById("diasMedioSeleccionado");

  titulo.textContent = `Días analizados de ${datosMedios[medioID].nombre}`;

  diasMedios[medioID].forEach(d => {
    const div = document.createElement("div");
    div.classList.add("dia-card");

    div.innerHTML = `
      <div class="dia-mes">${d.mes}</div>
      <div class="dia-num">${d.dia}</div>
    `;

    contenedor.appendChild(div);
  });
})();*/



// Función para renderizar días
/*function renderDias(lista, contenedorID) {
  const cont = document.getElementById(contenedorID);
  if (!cont) return;

  lista.forEach(d => {
    const div = document.createElement("div");
    div.className = "dia-card";

    div.innerHTML = `
      <div class="dia-mes">${d.mes}</div>
      <div class="dia-num">${d.dia}</div>
    `;

    cont.appendChild(div);
  });
}*/

// logica de subsubestudio.js aquí

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





