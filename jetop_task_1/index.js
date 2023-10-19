const menu = document.querySelector('.menu-mobile');
const hamburger = document.querySelector('#hamburger');
const xmark = document.querySelector('#xmark');

let isMenuOpen = false;

const openMenu = () => {
  if (isMenuOpen) {
    menu.classList.remove('menu--open');
    hamburger.classList.remove('hidden');
    xmark.classList.add('hidden');
  } else {
    menu.classList.add('menu--open');
    xmark.classList.remove('hidden');
    hamburger.classList.add('hidden');
  }
  isMenuOpen = !isMenuOpen;
}