// public/js/modal.js
/*
// Espera a que todo el contenido HTML de la página se haya cargado completamente
document.addEventListener('DOMContentLoaded', () => {
    // Obtenemos referencias a los elementos HTML usando sus IDs o clases
    const openLoginModalBtn = document.getElementById('openLoginModal');
    const loginModal = document.getElementById('loginModal');
    const closeModalBtn = loginModal.querySelector('.close-button');
    const tabs = loginModal.querySelectorAll('.tab');

    // Referencias a los formularios
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');

    // Función para mostrar la modal
    function openModal() {
        loginModal.classList.remove('hidden');
    }

    // Función para ocultar la modal
    function closeModal() {
        loginModal.classList.add('hidden');
    }

    // 1. Añadir un "escuchador de eventos" al botón "Inicia Sesión"
    if (openLoginModalBtn) {
        openLoginModalBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openModal();
            // Al abrir la modal, asegúrate de que la pestaña de login y su formulario estén activos por defecto
            setActiveTabAndForm('login');
        });
    }

    // 2. Añadir un "escuchador de eventos" al botón de cerrar 'x'
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', closeModal);
    }

    // 3. Añadir un "escuchador de eventos" al fondo oscuro de la modal
    if (loginModal) {
        loginModal.addEventListener('click', (e) => {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // NUEVO: Función para establecer la pestaña y el formulario activos
    function setActiveTabAndForm(activeFormId) {
        tabs.forEach(tab => {
            const tabFormId = tab.dataset.form; // Obtiene el valor de 'data-form'
            if (tabFormId === activeFormId) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Oculta todos los formularios y luego muestra solo el activo
        loginForm.classList.add('hidden');
        registerForm.classList.add('hidden');

        if (activeFormId === 'login') {
            loginForm.classList.remove('hidden');
        } else if (activeFormId === 'register') {
            registerForm.classList.remove('hidden');
        }
    }

    // 4. Lógica para el cambio de pestañas "INICIAR SESION" / "REGISTRATE"
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const formToActivate = tab.dataset.form; // 'login' o 'register'
            setActiveTabAndForm(formToActivate);
        });
    });

    // Asegúrate de que la pestaña de login y su formulario estén activos al cargar la modal
    setActiveTabAndForm('login');
});
*/


function mimodal() {
    const modal = new bootstrap.Modal('#modal',{});
    let btnInicioSesion = document.querySelector('#IniciarSesion');

    let btnCerrarSesion = document.querySelector('#CerrarSesion');

    btnInicioSesion.addEventListener('click', ()=>{
        abrirmodal(modal);
    }); 

     btnCerrarSesion.addEventListener('click', ()=>{
        console.log('cerrar');
        cerrarmodal(modal);
    }); 

}

function abrirmodal(modal){
    modal.show();
}

function cerrarmodal(modal){
    event.preventDefault(); 
    modal.hide();
}

document.addEventListener('DOMContentLoaded', mimodal);


