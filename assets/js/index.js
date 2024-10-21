const hamburger = document.getElementById('hamburger');
const navbarMenu = document.getElementById('navbarMenu');

hamburger.addEventListener('click', () => {
  navbarMenu.classList.toggle('active');
});