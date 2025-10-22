
const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__list');

toggle.addEventListener('click', () => {
    console.log("click")
  menu.classList.toggle('nav__list--active');
  toggle.classList.toggle('nav__toggle--open');
});

