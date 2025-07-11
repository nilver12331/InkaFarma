const sidebar = document.getElementById("sidebar");
const toggleSidebarTop = document.getElementById("toggleSidebarTop");

toggleSidebarTop.addEventListener("click", () => {
  if (window.innerWidth >= 1024) {
    // Para pantallas grandes: cambiar tamaño del sidebar
    sidebar.classList.toggle("w-64");
    sidebar.classList.toggle("w-20");

    // Mostrar/ocultar texto
    document.querySelectorAll(".sidebar-text").forEach(el => {
      el.classList.toggle("hidden");
    });
  } else {
    // En móviles: ocultar sidebar
    sidebar.classList.toggle("hidden");
  }
});