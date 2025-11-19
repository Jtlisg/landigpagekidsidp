
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__list');

toggle.addEventListener('click', () => {
  menu.classList.toggle('nav__list--active');
  toggle.classList.toggle('nav__toggle--open');
});

const myNavlinks = menu.querySelectorAll('li');
// console.log(mylink)

myNavlinks.forEach(link => {
  link.addEventListener('click', () => {
    console.log('escuchandoo')
    menu.classList.remove('nav__list--active')
  })
})


/* ==============================
   CARRUSEL IDP — infinito real
   3 puntitos = atrás / pausa / adelante
============================== */

const track = document.querySelector(".carrusel-idp__track");
const dots = document.querySelectorAll(".carrusel-idp__dot");
let slides = Array.from(track.children);

// Clonar primero y último
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

// Agregar clones
track.appendChild(firstClone);
track.insertBefore(lastClone, slides[0]);

// Volver a cargar lista
slides = Array.from(track.children);

// Índice inicial (1, porque ahora hay un clon antes)
let index = 1;
const size = 100; // cada imagen = 100%

track.style.transform = `translateX(-${index * size}%)`;

let interval;

// Función para mover
function moveTo(i) {
    track.style.transition = "transform 0.8s ease";
    index = i;
    track.style.transform = `translateX(-${index * size}%)`;

    // activar puntito del centro
    dots.forEach(d => d.classList.remove("active"));
    dots[1].classList.add("active");
}

// Quitar salto brusco cuando estamos en un clon
track.addEventListener("transitionend", () => {
    if (slides[index].isSameNode(firstClone)) {
        track.style.transition = "none";
        index = 1;
        track.style.transform = `translateX(-${index * size}%)`;
    }
    if (slides[index].isSameNode(lastClone)) {
        track.style.transition = "none";
        index = slides.length - 2;
        track.style.transform = `translateX(-${index * size}%)`;
    }
});

// AUTO SLIDE
function startAuto() {
    interval = setInterval(() => {
        moveTo(index + 1);
    }, 4000);
}

// BOTÓN ATRÁS
dots[0].addEventListener("click", () => {
    moveTo(index - 1);
    clearInterval(interval);
    startAuto();
});

// BOTÓN PAUSA (reinicia el auto)
dots[1].addEventListener("click", () => {
    clearInterval(interval);
    startAuto();
});

// BOTÓN ADELANTE
dots[2].addEventListener("click", () => {
    moveTo(index + 1);
    clearInterval(interval);
    startAuto();
});

// Iniciar
startAuto();



document.getElementById("btnCompartir").addEventListener("click", async () => {
    if (navigator.share) {
        try {
            await navigator.share({
                title: "IDP Kids",
                text: "Apoya nuestro proyecto IDP Kids ❤️",
                url: "https://jtlisg.github.io/landigpagekidsidp/"
            });
        } catch (error) {
            console.log("Compartir cancelado");
        }
    } else {
        alert("Tu dispositivo no soporta la opción de compartir.");
    }
});
