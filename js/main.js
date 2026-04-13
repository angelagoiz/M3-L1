// ===========================
// MAIN.JS
// Interactividad de la página
// ===========================


// ---- 1. NAVBAR: cambia de estilo al hacer scroll ----

const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
  // Si el usuario ha bajado más de 50px, agrega la clase --scrolled
  if (window.scrollY > 50) {
    navbar.classList.add('navbar--scrolled');
  } else {
    navbar.classList.remove('navbar--scrolled');
  }
});


// ---- 2. CARRITO SIMPLE ----
// Contamos cuántos items agrega el usuario

let totalCarrito = 0;
const carritoIcono = document.querySelector('.carrito-flotante');
const carritoContador = document.querySelector('.carrito-flotante__contador');

// Seleccionamos TODOS los botones "Agregar al carrito"
const botonesAgregar = document.querySelectorAll('.btn-agregar');

botonesAgregar.forEach(boton => {
  boton.addEventListener('click', () => {
    // Obtenemos el nombre del producto desde el atributo data-nombre
    const nombreProducto = boton.getAttribute('data-nombre') || 'Producto';

    // Aumentamos el contador
    totalCarrito++;

    // Mostramos el número en el icono del carrito
    carritoContador.textContent = totalCarrito;
    carritoIcono.classList.add('carrito-flotante--activo');

    // Mostramos notificación
    mostrarToast(`¡${nombreProducto} agregado al carrito!`);

    // Animación del botón al hacer clic
    boton.textContent = '✓ Agregado';
    boton.style.backgroundColor = 'var(--color-dorado)';

    // Después de 1.5s volvemos el botón al estado original
    setTimeout(() => {
      boton.textContent = 'Agregar al carrito';
      boton.style.backgroundColor = '';
    }, 1500);
  });
});


// ---- 3. TOAST: notificación flotante ----

const toast = document.getElementById('toast');
let toastTimeout; // Guardamos el timer para poder cancelarlo si se llama de nuevo rápido

function mostrarToast(mensaje) {
  // Si ya hay un toast visible, lo ocultamos antes
  clearTimeout(toastTimeout);

  // Ponemos el mensaje
  document.getElementById('toast-mensaje').textContent = mensaje;

  // Mostramos
  toast.classList.add('toast--visible');

  // Lo ocultamos después de 3 segundos
  toastTimeout = setTimeout(() => {
    toast.classList.remove('toast--visible');
  }, 3000);
}


// ---- 4. FILTROS DE CAFÉ ----
// Al hacer clic en un filtro, filtramos las cards

const filtros = document.querySelectorAll('.filtro-cafe__btn');
const cardsCafe = document.querySelectorAll('.card-cafe-col');

filtros.forEach(filtro => {
  filtro.addEventListener('click', () => {
    // Quitamos la clase activa de todos los filtros
    filtros.forEach(f => f.classList.remove('filtro-cafe__btn--activo'));

    // Se la ponemos al que se hizo clic
    filtro.classList.add('filtro-cafe__btn--activo');

    const categoria = filtro.getAttribute('data-filtro');

    cardsCafe.forEach(card => {
      if (categoria === 'todos') {
        // Mostramos todas las cards
        card.style.display = '';
      } else {
        // Solo mostramos las que tienen la categoría correcta
        if (card.getAttribute('data-categoria') === categoria) {
          card.style.display = '';
        } else {
          card.style.display = 'none';
        }
      }
    });
  });
});


// ---- 5. ANIMACIÓN DE APARICIÓN (Intersection Observer) ----
// Los elementos aparecen con un fade-in al entrar en pantalla

const elementosAnimados = document.querySelectorAll('.animar-entrada');

const observador = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Delay escalonado: cada elemento aparece un poco después del anterior
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 80);

        // Dejamos de observar una vez que ya apareció
        observador.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.1,  // Empieza cuando el 10% del elemento es visible
    rootMargin: '0px 0px -40px 0px'  // Un poco antes del borde inferior
  }
);

elementosAnimados.forEach(el => observador.observe(el));


// ---- 6. SMOOTH SCROLL para el botón de Ver Menú ----

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
