document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('themeToggle');
  const icon = themeToggle.querySelector('i');
  const currentTheme = localStorage.getItem('theme') || 'light';

  document.body.className = currentTheme;
  icon.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';

  themeToggle.addEventListener('click', () => {
    const newTheme = document.body.classList.contains('light') ? 'dark' : 'light';
    document.body.className = newTheme;
    localStorage.setItem('theme', newTheme);
    icon.className = newTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  });
});