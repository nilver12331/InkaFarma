  const dropdown = document.getElementById('dropdown');
  const menu = document.getElementById('menu');

  dropdown.addEventListener('mouseenter', () => {
    menu.classList.remove('hidden');
  });

  dropdown.addEventListener('mouseleave', () => {
    menu.classList.add('hidden');  });