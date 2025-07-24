document.addEventListener('DOMContentLoaded', app)

function app() {
  const btnLogin = document.querySelector('#btnLogin');
  btnLogin.addEventListener('click', iniciarSesion);
  
  mostrarHtml();
}

function mostrarHtml() {
  const divIniciarSesion = document.querySelector('#IniciarSesion');

  divIniciarSesion.replaceChildren(); //limpiar html
  const usuario = JSON.parse(localStorage.getItem('usuario'));
  if (usuario && usuario.idCliente && !isNaN(usuario.idCliente) && usuario.idCliente > 0) {
    divIniciarSesion.classList.add('relative', 'inline-block', 'text-left');
    
    const { nombre, apellidoPaterno, apellidoMaterno } = usuario;
    divIniciarSesion.innerHTML = `  <button id="userMenuButton" type="button"
                                        class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500">
                                        <i class="fas fa-user text-gray-500"></i>
                                        <span class="hidden sm:inline truncate max-w-[120px]">${nombre} ${apellidoPaterno}</span>
                                        <i class="fas fa-chevron-down text-gray-400 text-sm"></i>
                                    </button>
                                    <!-- Menú desplegable -->
                                    <div id="userDropdown"
                                        class="hidden absolute right-0 mt-2 w-48 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
                                        <div class="py-1">
                                            <a href="#"
                                                class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <i class="fas fa-user-circle mr-2"></i>
                                                Mi cuenta
                                            </a>
                                            <button onclick="cerrarSesion()"
                                                class="w-full text-left flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                                <i class="fas fa-sign-out-alt mr-2"></i>
                                                Cerrar sesión
                                            </button>
                                        </div>
                                    </div>
                                    `;
    
    const button = document.getElementById('userMenuButton');
    const menu = document.getElementById('userDropdown');
    button.addEventListener('click', () => {
      menu.classList.toggle('hidden');
    });
  } else {
    // Mostrar modal desde el botón
    divIniciarSesion.innerHTML = `  <a href="#" class="colorText-1" id="btnLoguinUser">
                                      <i class="fa-solid fa-bag-shopping"></i>
                                      <span>Inicia Sesión</span>
                                  </a>`
      ;
      const btnLoguinUser=document.querySelector('#btnLoguinUser');
      btnLoguinUser?.addEventListener('click', e => {
        e.preventDefault();
        document.getElementById('modalLoginRegistro').classList.remove('hidden');
        showTab('login');
      });

  }
}

async function iniciarSesion() {
  const usuario = document.querySelector('#usuarioInput').value;
  const clave = document.querySelector('#claveInput').value;
  try {
    const response = await fetch('http://localhost:8080/api/usuarios/login-cliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ usuario: usuario, clave: clave })
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    // Guardar sesión solo del usuario
    localStorage.setItem('usuario', JSON.stringify(data));
    document.getElementById('modalLoginRegistro').classList.add('hidden');
    mostrarHtml();
    mostrarToast('Bienvenida', data.nombre);

  } catch (error) {
    alert(`Error al iniciar sesión: ${error.message}`);
  }
}

// Ejemplo de función de cierre de sesión
function cerrarSesion() {
  localStorage.removeItem('usuario');
  mostrarHtml();
  /*window.location.href = "/login"; */
}

//Cunsion para mostrar el iniciar sesion
function showTab(tab) {
    const loginTab = document.getElementById('login-tab');
    const registerTab = document.getElementById('register-tab');
    const loginBtn = document.getElementById('tab-login');
    const registerBtn = document.getElementById('tab-register');

    const isLogin = tab === 'login';

    loginTab.classList.toggle('hidden', !isLogin);
    registerTab.classList.toggle('hidden', isLogin);

    loginBtn.classList.toggle('text-green-700', isLogin);
    loginBtn.classList.toggle('border-green-600', isLogin);
    loginBtn.classList.toggle('text-gray-500', !isLogin);

    registerBtn.classList.toggle('text-green-700', !isLogin);
    registerBtn.classList.toggle('border-green-600', !isLogin);
    registerBtn.classList.toggle('text-gray-500', isLogin);
  }


function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000); // Oculta después de 3 segundos
}