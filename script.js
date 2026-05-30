// Ano no footer
document.getElementById('year').textContent = new Date().getFullYear();

// Remove splash do DOM após a animação de fade out
const splash = document.getElementById('splash');
if (splash) {
  splash.addEventListener('animationend', () => {
    splash.style.display = 'none';
  });
}
