const dropdown = document.getElementById('dropdownCategoria');
const menuCategoria = document.getElementById('menucategoria');
let listProductos = [];
let carrito = {};
/*Buscador de productos*/
const buscadorPro = document.querySelector('#buscadorPro');
const modalBuscador = document.querySelector('#modalBuscador');
const buscadorOverlay = document.querySelector('#buscadorOverlay');
const buscadorProducto = document.querySelector('#buscadorModal');
const dropdownResultados = document.querySelector('#dropdownResultadosCategoria');

document.addEventListener('DOMContentLoaded', app);
function app() {
  mostrarCategorias();
  eventoscategoria();
  actualizarTotalCarrito();
}

async function mostrarCategorias() {
  try {
    const response = await fetch('http://localhost:8080/api/catalogo/categorias', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    console.log(data);
    mostrarCategoriaHtml(data);

  } catch (error) {
    alert(`Error al iniciar sesión: ${error.message}`);
  }
}

function mostrarCategoriaHtml(data) {
  menuCategoria.replaceChildren();
  let stringCategoriaHtml = "";
  if (data.length > 0) {
    stringCategoriaHtml += `<ul class="py-2 text-sm text-gray-700">`;
    data.forEach(categoria => {
      const { idCategoria, nombre } = categoria;
      stringCategoriaHtml += `<a href="#"><li class="px-4 py-2 hover:bg-gray-100 cursor-pointer">${nombre}</li></a>`
    });
    stringCategoriaHtml += `</ul>`
    menuCategoria.innerHTML = stringCategoriaHtml;
  }

}

function eventoscategoria() {
  dropdown.addEventListener('mouseenter', () => {
    menuCategoria.classList.remove('hidden');
  });

  dropdown.addEventListener('mouseleave', () => {
    menuCategoria.classList.add('hidden');
  });
}


/*Buscador de Productos*/

function buscarProducto() {
  const input = document.getElementById('buscadorModal');
  const dropdown = document.getElementById('dropdownResultadosCategoria');
  const query = input.value.toLowerCase();

  dropdown.innerHTML = ''; // Limpiar resultados previos

  if (query.length === 0) {
    dropdown.classList.add('hidden');
    return;
  }

  const resultados = listProductos.filter(producto =>
    producto.nombre.toLowerCase().includes(query)
  );

  if (resultados.length === 0) {
    dropdown.innerHTML = '<div class="p-2 text-gray-500">No se encontraron productos</div>';
  } else {
    const divSugerencia = document.createElement('div');
    divSugerencia.classList.add('p-2', 'text-gray-700', 'font-bold');
    divSugerencia.textContent = 'Productos Sugeridos';
    dropdown.appendChild(divSugerencia);
    resultados.forEach(producto => {
      const item = document.createElement('div');
      item.className = 'p-3 hover:bg-gray-100 flex justify-between items-center';
      const imagenProducto = producto.imagenProductoList.find(imagen => imagen.esPrincipal === true);
      item.innerHTML = `
                        <div class="w-full flex items-center justify-between gap-4 py-3 border-b">
                        <!-- Imagen -->
                        <div class="w-1/6 flex justify-center">
                          <img
                            src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlimagen}` : '/img/1257286.png'}"
                            alt="imagen"
                            class="w-20 h-20 object-contain rounded"
                          />
                        </div>

                        <!-- Nombre del producto -->
                        <div class="flex-1 px-2">
                          <p class="text-lg font-semibold text-gray-800 leading-snug">${producto.nombre}</p>
                          <span class="text-xs text-gray-500">Ver detalle</span>
                        </div>

                        <!-- Precio -->
                        <div class="text-right">
                          <p class="text-green-600 font-bold text-base">S/ ${producto.precio.toFixed(2)}</p>
                        </div>

                        <!-- Botón -->
                        <div class="pl-2">
                          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-full text-sm transition" 
                                  onclick="agregarCarrito(event)"
                                  data-id="${producto.idProducto}" 
                                  data-imagen="${imagenProducto ? imagenProducto.urlimagen : '/img/1257286.png'}">
                          >
                            Agregar al carrito
                          </button>
                        </div>
                      </div>
                    `;
      
      dropdown.appendChild(item);
    });
  }

  dropdown.classList.remove('hidden');
}

function mostrarDropdown() {
  const dropdown = document.getElementById('dropdownResultados');
  if (dropdown.innerHTML.trim() !== '') {
    dropdown.classList.remove('hidden');
  }
}

//Abrir buscador de productos

function abrirBuscador() {
  modalBuscador.classList.remove('hidden');
  buscadorOverlay.classList.remove('hidden');
  buscadorProducto.focus();
  if (listProductos.length == 0) {
    obtenerProductos();
  }
}
// Cerrar buscador de productos
function cerrarBuscador() {
  modalBuscador.classList.add('hidden');
  buscadorOverlay.classList.add('hidden');
  buscadorProducto.value = '';
  dropdownResultados.classList.add('hidden');
}
// Cerrar con ESC
document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape') cerrarBuscador();
});

async function obtenerProductos() {
  try {
    const response = await fetch('http://localhost:8080/api/catalogo/productos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    listProductos = await response.json();
    console.log(listProductos);

  } catch (error) {
    alert(`Error al iniciar sesión: ${error.message}`);
  }
}


/*Apartado de carrito*/
async function actualizarTotalCarrito() {
  const cliente = JSON.parse(localStorage.getItem('usuario'));
  if (cliente) {
      try {
        const response = await fetch(`http://localhost:8080/api/carrito/${cliente.idCliente}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        carrito = await response.json();
        const totalCarrito=document.querySelector('.totalCarrito');
        totalCarrito.textContent=carrito.items.length;
      } catch (error) {
        alert(`Error al iniciar sesión: ${error.message}`);
      }
  }
}


function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000); // Oculta después de 3 segundos
}


/*Agregar Carrito*/
function agregarCarrito(event){
      event.preventDefault();
      const idProducto=event.target.dataset.id;
      const urlimagen=event.target.dataset.imagen;
      const cliente = JSON.parse(localStorage.getItem('usuario'));
      if(cliente){
          agregarItemCarrito(idProducto,urlimagen,cliente.idCliente);
      }else{
        mostrarToast('Es necesario iniciar Sesion');
      }
}

async function agregarItemCarrito(idProducto,urlimagen,idCliente) {
      let productoCarrito={};
      listProductos.forEach(producto=>{
          if(producto.idProducto==idProducto){
            productoCarrito=producto;
          }
      })
      if(productoCarrito){
          const itemBody={
          idProducto:idProducto,
          urlimagen:urlimagen,
          cantidad:1,
          precioUnitario:productoCarrito.precio,
          nombreProducto:productoCarrito.nombre
           }
           try {
            const response = await fetch(`http://localhost:8080/api/carrito/${idCliente}/agregar`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(itemBody)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            actualizarTotalCarrito();
            mostrarToast('Se agrego al carrito correctamente');
            } catch (err) {
                console.error(err);
                mostrarToast('Error al editar la categoría');
            }

      }else{
        mostrarToast('Producto no encontrado');
      }
      
}