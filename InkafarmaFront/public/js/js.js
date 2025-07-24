const dropdown = document.getElementById('dropdownCategoria');
const menuCategoria = document.getElementById('menucategoria');
let listProductos = [];
let carrito = {};
let listDescuentosHome=[];
let objDireccion={};
let listCategoria=[];

/*Buscador de productos*/
const buscadorPro = document.querySelector('#buscadorPro');
const modalBuscador = document.querySelector('#modalBuscador');
const buscadorOverlay = document.querySelector('#buscadorOverlay');
const buscadorProducto = document.querySelector('#buscadorModal');
const dropdownResultados = document.querySelector('#dropdownResultadosCategoria');
document.addEventListener('DOMContentLoaded', app);
function app() {
  obtenerDecuentos();
  mostrarCategorias();
  eventoscategoria();
  actualizarTotalCarrito();
}
async function obtenerDecuentos() {
    try {
    const response = await fetch('http://localhost:8080/api/promociones/activas', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }
    const data = await response.json();
    listDescuentosHome=data;
  } catch (error) {
    alert(`Error al obtener descuesto: ${error.message}`);
  }
}
/*Obtener Categoras*/
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
    listCategoria=data;
    mostrarCategoriaHtml(data);

  } catch (error) {
    alert(`Error al obtenr categorais: ${error.message}`);
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
  const input = document.querySelector('#buscadorModal');
  
  const query = buscadorProducto.value.toLowerCase();
 dropdownResultados.replaceChildren(); // Limpiar resultados previos

  if (query.length === 0) {
    dropdownResultados.classList.add('hidden');
    return;
  }

  const resultados = listProductos.filter(producto =>
    producto.nombre.toLowerCase().includes(query)
  );

  if (resultados.length === 0) {
    dropdownResultados.innerHTML = '<div class="p-2 text-gray-500">No se encontraron productos</div>';
  } else {
    if(listDescuentosHome.length==0){
      obtenerDecuentos();
    }
    const divSugerencia = document.createElement('div');
    divSugerencia.classList.add('p-2', 'text-gray-700', 'font-bold');
    divSugerencia.textContent = 'Productos Sugeridos';
    dropdownResultados.appendChild(divSugerencia);
    resultados.forEach(producto => {
      const {idProducto,atributos,nombre,precio,imagenes}=producto;
      const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
      const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
      const item = document.createElement('div');
      item.className = 'p-3 hover:bg-gray-100 flex justify-between items-center';
      let StringHtml='';
        StringHtml= `
                        <div class="w-full flex items-center justify-between gap-4 py-3 border-b">
                        <!-- Imagen -->
                        <div class="w-1/6 flex justify-center">
                          <img
                            src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}"
                            alt="imagen"
                            class="w-20 h-20 object-contain rounded"
                          />
                        </div>

                        <!-- Nombre del producto -->
                        <div class="flex-1 px-2">
                          <p class="text-lg font-semibold text-gray-800 leading-snug">${nombre}</p>
                          <span class="text-xs text-gray-500">Ver detalle</span>
                        </div>

                        <!-- Precio -->
                        <div class="text-right">`
                     if (descuentoPro) {
                          const precioConDescuento = precio * (1 - descuentoPro.descuento);
                          StringHtml+= `
                            <span class="text-gray-400 line-through block">S/ ${precio.toFixed(2)}</span>
                            <span class="current-price font-semibold text-green-700">S/ ${precioConDescuento.toFixed(2)}</span>
                          `;
                        } else {
                          StringHtml+= `
                            <span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>
                          `;
                        }
           StringHtml+=`</div>
                        <!-- Botón -->
                        <div class="pl-2">
                          <button class="bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-4 rounded-lg text-sm transition" 
                                  onclick="agregarCarrito(event)"
                                  data-id="${idProducto}">
                                  <i class="fas fa-shopping-cart"></i>
                                  Agregar al carrito
                          </button>
                        </div>
                      </div>
                    `;
          item.innerHTML=StringHtml;
      dropdownResultados.appendChild(item);
    });
  }
  dropdownResultados.classList.remove('hidden');
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
/*Obtener Productos*/
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
    alert(`Error al obtener producto: ${error.message}`);
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
        localStorage.setItem('carrito', JSON.stringify(carrito));
        const divlistCarrito=document.querySelector('#divlistCarrito');
        if(divlistCarrito){
             obtenerProductosId();
        }  
      } catch (error) {
        alert(`Error al actualizar carrito: ${error.message}`);
      }
  }else{
      mostrarToast('Debes iniciar sesion sesión primero');
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

      const cliente = JSON.parse(localStorage.getItem('usuario'));
      if(cliente){
          agregarItemCarrito(idProducto,cliente.idCliente);
      }else{
        mostrarToast('Es necesario iniciar Sesion');
      }
}

async function agregarItemCarrito(idProducto,idCliente) {
    const productoCarrito = listProductos.find(producto => producto.idProducto == idProducto);
       
      if(productoCarrito){
          const{idProducto,imagenes,precio,nombre}=productoCarrito;
          const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
          let valorDescuento=0;
          if(descuentoPro){
            const {descuento}=descuentoPro;
            valorDescuento=descuento;
          }
          const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
          const itemBody={
          idProducto:idProducto,
          urlimagen:imagenProducto.urlImagen,
          cantidad:1,
          precio:precio,
          descuento:valorDescuento,
          nombreProducto:nombre
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

/*Mostrar carrito*/
async function mostrarCarrito(event){
  event.preventDefault();
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
        listCarrito=carrito;
        mostrarCarritoHTML(carrito);
        
      } catch (error) {
        alert(`Error al actualizar carrito: ${error.message}`);
      }
    }else{
      mostrarToast('Debes iniciar para ver el carrito de compras');
    }
}

function mostrarCarritoHTML(carrito){
  if(carrito){
    const {items}=carrito;
    if(items.length>0){
        const carritoModal=document.querySelector('#carritoModal');
        carritoModal.replaceChildren();
        let StrimgHTML='';
        StrimgHTML=`  <div class="flex justify-between items-center p-4 border-b">
                        <h2 class="text-lg font-bold">Mi carrito</h2>
                        <button onclick="document.getElementById('carritoModal').close()" class="text-2xl font-light">&times;</button>
                      </div>`;
        let subtotal=0;
        items.forEach(item=>{
              const {idItem,cantidad,descuento,nombreProducto,precio,urlimagen}=item;
              let sumarCantidad=cantidad*precio;
              StrimgHTML+=`<div class="p-4 border-b">
                            <div class="flex items-start gap-3">
                              <img src="${urlimagen ? `http://localhost:8082/uploads/${urlimagen}` : '/img/1257286.png'}"  class="w-16 h-16 object-contain rounded" />
                              <div class="flex-1 text-sm text-gray-800">
                                <p>${nombreProducto}</p>
                                <p class="text-xs mt-1">CANTIDAD: ${cantidad}</p>
                              </div>
                              <div class="text-right">`
                               if(descuento!==0){
                                      const precioConDescuento = (precio * (1 - descuento))*cantidad;
                                      subtotal+=precioConDescuento;
                                      StrimgHTML+=`<p class="text-sm line-through text-gray-400">S/ ${sumarCantidad.toFixed(2)}</p>
                                                   <p class="text-red-600 font-semibold">S/ ${precioConDescuento.toFixed(2)}</p>`;
                                }else{
                                      subtotal+=sumarCantidad;
                                      StrimgHTML+=`<p class="text-gray-800 font-semibold">S/ ${sumarCantidad.toFixed(2)}</p>`
                                      }
                          StrimgHTML+=` 
                                <button class="text-sm text-red-500 mt-1" onclick="eliminarItemCarrito(event)" data-id="${idItem}">Eliminar</button>
                              </div>
                            </div>
                          </div>`;
        });
        let pagarOH=0;
        if(subtotal>0){
          pagarOH=subtotal*0.95;
        }
        StrimgHTML+=` <div class="p-4 space-y-2">
                        <div class="flex justify-between text-sm">
                          <span>Subtotal</span>
                          <span>S/ ${subtotal.toFixed(2)}</span>
                        </div>
                        <div class="flex justify-between text-sm text-red-600 font-semibold">
                          <span>Exclusivo oh! y oh! pay</span>
                          <span>S/ ${pagarOH.toFixed(2)}</span>
                        </div>
                      </div>
                      <div class="px-4 pb-6">
                        <div class="flex justify-end gap-4">
                          <button class="bg-green-600 hover:bg-green-700 text-white text-sm px-5 py-2 rounded-full transition"
                            onclick="dirigirCarritoDetalle(event)">
                            Comprar ahora
                          </button>
                        </div>
                      </div>`;
        carritoModal.innerHTML=StrimgHTML;
        carritoModal.showModal();
    }else{
      const carritoModal=document.querySelector('#carritoModal');
      if (carritoModal) {
         carritoModal.close();
      }
      mostrarToast('Debes agregar un producto para mostrar el carrito');
    }
  }else{
    mostrarToast('Debes agrear un producto al carrito');
  }
  
}

async function eliminarItemCarrito(e){
    e.preventDefault();
    const idItem=e.target.dataset.id;
    if (!idItem || isNaN(idItem) || idItem <= 0) {
        mostrarToast('Item no válido o no encontrado');
        return;
      }
      try {
        const response = await fetch(`http://localhost:8080/api/carrito/item/${idItem}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        mostrarCarrito(e);
        actualizarTotalCarrito();
        mostrarToast('Se elimino correctamente');
      } catch (error) {
        alert(`Error al elimnar item carrito: ${error.message}`);
      }
}

/*Buscador de modal*/

let autocomplete;
const autocompleteElement = document.getElementById('autocomplete');
function initAutocomplete() {
      const input = document.getElementById("autocomplete");
      autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "pe" },
        fields: ["formatted_address", "geometry"],
      });

      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          document.getElementById("output").textContent = "Dirección no válida.";
          return;
        }

        const lat = place.geometry.location.lat();
        const lng = place.geometry.location.lng();
        const address = place.formatted_address;
        document.getElementById("output").replaceChildren();
        objDireccion["direccionCompleta"] = address;
        objDireccion["latitud"] = lat;
        objDireccion["longitud"] = lng;
        document.getElementById("output").innerHTML = `
          <p>Dirección: ${address}</p>
          <p>Latitud: ${lat}</p>
          <p>Longitud: ${lng}</p>
        `;
      });
}

function abrirModalAgregarDireccion(e){
  e.preventDefault();
  const cliente = JSON.parse(localStorage.getItem('usuario'));
  if(cliente){
     document.getElementById('modalDireccion').classList.remove('hidden');
  document.getElementById('overlayDireccion').classList.remove('hidden');  
  }else{
    mostrarToast('Es necesario iniciar Sesion');
  }
 
}
function cerrarModalAgregarDireccion() {
  document.getElementById('modalDireccion').classList.add('hidden');
  document.getElementById('overlayDireccion').classList.add('hidden');
}

function abrirModalListDireccion(e){
    e.preventDefault();
    const cliente = JSON.parse(localStorage.getItem('usuario'));
      if(cliente || cliente.idCliente){
          obtenerListDirecciones(cliente);
      }else{
        mostrarToast('Es necesario iniciar Sesion');
      }
   
}
function cerrarModalListDireccion() {
    document.getElementById("modalListDirecciones").classList.remove("flex");
    document.getElementById("modalListDirecciones").classList.add("hidden");
}

async function obtenerListDirecciones(cliente){
      try {
        const response = await fetch(`http://localhost:8080/api/clientes/direcciones/${cliente.idCliente}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const text = await response.text(); // leer el cuerpo como texto
        const data = text ? JSON.parse(text) : []
        console.log(data);
        mostrarDireccionesHTML(data);
       
      } catch (error) {
        alert(`Error al obtener lista de direcciones: ${error.message}`);
      }

}

function mostrarDireccionesHTML(direcciones){
    const divResultadoDirecciones=document.querySelector('#resultadoDirecciones');
    divResultadoDirecciones.replaceChildren();
    if(direcciones && direcciones.length>0){
        let stringDirecciones="";
        direcciones.forEach(direccion=>{
            const {id,tipoDireccion,direccionCompleta,principal}=direccion;
            stringDirecciones+=`<div class="border rounded-xl p-4 flex justify-between items-center gap-4 hover:shadow">
                              <!-- Radio button -->
                              <div class="w-fit">
                                  <input type="radio" name="rbDireccion" value="${id}" class="accent-green-600 w-5 h-5 cursor-pointer"
                                      ${principal ? 'checked' : ''} />
                              </div>
                              <!-- Dirección -->
                              <div class="flex-1">
                                  <p class="font-semibold text-gray-800 uppercase">${tipoDireccion}</p>
                                  <p class="text-gray-600 text-sm">${direccionCompleta}</p>
                              </div>
                              <!-- Botón Eliminar -->
                              <button class="text-gray-500 hover:text-gray-700 px-3 py-1 rounded transition hover:bg-gray-100"
                                      data-id="${id}" onclick="eliminarDireccion(event)" data-id="${id}">
                                  <i class="fas fa-trash-alt mr-1"></i> Eliminar
                              </button>
                              </div>`;
        })
      divResultadoDirecciones.innerHTML=stringDirecciones;
    }else{
        let stringHTMl="";
        stringHTMl=" <span>No tiene registrado ninguna dirección</span>"
        divResultadoDirecciones.innerHTML=stringHTMl;
      }
    document.getElementById("modalListDirecciones").classList.remove("hidden");
    document.getElementById("modalListDirecciones").classList.add("flex");
}

/*Guardar Direccion*/
async function validarDireccion(e){
  e.preventDefault();
  const cliente = JSON.parse(localStorage.getItem('usuario'));
  const referencia=document.querySelector('#referencia').value;
  const seleccionada = document.querySelector('input[name="tipo"]:checked');
  if(cliente){
      console.log(objDireccion);
      if (objDireccion.direccionCompleta &&
        objDireccion.latitud != null && objDireccion.longitud != null) {
          if(referencia.trim()!=""){
            if(seleccionada){
                 try {
                      const objConsulta={
                        latitud:objDireccion.latitud,
                        longitud:objDireccion.longitud
                      }
                      const response = await fetch(`http://localhost:8080/api/zonas/validar`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(objConsulta)
                      });
                      if (!response.ok) {
                        const errorText = await response.text();
                        throw new Error(errorText);
                      }
                      const data=await response.json();
                      console.log(data);
                      if(data.dentroZona==true){
                           objDireccion = {
                          ...objDireccion,
                          idZonaCobertura: data.id,
                          costoEnvio: data.costoEnvio,
                          nombreZona: data.nombreZona,
                          tiempoEntregaEstimadoMinutos:data.tiempoEntregaEstimadoMinutos,
                          cliente:{
                          idCliente:cliente.idCliente
                          },
                          tipoDireccion:seleccionada.value
                            };
                         guardarDireccion(objDireccion);
                      }else{
                        mostrarToast("La direccion esta fuera de la zona");
                      }
                     

                    } catch (error) {
                      alert(`Error al validar direcciones: ${error.message}`);
                    }
            }else{
              mostrarToast('Es necesario selecionar un tipo');
            }
          }else{
            mostrarToast('Es necesario ingresar una referencia');
          }
          

      }else{
        mostrarToast('La direccion no tiene longitud y latitud');
      }
    }else{
      mostrarToast('Es necesario tener sesion iniciada');
    }
}

async function guardarDireccion(objDireccion){
    if(objDireccion){
       console.log(objDireccion);
        try {
            const response = await fetch(`http://localhost:8080/api/clientes/registrarDireccion`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(objDireccion)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const cliente = JSON.parse(localStorage.getItem('usuario'));
            obtenerListDirecciones(cliente);
            cerrarModalAgregarDireccion();
            mostrarToast('Se guardo correctamente al carrito');
            } catch (err) {
                console.error(err);
                mostrarToast('Error al editar la categoría');
            }
    }
}

/*Eliminar direcciones*/
async function eliminarDireccion(e){
  e.preventDefault();

  const idDireccion=e.target.dataset.id;
  if(idDireccion>0){
    console.log(idDireccion);
     try {
            const response = await fetch(`http://localhost:8080/api/clientes/direccionDesactivar/${idDireccion}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' }, 
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const cliente = JSON.parse(localStorage.getItem('usuario'));
            obtenerListDirecciones(cliente);
          }catch (err) {
            mostrarToast('Error al eliminar direccion');
        }

   }
}

/*Seleccionar direcciones*/
async function selectDireccionPrincipal(e){
    e.preventDefault();
    const seleccionado = document.querySelector('input[name="rbDireccion"]:checked');
    if(seleccionado){
      const valor = seleccionado.value;
      const cliente = JSON.parse(localStorage.getItem('usuario'));
      if(cliente){
          try {

            const response = await fetch(`http://localhost:8080/api/clientes/direccion/principal?idDireccion=${valor}&idCliente=${cliente.idCliente}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            
             const divlistCarrito=document.querySelector('#divlistCarrito');
              if(divlistCarrito){
                location.reload();
              }else{
                  obtenerListDirecciones(cliente);
                  mostrarToast('Actualización de direccion correctamente');
              }
            
        } catch (err) {
            console.error(err);
            mostrarToast('Erro al seleccionar Principal');
        }
      }else{
        mostrarToast('Es necesario tener iniciada la sesion');
      }
    }else{
      mostrarToast('No hay una direccion seleccionada');
    }
}

function dirigirCarritoDetalle(e){
  e.preventDefault();
  if(carrito){
     // Guardar en localStorage

    console.log(carrito);
    window.location.href = "/main/carrito";
  }else{
    mostrarToast('Es necesario tener un producto en el carrito');
  }
}