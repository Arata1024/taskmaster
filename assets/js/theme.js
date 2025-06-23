const themeToggle = document.getElementById('themeToggle');
const icon = themeToggle.querySelector('i');

// Проверяем сохраненную тему
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.className = savedTheme;
updateIcon(savedTheme);

themeToggle.addEventListener('click', () => {
  const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
  document.body.className = newTheme;
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
}