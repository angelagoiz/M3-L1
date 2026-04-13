// ===========================
// MAIN.JS
// Interactividad de la página
// ===========================


// ---- NAVBAR ----

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});


// ---- CARRITO ----

let totalCarrito = 0;
const carritoIcono = document.querySelector('.carrito-flotante');
const carritoContador = document.querySelector('.carrito-flotante__contador');
const botonesAgregar = document.querySelectorAll('.btn-agregar');

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    const nombreProducto = boton.getAttribute('data-nombre') || 'Producto';

    totalCarrito++;
    carritoContador.textContent = totalCarrito;
    carritoIcono.classList.add('carrito-flotante--activo');

    mostrarToast(`¡${nombreProducto} agregado al carrito!`);

    boton.textContent = '✓ Agregado';
    boton.style.backgroundColor = 'var(--color-dorado)';

    setTimeout(() => {
      boton.textContent = 'Agregar al carrito';
      boton.style.backgroundColor = '';
    }, 1500);
  });
});


// ---- TOAST ----

const toast = document.getElementById('toast');
let toastTimeout;

function mostrarToast(mensaje) {
  clearTimeout(toastTimeout);
  document.getElementById('toast-mensaje').textContent = mensaje;
  toast.classList.add('toast--visible');

  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 3000);
}


// ---- FILTROS DE CAFÉ ----
// Ahora con categorías: todos / caliente / frio
// El separador y el grid de fríos se muestran/ocultan según el filtro activo

const filtros = document.querySelectorAll('.filtro-cafe__btn');
const cardsCafe = document.querySelectorAll('.card-cafe-col');
const separadorFrios = document.getElementById('separadorFrios');
const gridFrios = document.getElementById('gridFrios');

filtros.forEach(filtro => {
  filtro.addEventListener('click', () => {
    filtros.forEach(f => f.classList.remove('filtro-cafe__btn--activo'));
    filtro.classList.add('filtro-cafe__btn--activo');

    const categoria = filtro.getAttribute('data-filtro');

    cardsCafe.forEach(card => {
      if (categoria === 'todos') {
        card.style.display = '';
      } else {
        card.style.display = card.getAttribute('data-categoria') === categoria ? '' : 'none';
      }
    });

    // Mostrar u ocultar el separador y el grid de fríos
    if (categoria === 'caliente') {
      separadorFrios.style.display = 'none';
      gridFrios.style.display = 'none';
    } else {
      separadorFrios.style.display = '';
      gridFrios.style.display = '';
    }
  });
});


// ---- GALERÍA ROTATORIA DE GATOS ----
// Cada celda cambia su imagen de forma escalonada con un pool de fotos

(function iniciarGaleriaGatos() {
  // Pool de imágenes de gatos
  const poolImagenes = [
    'img/gato1.png',
    'img/gato2.png',
    'img/gato3.png',
    'img/gato4.png',
    'img/gato5.png',
    'img/gato6.png',
    'img/gato7.png',
    'img/gato8.png',
    'img/gato9.png',
    'img/gato10.png',
    'img/gato11.png',
    'img/gato12.png',
    'img/gato13.png',
    'img/gato14.png',
    'img/gato15.png',

  ];

  const celdas = document.querySelectorAll('.galeria-gatos__img');
  if (!celdas.length) return;

  // Índice actual por celda para no repetir la misma imagen
  const indicesPorCelda = Array.from(celdas).map((_, i) => i % poolImagenes.length);

  function rotarCelda(celda, nuevaSrc) {
    // Fade out
    celda.style.opacity = '0';
    celda.style.transform = 'scale(0.95)';

    setTimeout(() => {
      celda.src = nuevaSrc;
      // Fade in
      celda.style.opacity = '1';
      celda.style.transform = 'scale(1)';
    }, 500);
  }

  // Cada 2.5s rota una celda aleatoria
  setInterval(() => {
    const i = Math.floor(Math.random() * celdas.length);

    indicesPorCelda[i] = (indicesPorCelda[i] + 1 + Math.floor(Math.random() * (poolImagenes.length - 1))) % poolImagenes.length;

    rotarCelda(celdas[i], poolImagenes[indicesPorCelda[i]]);
  }, 2500);
})();


// ---- ANIMACIÓN DE ENTRADA ----

const elementosAnimados = document.querySelectorAll('.animar-entrada');

const observador = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);
        observador.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  }
);

elementosAnimados.forEach(el => observador.observe(el));


// ---- SMOOTH SCROLL ----

const btnVerMenu = document.querySelector('.btn-ver-menu');
if (btnVerMenu) {
  btnVerMenu.addEventListener('click', (e) => {
    e.preventDefault();
    const destino = document.querySelector('#menu-postres');
    if (destino) {
      destino.scrollIntoView({ behavior: 'smooth' });
    }
  });
}
