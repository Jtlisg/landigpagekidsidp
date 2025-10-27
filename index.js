
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
