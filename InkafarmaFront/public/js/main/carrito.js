document.addEventListener('DOMContentLoaded',app);
let ListProductosCarrito=[];
let listDescripcionProducto=[];
let listMisDirecciones=[];
function app(){
    const carritoJSON = localStorage.getItem('carrito');
     const clienteJSON = localStorage.getItem('usuario');
  if (carritoJSON) {
    if(clienteJSON){
    const cliente=JSON.parse(clienteJSON);
    obtenerMisDirecciones(cliente);
    }
  } else {
    mostrarToast('No hay productos en el carrito');
  }
}

async function obtenerMisDirecciones(cliente){
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
        listMisDirecciones=data;   
      } catch (error) {
        alert(`Error al obtener lista de direcciones -carrito: ${error.message}`);
      }
}

function obtenerProductosId(){

  if(carrito && carrito.items.length>0){
        const ids = carrito.items.map(item => item.idProducto);
        obtenerDescripcionProducto(ids);
    }else{
        mostrarToast('No hay carrito');
    }
}

async function obtenerDescripcionProducto(ids){
    try {
            const response = await fetch(`http://localhost:8080/api/productos/por-ids`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(ids)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
                const data=await response.json();
                listDescripcionProducto = data || [];
                console.log('estoy aqui');
                 mostarListCarritoHTML();
            } catch (err) {
                console.error(err);
                mostrarToast('Error al obtener Descripcion Producto');
            }
}

function mostarListCarritoHTML(){
    const carritoJSON = localStorage.getItem('carrito');
    let carrito = JSON.parse(carritoJSON); 
    if(carrito && carrito.items.length>0){   
        console.log(listMisDirecciones);    
        const divlistCarrito=document.querySelector('#divlistCarrito');
        const divResumenCompra=document.querySelector('#divResumenCompra');      
        divlistCarrito.replaceChildren();
        divResumenCompra.replaceChildren();
        let subtotal=0;
        let stringHTML="";
            stringHTML=`
                         <h3 class="font-semibold text-lg mb-4">Inkafarma</h3>
                        <!-- Encabezado -->
                        <div class="flex text-gray-500 text-sm font-semibold border-b pb-2">
                            <div class="w-[40%]">PRODUCTOS</div>
                            <div class="w-[20%] text-start">CARACTERISTICAS</div>
                            <div class="w-[20%] text-center">CANTIDAD</div>
                            <div class="w-[10%] text-center">SUB TOTAL</div>
                            <div class="w-[10%] text-center"></div>
                        </div>
            `;
        const {items}=carrito;
        items.forEach(item => {
            const {cantidad,descuento,idItem,idProducto,nombreProducto,precio,urlimagen}=item;
            const Descproducto=listDescripcionProducto.find(d => d.idProducto === idProducto);
            let sumarCantidad=cantidad*precio;
            const {atributos,descripcion}=Descproducto;

            stringHTML+=`<div class="flex items-center py-4 border-b text-sm">
                    <!-- Producto -->
                    <div class="w-[40%] flex gap-3">
                        <img src="${urlimagen ? `http://localhost:8082/uploads/${urlimagen}` : '/img/1257286.png'}"
                            class="w-16 h-16 object-contain" />
                        <div>
                            <p class="font-medium text-gray-800">${nombreProducto}</p>
                            <p class="text-xs text-gray-500 uppercase truncate w-20">${descripcion}</p>
                        </div>
                    </div>
                    <!-- Catacteristicas -->
                    <div class="w-[20%] justify-center">`
                    if(atributos && atributos.length>0){
                         stringHTML+=`<ul class="flex gap-2 flex-wrap">`
                        atributos.forEach(atributo=>{
                            const {nombreAtributo,valor}=atributo;
                             stringHTML+=`<li><span class="uppercase font-bold">${nombreAtributo}: </span>${valor}</li>`
                        })
                        stringHTML+=`</ul>`
                        }else{
                                stringHTML+=`---`;
                        }
                    
                  stringHTML+=`</div>

                    <!-- Cantidad -->
                    <div class="w-[20%] flex items-center gap-3 justify-center">
                        <button class="text-gray-500 hover:text-red-600 text-xl" data-id="${idItem}" onclick="reducirCantidadCarrito(event)">  <i class="fas fa-trash"></i></button>
                        <span class="text-xl color-gray-700">${cantidad}</span>
                        <button class="bg-gray-200 px-2 rounded text-xl  hover:bg-green-500 hover:text-white" data-id="${idItem}" onclick="aumentarCantidadCarrito(event)">  <i class="fas fa-plus"></i></button>
                    </div>

                    <!-- Subtotal -->
                    <div class="w-[10%] text-center">`
                        if(descuento!==0){
                            const precioConDescuento = (precio * (1 - descuento))*cantidad;
                            subtotal+=precioConDescuento;
                            stringHTML+=`<div class="text-red-600 font-bold">S/ ${precioConDescuento.toFixed(2)}</div>
                                         <div class="text-gray-500 line-through">S/ ${sumarCantidad.toFixed(2)} </div>`
                            
                        }else{
                            subtotal+=sumarCantidad;
                            stringHTML+=`<div class="text-gray-800 font-semibold">S/ ${sumarCantidad.toFixed(2)}</div>`
                        }
                        
                stringHTML+=`</div>

                    <!-- Eliminar -->
                    <div class="w-[10%] text-center flex justify-center">
                        <button class="text-red-500 hover:underline"  data-id="${idItem}" onclick="eliminarDelCarrito(event)">Eliminar</button>
                    </div>
                </div>`;
        });
        let stringResultadoHTML="";
        stringResultadoHTML=`<h3 class="font-semibold text-lg mb-4">Resumen de compra</h3>
                <div class="flex justify-between text-sm mb-2">
                    <span>Subtotal</span>
                    <span>S/ ${subtotal.toFixed(2)}</span>
                </div>`
                if(listMisDirecciones){
                    const miDireccion=listMisDirecciones.find(direccion => direccion.principal === true);
                    if(miDireccion){
                      const {costoEnvio,direccionCompleta}=miDireccion;  
                      const total=costoEnvio+subtotal;
                      const descuentoOH=total*0.95;
                      stringResultadoHTML+=`<div class="flex justify-between text-sm mb-2">
                                                      <span>Costo de envío</span>
                                                      <span>S/ ${costoEnvio.toFixed(2)}</span>
                                                  </div>
                                                  <div class="flex justify-between font-bold text-base mb-2">
                                                      <span>Total a pagar</span>
                                                      <span>S/ ${total.toFixed(2)}</span>
                                                  </div>
                                                   <div class="flex justify-between font-bold text-base mb-2">
                                                      <span>Lugar de envio</span>
                                                      <span>${direccionCompleta}</span>
                                                  </div>
                                                  <div class="flex justify-between text-sm text-green-600 mb-4">
                                                      <span>Exclusivo oh! y oh! pay</span>
                                                      <span>S/ ${descuentoOH.toFixed(2)}</span>
                                                  </div>`
                    }else{
                        stringResultadoHTML+=` <div class="flex justify-between font-bold text-base mb-2">
                                                      <span>Lugar de envio</span>
                                                      <span>Seleccione un lugar de envio</span>
                                                  </div>`;
                    }
                  }else{
                        stringResultadoHTML+=` <div class="flex justify-between font-bold text-base mb-2">
                                                        <span>Lugar de envio</span>
                                                        <span>No tiene direcciones registrados</span>
                                                    </div>`;
                  }
                
                
               stringResultadoHTML+= `<button class="bg-green-600 text-white w-full py-2 rounded-lg hover:bg-green-700">
                                          Ir a comprar
                                      </button>`
        divlistCarrito.innerHTML=stringHTML;
        divResumenCompra.innerHTML=stringResultadoHTML;
    }else{
        const divlistCarrito=document.querySelector('#divlistCarrito');
        divlistCarrito.replaceChildren();
        divlistCarrito.innerHTML=`<h2>No tiene ningun producto agregado a su carrito</h2>`;
        mostrarToast("Lista carrito no encontrado");
    }
}

function reducirCantidadCarrito(e) {
  e.preventDefault();
  const idItem = e.currentTarget.dataset.id;
  const id = parseInt(idItem);

  const carritoJSON = localStorage.getItem('carrito');
  const carrito = JSON.parse(carritoJSON);
  const item = carrito.items.find(i => i.idItem === id);

  if (item) {
    const nuevaCantidad = item.cantidad - 1;

    if (nuevaCantidad > 0) {
      actualizarCantidadItem(item, nuevaCantidad, carrito);
    } else {
      mostrarToast('La cantidad debe ser mayor a 0');
    }
  }
}

function aumentarCantidadCarrito(e){
  e.preventDefault();
  const idItem = e.currentTarget.dataset.id;
  const id = parseInt(idItem);
  const carritoJSON = localStorage.getItem('carrito');
  const carrito = JSON.parse(carritoJSON);
  const item = carrito.items.find(i => i.idItem === id);

  if (item) {
    const nuevaCantidad = item.cantidad + 1;
    actualizarCantidadItem(item, nuevaCantidad, carrito);
  }
}

async function actualizarCantidadItem(item, nuevaCantidad, carrito) {
  try {
    const response = await fetch(`http://localhost:8080/api/carrito/item/${item.idItem}?cantidad=${nuevaCantidad}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    // Actualizar local
    item.cantidad = nuevaCantidad;
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostarListCarritoHTML();
    mostrarToast('Actualización correcta del item');
  } catch (err) {
    console.error(err);
    mostrarToast('Error al actualizar cantidad de item');
  }
}

function eliminarDelCarrito(e){
    e.preventDefault();
    const carritoJSON = localStorage.getItem('carrito');
    const carrito = JSON.parse(carritoJSON);
    const idItem = e.target.dataset.id;
    const id = parseInt(idItem);    
    if(id>0){
        eliminarDesItemCarrito(id,carrito);
    }
}

async function eliminarDesItemCarrito(id,carrito){
      try {
        const response = await fetch(`http://localhost:8080/api/carrito/item/${id}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        /*Borrar el item del localstorage*/
        carrito.items = carrito.items.filter(item => item.idItem !== id);
        localStorage.setItem('carrito', JSON.stringify(carrito));
        mostarListCarritoHTML();
        mostrarToast('se elimino correctamente');
      } catch (error) {
        alert(`Error al elimnar item carrito: ${error.message}`);
      }
}


