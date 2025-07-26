document.addEventListener('DOMContentLoaded',app);
let objCupon={};
let listDescripcionProducto=[];
function app(){
    const cliente = JSON.parse(localStorage.getItem('usuario'));
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const direccion=JSON.parse(localStorage.getItem('direccion'));
    if(cliente && carrito && direccion && carrito && carrito.items){
       const ids = carrito.items.map(item => item.idProducto);
       obtenerDescripcionProducto(ids);
    }else{
        mostrarToast('Error al cargar pagina');
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
                console.log(listDescripcionProducto);
                mostarResumenVentaHTML();
            } catch (err) {
                console.error(err);
                mostrarToast('Error al obtener Descripcion Producto');
    }
}
async function mostarResumenVentaHTML(){
    const divDescripcionPedido=document.querySelector('#divDescripcionPedido');
    const divResumenPedido=document.querySelector('#divResumenPedido');
    const cliente = JSON.parse(localStorage.getItem('usuario'));
    const carrito = JSON.parse(localStorage.getItem('carrito'));
    const direccion=JSON.parse(localStorage.getItem('direccion'));
    const {direccionCompleta,referencia,tipoDireccion,tiempoEntregaEstimadoMinutos,costoEnvio}=direccion;
    const fechaEntrega=rangoConMinutosExtra(tiempoEntregaEstimadoMinutos);
    divDescripcionPedido.replaceChildren();
    divResumenPedido.replaceChildren();
    let stringDescripcionPedido="";
        stringDescripcionPedido=`  <div class="bg-gray-50 rounded-lg shadow-sm py-4 px-8">
                                            <!-- Título -->
                                            <h2 class="text-xl font-semibold mb-4 text-gray-800">¡Ya falta poco para finalizar tu compra!</h2>
                                            <!-- Pregunta -->

                                            <div class="mb-4">
                                                <label class="block p-3 rounded-lg border border-blue-500 bg-white shadow-sm">
                                                    <!-- Pregunta dentro del label -->
                                                    <p class="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-4">
                                                        <i class="fas fa-map-marker-alt text-green-600"></i>
                                                        ¿En dónde recibirás tu pedido?
                                                    </p>

                                                    <div class="w-full">
                                                        <p class="font-medium text-gray-900">Tu pedido recibirás en:</p>
                                                        <!-- Dirección actual -->
                                                        <div class="flex justify-between items-center mt-3 px-4 py-2 border rounded-lg bg-gray-50">
                                                            <div class="flex items-center gap-8 text-sm">
                                                                <i class="fas fa-motorcycle text-green-600"></i>
                                                                <div>
                                                                    <p class="font-medium text-gray-700 uppercase">${tipoDireccion}</p>
                                                                    <p class="text-gray-500">${direccionCompleta}</p>
                                                                </div>
                                                                <div>
                                                                    <p class="font-medium text-gray-700 uppercase">Referencia</p>
                                                                    <p class="text-gray-500">${referencia}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                            <div class="space-y-6">
                                                <!-- Tipo de entrega -->
                                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                                    <h3 class="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                                                        <i class="fas fa-calendar-alt text-green-600"></i>
                                                        ¿Cuanto tiempo se demorará la entrega de mi pedido?
                                                    </h3>
                                                    <label class="block p-4 border border-blue-500 rounded-lg bg-blue-50">
                                                        <div class="mt-4 flex justify-between items-start text-sm text-gray-700">
                                                            <!-- Ícono + texto -->
                                                            <div class="flex items-start gap-2">
                                                                <i class="fas fa-shipping-fast text-green-600 mt-1"></i>
                                                                <div>
                                                                    <p class="font-medium text-green-700">Tu pedido llegará en menos de ${tiempoEntregaEstimadoMinutos} minutos.</p>
                                                                    <p class="text-gray-500">Desde el momento que finalizas tu compra.</p>
                                                                </div>
                                                            </div>

                                                            <!-- Precio a la derecha -->
                                                            <div>
                                                                <span
                                                                    class="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded-full whitespace-nowrap">S/
                                                                    ${costoEnvio.toFixed(2)} envío</span>
                                                            </div>
                                                        </div>
                                                    </label>
                                                </div>
                                                    <!-- Comprobante de pago -->
                                                    <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                                                    <h3 class="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                        <i class="fas fa-receipt text-green-600"></i>
                                                        Solicita un comprobante de pago
                                                    </h3>
                                                    <p class="text-sm text-gray-600 mb-4">
                                                        Activa esta opción si deseas que te enviemos factura, de lo contrario te enviaremos boleta.
                                                    </p>

                                                    <!-- Toggle -->
                                                    <label class="flex items-center gap-3 cursor-pointer mb-4">
                                                        <input type="checkbox" class="sr-only peer" id="solicitarFactura">
                                                        <div class="w-11 h-6 bg-gray-300 peer-checked:bg-green-500 rounded-full relative transition">
                                                        <div class="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5"></div>
                                                        </div>
                                                        <span class="text-sm text-gray-800">Solicitar factura</span>
                                                    </label>

                                                    <!-- Campos adicionales -->
                                                    <div id="camposFactura" class="hidden space-y-4">
                                                        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                                        <div>
                                                            <label class="block text-sm font-medium text-gray-700 mb-1">RUC (11 dígitos)</label>
                                                            <input type="text" placeholder="Ingresa el RUC"
                                                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            id="txtRUC"
                                                            >
                                                        </div>
                                                        <div>
                                                            <label class="block text-sm font-medium text-gray-700 mb-1">Razón social</label>
                                                            <input type="text" placeholder="Ingresa la razón social"
                                                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            id="txtRazonSocial"
                                                            >
                                                        </div>
                                                        </div>
                                                        <div>
                                                        <label class="block text-sm font-medium text-gray-700 mb-1">Domicilio legal</label>
                                                        <input type="text" placeholder="Ingresa el domicilio legal"
                                                            class="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                                                            id="txtDomicioLegal"
                                                            >
                                                        </div>
                                                    </div>
                                                    </div>
                                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">

                                                    <!-- Título -->
                                                    <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                        <i class="fas fa-hand-holding-usd text-yellow-500"></i>
                                                        ¿Cómo quieres pagar?
                                                    </h3>
                                                            <div class="grid grid-cols-3 sm:grid-cols-4 gap-4 border border-blue-500 rounded-lg p-4">

                                                            <!-- Visa -->
                                                            <label class="flex justify-center items-center p-2 border rounded-lg cursor-pointer hover:border-blue-400 
                                                                            has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition">
                                                                <input type="radio" name="tarjeta" class="sr-only" checked value="Visa">
                                                                <img src="/img/48-visa.jpg" alt="Visa" class="h-6">
                                                            </label>

                                                            <!-- Mastercard -->
                                                            <label class="flex justify-center items-center p-2 border rounded-lg cursor-pointer hover:border-blue-400 
                                                                            has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition">
                                                                <input type="radio" name="tarjeta" class="sr-only" value="Mastercard">
                                                                <img src="/img/48-mastercard.jpg" alt="Mastercard" class="h-6">
                                                            </label>

                                                            <!-- Mercado Pago -->
                                                            <label class="flex justify-center items-center p-2 border rounded-lg cursor-pointer hover:border-blue-400 
                                                                            has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition">
                                                                <input type="radio" name="tarjeta" class="sr-only" value="Mercado Libre">
                                                                <img src="/img/48-mercadopago.png" alt="Mercado Libre" class="h-6">
                                                            </label>

                                                            <!-- Interbank -->
                                                            <label class="flex justify-center items-center p-2 border rounded-lg cursor-pointer hover:border-blue-400 
                                                                            has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition">
                                                                <input type="radio" name="tarjeta" class="sr-only" value="Interbank">
                                                                <img src="/img/48-IBK-Visa.jpg" alt="Interbank" class="h-6">
                                                            </label>
                                                            </div>
                                                </div>
                                                <div class="bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-4">

                                                    <!-- Título -->
                                                    <h3 class="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                                        <i class="fas fa-file-alt text-green-600"></i>
                                                        Comprueba tus datos antes de finalizar tu compra
                                                    </h3>

                                                    <!-- Información -->
                                                    <ul class="space-y-3 text-sm text-gray-700">
                                                        <li class="flex gap-2 items-start">
                                                            <i class="fas fa-box text-gray-500 mt-1"></i>
                                                            <span><strong>Despachado por:</strong> <span class="text-blue-700">Inkafarma</span></span>
                                                        </li>
                                                        <li class="flex gap-2 items-start">
                                                            <i class="fas fa-map-marker-alt text-gray-500 mt-1"></i>
                                                            <span><strong>Lugar de entrega:</strong> <span class="uppercase">${tipoDireccion}:</span>
                                                                <span class="text-blue-700 uppercase"> ${direccionCompleta}</span></span>
                                                        </li>
                                                        <li class="flex gap-2 items-start">
                                                            <i class="fas fa-clock text-gray-500 mt-1"></i>
                                                            <span><strong>Fecha y hora de entrega:</strong> ${fechaEntrega}</span>
                                                        </li>
                                                        <li class="flex gap-2 items-start">
                                                            <i class="fas fa-file-invoice-dollar text-gray-500 mt-1"></i>
                                                            <span><strong>Comprobante de pago:</strong> <span id="comprobantePago">Boleta</span></span>
                                                        </li>
                                                        <li class="flex gap-2 items-start">
                                                            <i class="fas fa-credit-card text-gray-500 mt-1"></i>
                                                            <span><strong>Medio de pago:</strong> <span id="medioPago">Visa</span></span>
                                                        </li>
                                                    </ul>

                                                    <!-- Botón -->
                                                    <div class="text-right">
                                                        <button
                                                            class="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-lg transition"
                                                            onclick="checkoutCompra(event)">
                                                            <i class="fas fa-check-circle"></i> Finalizar compra
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>`
            
        let stringResumenPedido="";
            stringResumenPedido=`<div class="bg-white  rounded-lg shadow-sm border border-gray-200 space-y-4 w-full max-w-md py-4 px-6">
                                    <!-- Título -->
                                    <h3 class="text-lg font-semibold text-gray-800">Resumen de pedido</h3>
                                    <!-- Producto -->
                                    <div>`;
            let subtotal=0;
            let totalSinDescuentos=0;
                       carrito.items.forEach(item=>{
                            const {cantidad,descuento,urlimagen,idProducto,nombreProducto,precio}=item;
                            const descripcionPro=listDescripcionProducto.find(p=>(idProducto===idProducto));
                            const {atributos,nombre}=descripcionPro;
                            let stringAtributo="";
                            let sumarCantidad=0;
                            sumarCantidad=cantidad*precio;
                            totalSinDescuentos+=sumarCantidad;
                    stringResumenPedido+=`<div class="flex gap-4 items-start py-2">
                                            <img src="${urlimagen ? `http://localhost:8082/uploads/${urlimagen}` : '/img/1257286.png'}" alt="Producto ${nombreProducto}" class="w-16 h-16 rounded border">
                                            <div class="flex-1 text-sm text-gray-700">
                                                <p class="font-medium">${nombreProducto}</p>`
                                                   if(atributos.length>0){
                                                    atributos.forEach(atributo=>{
                                                        const {nombreAtributo,valor}=atributo;
                                    stringResumenPedido+= `<span class="text-xs text-pink-600 font-semibold">${nombreAtributo}:</span>
                                                           <span class="text-xs text-pink-600">${valor} - </span>`;
                                                    })
                                                    }
                        if(descuento!==0){
                          const precioConDescuento = (precio * (1 - descuento))*cantidad;
                                subtotal+=precioConDescuento;
                                stringResumenPedido+=`<p class="text-sm line-through text-gray-400">S/ ${sumarCantidad.toFixed(2)}</p>
                                                      <p class="text-sm">S/ ${precioConDescuento.toFixed(2)}</p>`
                        }else{
                                subtotal+=sumarCantidad;
                            stringResumenPedido+=`<p class="text-sm">S/ ${sumarCantidad.toFixed(2)}</p>`
                        }
                        
                            stringResumenPedido+=`<p class="text-sm mt-1">Cantidad: ${cantidad}</p>
                                            </div>
                                        </div>`
                        })          
                   
                stringResumenPedido+=` </div>`;
                if(Object.keys(objCupon).length === 0){
                            let total=subtotal+costoEnvio;
                            totalSinDescuentos+=costoEnvio;
                            let ahorrando=totalSinDescuentos-total;
                            stringResumenPedido+=`<!-- Cupón -->
                                    <div class="mt-4">
                                        <p class="text-sm font-medium text-gray-800 mb-2">¿Tienes un cupón o código de descuento?</p>
                                        <div class="flex">
                                            <input type="text" placeholder="Ingresa tu código"
                                                class="flex-1 border rounded-l px-3 py-2 text-sm text-gray-800 border-gray-300 focus:outline-none focus:ring-1 focus:ring-blue-500" 
                                                id="txtCodigo"/>
                                            <button
                                                class="bg-gray-100 border border-gray-300 rounded-r px-4 text-sm font-semibold text-gray-600 hover:bg-gray-200"
                                                onclick="canjearCupon(event)">
                                                Aplicar
                                            </button>
                                        </div>
                                    </div>
                                    <!-- Totales -->
                                    <div class="text-sm space-y-1 pt-4 border-t">
                                        <div class="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>S/ ${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Costo de envío</span>
                                            <span>S/ ${costoEnvio.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between font-semibold pt-2">
                                            <span>Total</span>
                                            <span>S/ ${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <!-- Ahorro -->
                                    <div class="mt-4 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                                        <i class="fas fa-hand-holding-usd text-yellow-500 text-xl mt-1"></i>
                                        <div class="text-sm text-gray-800">
                                            <p>En esta compra estás ahorrando en total</p>
                                            <p class="text-lg font-bold text-red-500 mt-1">S/ ${ahorrando.toFixed(2)} <span
                                                    class="text-sm font-medium">Exclusivo</span></p>
                                            <p class="text-xs text-gray-500 mt-1">*Ahorro basado en el precio regular</p>
                                        </div>
                                    </div>
                                </div>`;
                }else{
                    let descuentoCupon = subtotal * objCupon.descuento;
                        totalSinDescuentos = totalSinDescuentos + costoEnvio;    
                    let total = subtotal+costoEnvio- descuentoCupon;    
                    let ahorrando = totalSinDescuentos - total;    
                    stringResumenPedido+=`<!-- Cupón -->
                                    <div class="mt-4">
                                        <p class="text-sm font-medium text-gray-800 mb-2">Felicidades Acabas de canjear el cupon:</p>
                                        <div class="flex items-center gap-2 w-full justify-end">
                                            <span>${objCupon.codigo}</span>
                                            <a href="#" 
                                            class="inline-flex items-center text-pink-600 hover:underline text-sm font-medium uppercase">
                                                Cancelar
                                            </a>
                                        </div>
                                    </div>
                                    <!-- Totales -->
                                    <div class="text-sm space-y-1 pt-4 border-t">
                                        <div class="flex justify-between">
                                            <span>Subtotal</span>
                                            <span>S/ ${subtotal.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between">
                                            <span>Costo de envío</span>
                                            <span>S/ ${costoEnvio.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between  text-pink-600">
                                            <span>Descuento por Cupon</span>
                                            <span>S/ ${descuentoCupon.toFixed(2)}</span>
                                        </div>
                                        <div class="flex justify-between font-semibold pt-2">
                                            <span>Total</span>
                                            <span>S/ ${total.toFixed(2)}</span>
                                        </div>
                                    </div>
                                    <!-- Ahorro -->
                                    <div class="mt-4 p-4 bg-gray-50 rounded-lg flex items-start gap-3">
                                        <i class="fas fa-hand-holding-usd text-yellow-500 text-xl mt-1"></i>
                                        <div class="text-sm text-gray-800">
                                            <p>En esta compra estás ahorrando en total</p>
                                            <p class="text-lg font-bold text-red-500 mt-1">S/ ${ahorrando.toFixed(2)} <span
                                                    class="text-sm font-medium">Exclusivo</span></p>
                                            <p class="text-xs text-gray-500 mt-1">*Ahorro basado en el precio regular y el cupon de descuento</p>
                                        </div>
                                    </div>
                                </div>`;
                }
            console.log(objCupon);
            divDescripcionPedido.innerHTML=stringDescripcionPedido;
            divResumenPedido.innerHTML=stringResumenPedido;
            agregarEventos();
            
}

function agregarEventos(){
    const toggleFactura = document.getElementById('solicitarFactura');
    const camposFactura = document.getElementById('camposFactura');
    toggleFactura.addEventListener('change', () => {
    const comprobantePago=document.querySelector('#comprobantePago'); 
    camposFactura.classList.toggle('hidden', !toggleFactura.checked);
    comprobantePago.textContent = toggleFactura.checked ? "Factura" : "Boleta";
    });
    let btnTarjetas =document.querySelectorAll('input[name="tarjeta"]');
    btnTarjetas.forEach(btn => {
        btn.addEventListener('change', (event) => {
            const medioPago = document.querySelector('#medioPago');
            medioPago.textContent = event.target.value;
        });
        });
}

function rangoConMinutosExtra(minutos) {
  const ahora = new Date(); 
  const inicio = new Date(ahora.getTime() + minutos * 60 * 1000); 
  const fin = new Date(inicio.getTime() + 10 * 60 * 1000); // +10 minutos

  // Fecha: Ejemplo "24 de julio"
  const opcionesFecha = { day: 'numeric', month: 'long' };
  const fechaTexto = inicio.toLocaleDateString('es-ES', opcionesFecha);

  // Hora: Ejemplo "11:09 a. m."
  const opcionesHora = { hour: 'numeric', minute: '2-digit', hour12: true };
  const horaInicio = inicio.toLocaleTimeString('es-ES', opcionesHora);
  const horaFin = fin.toLocaleTimeString('es-ES', opcionesHora);

  return `Hoy, ${fechaTexto} entre las ${horaInicio} y ${horaFin}`;
}

function canjearCupon(e){
    e.preventDefault();
    const txtCodigo=document.querySelector('#txtCodigo').value;
    console.log(txtCodigo);
    if(txtCodigo.trim() !== ""){
        validarCodigoCupon(txtCodigo);
    }else{
        mostrarToast('Es espacio canjear cupon debe ser llenado')
    }
}
async function validarCodigoCupon(txtCodigo){
      try {
        const response = await fetch(`http://localhost:8080/api/cupones/validar/${txtCodigo}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(errorText);
        }
        const text = await response.text(); // leer el cuerpo como texto
        const data = text ? JSON.parse(text) : [];
        if(data){
            objCupon=data;
            mostarResumenVentaHTML();
        }else{
            mostrarToast('Cupon Invalido');
        }
      } catch (error) {
        alert(`Error al obtener lista de direcciones: ${error.message}`);
      }
} 

function checkoutCompra(e){
    e.preventDefault();
    const cliente = JSON.parse(localStorage.getItem('usuario'));
    const {idCliente}=cliente;
    
    console.log("esde aqui",idCliente)
   const carrito = JSON.parse(localStorage.getItem('carrito'));
    const direccion=JSON.parse(localStorage.getItem('direccion'));
    const btnsolicitarFactura=document.querySelector('#solicitarFactura');
    if (btnsolicitarFactura.checked) {
        const txtDomicioLegal=document.querySelector('#txtDomicioLegal').value.trim();
        const txtRazonSocial=document.querySelector('#txtRazonSocial').value.trim();
        const txtRUC=document.querySelector('#txtRUC').value.trim();
        if (txtDomicioLegal === '' || txtRazonSocial === '' || txtRUC === '') {
                mostrarToast('Por favor, completa todos los campos obligatorios.');
        } else {
                 if(Object.keys(objCupon).length>0){
                        let objCheckout={
                            idCliente:idCliente,
                            codigoCupon:objCupon.codigo,
                            tipoComprobante:"FACTURA",
                            ruc:txtRUC,
                            razonSocial:txtRazonSocial,
                            domicilioLegal:txtDomicioLegal,
                            costoEnvio:direccion.costoEnvio
                        }
                        checkoutCompraConsulta(objCheckout,idCliente);
                 }else{
                        let objCheckout={
                            idCliente:idCliente,
                            codigoCupon:"Sin Codigo",
                            tipoComprobante:"FACTURA",
                            ruc:txtRUC,
                            razonSocial:txtRazonSocial,
                            domicilioLegal:txtDomicioLegal,
                            costoEnvio:direccion.costoEnvio
                        }
                        checkoutCompraConsulta(objCheckout,idCliente);
                 }
                
        }
    } else {
        if(Object.keys(objCupon).length>0){
                        let objCheckout={
                            idCliente:idCliente,
                            codigoCupon:objCupon.codigo,
                            tipoComprobante:"BOLETA",
                            ruc:null,
                            razonSocial:null,
                            domicilioLegal:null,
                            costoEnvio:direccion.costoEnvio
                        }
                        checkoutCompraConsulta(objCheckout,idCliente);
                 }else{
                        let objCheckout={
                            idCliente:idCliente,
                            codigoCupon:"Sin Codigo",
                            tipoComprobante:"BOLETA",
                            ruc:null,
                            razonSocial:null,
                            domicilioLegal:null,
                            costoEnvio:direccion.costoEnvio
                        }
                        checkoutCompraConsulta(objCheckout,idCliente);
                 } 
    }
}

async function checkoutCompraConsulta(objCheckout,idCliente){
    console.log(objCheckout,idCliente);    
    try {
        const response = await fetch(`http://localhost:8080/api/order/confirmar/${idCliente}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objCheckout)
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error en checkout: ${errorText}`);
        }

        const data = await response.json();
        mostrarToast("Orden confirmada:");
       // Llamar a crearOrdenPago y redirigir en la misma ventana
         await crearOrdenPago(data, idCliente);
    } catch (error) {
        console.error("Error al realizar checkout:", error);

        throw error; 
        
    }
}


async function crearOrdenPago(orden, idCliente) {
  try {
    const formData = new FormData();
    formData.append("branch_key", "16fd2377212dfbf8001b4f5843d54212aabd184e");
    formData.append("user_key", "5c577ac3716941ebcd5809db2087a68f233c1da9");
    formData.append("order_id", orden.idOrden.toString());
    formData.append("product", `Orden #${orden.idOrden}`);
    formData.append("amount", orden.total.toFixed(2)); 
    formData.append("store_code", "InKafarma");
    formData.append("customer", `Cliente ID ${idCliente}`);
    formData.append("email", orden.email || "");

    const response = await fetch("https://sandbox.pagofacil.tech/cash/charge", {
      method: "POST",
      body: formData
    });

    if (!response.ok) {
      throw new Error(`Error HTTP: ${response.status}`);
    }

    const data = await response.json();
    console.log("Respuesta PagoFácil:", data);

    // Redirigir automáticamente en la misma ventana
    if (data.data && data.data.ticket_url) {
      window.location.href = data.data.ticket_url;
    } else {
      console.error("No se encontró el ticket_url en la respuesta");
    }

    return data;
  } catch (error) {
    console.error("Error creando orden en PagoFácil:", error);
    throw error;
  }
}
