

let listProductosHome=[];
document.addEventListener('DOMContentLoaded',appHome);


function appHome(){
    obtenerProductosHome();  
}


async function obtenerProductosHome(){
     try {
    const response = await fetch('http://localhost:8080/api/catalogo/productos', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();
    listProductosHome=data;
    mostrarProductosMasBuscados();
    mostrarCuidadoPiel();
    mostrarFarmacias();
    mostrarPackBebes();
    mostrarFotroproteccion();
    mostrarInkafit();
  } catch (error) {
    alert(`Error al obter Productos Home: ${error.message}`);
  }
}

function mostrarProductosMasBuscados(){
    const mapaCategorias = new Map();
    if(listProductosHome.length>0){
        listProductosHome.forEach(producto => {
        if (producto.masBuscado && !mapaCategorias.has(producto.idCategoria)) {
            mapaCategorias.set(producto.idCategoria, producto);
        }
        });
        const productosMasBuscados = Array.from(mapaCategorias.values());
         mostrarMasBuscadosHTML(productosMasBuscados);
    }
}


function mostrarCuidadoPiel(){
    if(listProductosHome.length>0){
        const listProductosPiel = listProductosHome
                                   .filter(producto => producto.idCategoria === 1)
                                   .slice(0, 5);
        mostrarCuidadoPielHTML(listProductosPiel);
    }
}
function mostrarFarmacias(){
    if(listProductosHome.length>0){
        const listProductosFarmacia = listProductosHome
                                        .filter(producto => producto.idCategoria === 2)
                                        .slice(0, 3);
        mostrarFarmaciaHTML(listProductosFarmacia);
    }
}
function mostrarPackBebes(){
     if(listProductosHome.length>0){
        const listProductosBebe = listProductosHome
                                        .filter(producto => producto.idCategoria === 3)
                                        .slice(0, 5);
        mostrarPackBBHTML(listProductosBebe);
    }
}
function mostrarFotroproteccion(){
     if(listProductosHome.length>0){
        const listProductosFotoproteccion = listProductosHome
                                        .filter(producto => producto.idCategoria === 4)
                                        .slice(0, 3);
        mostrarFotoproteccionHTML(listProductosFotoproteccion);
    }
}

function mostrarInkafit(){
    if(listProductosHome.length>0){
        const listProductosInkafit = listProductosHome
                                   .filter(producto => producto.idCategoria === 6)
                                   .slice(0, 5);
        mostrarInkafitHTML(listProductosInkafit);
    }
}

function mostrarInkafitHTML(listProductosInkafit){
    const sectionInkaFit=document.querySelector('#sectionInkaFit');
    sectionInkaFit.replaceChildren();
    if(listProductosInkafit.length>0){
        
        let stringInkaFit="";
        stringInkaFit=`<h2 class="section-title">Productos Inka Fit</h2>
                                 <div class="product-grid">`;
        listProductosInkafit.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringInkaFit+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="Herbal & Health Ashwagandha Cápsulas" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringInkaFit+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringInkaFit+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringInkaFit+=`</div>
                                            <button class="add-to-cart-btn"onclick="agregarCarritoHome(event)"
                                                data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i>
                                            Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })

        stringInkaFit+=`</div>`;
        sectionInkaFit.innerHTML=stringInkaFit;
    }
}

function mostrarCuidadoPielHTML(listProductosPiel){
    const sectionCuidadoPiel=document.querySelector('#sectionCuidadoPiel');
    sectionCuidadoPiel.replaceChildren();
    if(listProductosPiel.length>0){
        
        let stringProductoPielHTML="";
        stringProductoPielHTML=`<h2 class="section-title">Productos de Cuidado de la Piel</h2>
                                 <div class="product-grid">`;
        listProductosPiel.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringProductoPielHTML+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="Herbal & Health Ashwagandha Cápsulas" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringProductoPielHTML+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringProductoPielHTML+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringProductoPielHTML+=`</div>
                                            <button class="add-to-cart-btn" 
                                            onclick="agregarCarritoHome(event)"
                                            data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })

        stringProductoPielHTML+=`</div>`;
        sectionCuidadoPiel.innerHTML=stringProductoPielHTML;

    }
}
function mostrarFarmaciaHTML(listProductosFarmacia){
    const sectionFarmacia=document.querySelector('#sectionFarmacia');
        sectionFarmacia.replaceChildren();
        if(listProductosFarmacia.length>0){
        let stringFarmaciaHTML="";
        stringFarmaciaHTML=`<h2 class="section-title">Productos de Farmacia</h2>
                                     <div class="container productos-omega-content">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-5 col-sm-12 mb-4">
                                        <div class="Sunvit-promo-banner">
                                        <img src="/img/bloque3.0.png" alt="Productos de Sunvit Omega 3" class="img-fluid w-100">
                                        </div>
                                    </div> 
                                    <div class="col-lg-8 col-md-7 col-sm-12">
                                            <div class="product-grid product-grid-omega">
                                `;
        listProductosFarmacia.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringFarmaciaHTML+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="Herbal & Health Ashwagandha Cápsulas" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringFarmaciaHTML+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringFarmaciaHTML+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringFarmaciaHTML+=`</div>
                                            <button class="add-to-cart-btn" onclick="agregarCarritoHome(event)"
                                             data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })

        stringFarmaciaHTML+=`</div>
                                </div>
                             </div>`;
        sectionFarmacia.innerHTML=stringFarmaciaHTML;
    }
}
function mostrarMasBuscadosHTML(productosMasBuscados){
    const sectionMasBuscados=document.querySelector('#sectionMasBuscados');
    sectionMasBuscados.replaceChildren();
    if(productosMasBuscados.length>0){
        let stringMasBuscadosHTML="";
        stringMasBuscadosHTML=`<h2 class="section-title">Lo Más Buscado de Cada Categoria</h2>
                                 <div class="product-grid">`
        productosMasBuscados.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringMasBuscadosHTML+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="Herbal & Health Ashwagandha Cápsulas" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringMasBuscadosHTML+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringMasBuscadosHTML+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringMasBuscadosHTML+=`</div>
                                            <button class="add-to-cart-btn" onclick="agregarCarritoHome(event)"
                                            data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })

        stringMasBuscadosHTML+=`</div>`;
        sectionMasBuscados.innerHTML=stringMasBuscadosHTML;

    }
    
}

function mostrarPackBBHTML(listProductosBebe){
    const sectionProductosBebe=document.querySelector('#sectionProductosBebe');
    sectionProductosBebe.replaceChildren();
    if(listProductosBebe.length>0){
        
        let stringProductosBebe="";
        stringProductosBebe=`<h2 class="section-title">Packs para bebes</h2>
                                 <div class="product-grid">`;
        listProductosBebe.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringProductosBebe+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="Herbal & Health Ashwagandha Cápsulas" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringProductosBebe+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringProductosBebe+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringProductosBebe+=`</div>
                                            <button class="add-to-cart-btn" onclick="agregarCarritoHome(event)"
                                            data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })
        stringProductosBebe+=`</div>`;
        sectionProductosBebe.innerHTML=stringProductosBebe;
    }
}
function mostrarFotoproteccionHTML(listProductosFotoproteccion){
    const sectionFotoproteccion=document.querySelector('#seccionFotoproteccion');
        sectionFotoproteccion.replaceChildren();
        if(listProductosFotoproteccion.length>0){
        let stringFotoproteccion="";
        stringFotoproteccion=`<h2 class="section-title">Productos de FotoProteccion</h2>
                                     <div class="container productos-omega-content">
                                    <div class="row">
                                        <div class="col-lg-4 col-md-5 col-sm-12 mb-4">
                                        <div class="Sunvit-promo-banner">
                                        <img src="/img/belleza.png" alt="Productos de Sunvit Omega 3" class="img-fluid w-100">
                                        </div>
                                    </div> 
                                    <div class="col-lg-8 col-md-7 col-sm-12">
                                            <div class="product-grid product-grid-omega">
                                `;
        listProductosFotoproteccion.forEach(producto=>{
            const {idProducto,atributos,nombre,precio,imagenes}=producto;
            let stringAtributo="";
            atributos.forEach(atributo=>{
                const {nombreAtributo,valor}=atributo;    
                stringAtributo+=` ${nombreAtributo}: ${valor} | `;                            
            })
            const imagenProducto = imagenes.find(imagen => imagen.esPrincipal === true);
            const descuentoPro = listDescuentosHome.find(d => d.idProducto === idProducto);
            stringFotoproteccion+=`<div class="product-card">
                                        <div class="product-image-container">
                                            <img src="${imagenProducto ? `http://localhost:8082/uploads/${imagenProducto.urlImagen}` : '/img/1257286.png'}" alt="imagen-producto" class="product-image">
                                        </div>
                                        <div class="product-info">
                                            <p class="product-volume">
                                                ${stringAtributo}
                                            </p>
                                            <h3 class="product-name">${nombre}</h3>
                                            <p class="product-brand">Inkafarma</p>
                                            <div class="product-price">`
                                            if(descuentoPro){
                                            const precioConDescuento = precio * (1 - descuentoPro.descuento);
                    stringFotoproteccion+=`<span class="text-gray-400 line-through">S/ ${precio.toFixed(2)}</span>
                                            <span class="current-price font-semibold">S/ ${precioConDescuento.toFixed(2)}</span>`
                                            }else{
                    stringFotoproteccion+=`<span class="current-price font-semibold">S/ ${precio.toFixed(2)}</span>`
                                            }
                                                
             stringFotoproteccion+=`</div>
                                            <button class="add-to-cart-btn" onclick="agregarCarritoHome(event)"
                                            data-id="${idProducto}" 
                                            ><i class="fas fa-shopping-cart"></i> Agregar al carrito</button>
                                        </div>
                                    </div>`;
        })
        stringFotoproteccion+=`</div>
                                </div>
                             </div>`;
        sectionFotoproteccion.innerHTML=stringFotoproteccion;
    }
}

/*Agregando a Carrito*/
function agregarCarritoHome(event){
      event.preventDefault();
      const idProducto=event.target.dataset.id;

      const cliente = JSON.parse(localStorage.getItem('usuario'));
      if(cliente){
          agregarItemCarritoHome(idProducto,cliente.idCliente);
      }else{
        mostrarToast('Es necesario iniciar Sesion');
      }
}

async function agregarItemCarritoHome(idProducto,idCliente) {
      
    const productoCarrito = listProductosHome.find(producto => producto.idProducto == idProducto);
       
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
           console.log(itemBody);
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