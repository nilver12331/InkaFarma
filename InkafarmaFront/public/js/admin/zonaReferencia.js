let idZonaEliminar=null;
document.addEventListener('DOMContentLoaded', app);
function app() {
  obtenerReferencias();
  eventosPagina();
}
async function obtenerReferencias() {
  try {
    const respuesta = await fetch('http://localhost:8080/api/zonas', {
      method: 'GET',
      mode: 'cors'
    });
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = (await respuesta.json()) ?? [];  // si la respuesta es null, se convierte en []
    mostrarZonasHTML(Array.isArray(datos) ? datos : []);
  } catch (error) {
    console.error('Hubo un problema al obtener los datos:', error);
  }
}

function mostrarZonasHTML(zonas) {
  const divTablaZona = document.querySelector('#divTablaZona');
  if (zonas.length > 0) {
    divTablaZona.replaceChildren();
    let stringZonas = "";
    stringZonas = `<table id="table_categorias" class="table w-full">
                          <thead class="bg-gray-600 hover:bg-gray-700 text-slate-100 text-sm uppercase">
                              <tr>
                                  <th class="w-[15px] px-4 py-2">N°</th>
                                  <th class="px-4 py-2">Distrito</th>
                                  <th class="px-4 py-2">Zona</th>
                                  <th class="px-4 py-2">Centro Latitud</th>
                                  <th class="px-4 py-2">Centro Longitud</th>
                                  <th class="px-4 py-2">Radio Km</th>
                                  <th class="px-4 py-2">Costo Envio</th>
                                  <th class="w-2/12 px-4 py-2 text-center">Opciones</th>
                              </tr>
                          </thead>
                          <tbody>`;
    zonas.forEach((zona, index) => {
      const { id,nombre, distrito, centroLatitud, centroLongitud, radioKm,costoEnvio } = zona;
      stringZonas += `
                                      <tr class="hover:bg-gray-100 border-b border-gray-200">
                                          <td class="px-4 py-2">${index + 1}</td>
                                           <td class="px-4 py-2">${distrito}</td>
                                          <td class="px-4 py-2">${nombre}</td>
                                           <td class="px-4 py-2">${centroLatitud}</td>
                                           <td class="px-4 py-2">${centroLongitud}</td>
                                              <td class="px-4 py-2">${radioKm}</td>
                                              <td class="px-4 py-2">${costoEnvio}</td>
                                          <td class="px-4 py-2 flex justify-center gap-2">
                                            <button class="btn btn-warning text-white btnEditar" data-id="${id}">Editar</button>
                                            <button class="btn btn-error text-white btnEliminar" data-id="${id}">Eliminar</button>
                                          </td>
                                      </tr>
                                  `;
    });
            stringZonas+=` </tbody>
                        </table>
            `;
    divTablaZona.innerHTML = stringZonas;
   agregarEventosTabla();
  } else {
    mostrarToast('No tiene ninguna zona registrada ingrese uno, ingrese uno');
    divTablaZona.replaceChildren();
    divTablaZona.textContent = "No tienen ningun cliente registrado, registra uno";
  }
}

function agregarEventosTabla() {
  const botonesEditar = document.querySelectorAll('.btnEditar');
  if (botonesEditar) {
    botonesEditar.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if(id){
               obtenerDatosZona(id);
        }
        else{
            mostrarToast('Error al buscar producto');
        }
      })
    });
  }
  const botonesEliminar = document.querySelectorAll('.btnEliminar');
   if (botonesEliminar) {
    botonesEliminar.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        if(id){
            idZonaEliminar=id;    
            toggleModal('modalConfirmacion');
        }else{
            mostrarToast('No se puede eliminar zona');
        }
      })
    });
  }
}
async function descativarZona(e) {
    e.preventDefault();
    if(idZonaEliminar){
          try {
        const respuesta = await fetch(`http://localhost:8080/api/zonas/${idZonaEliminar}/desactivar`, {
        method: 'PUT'
        });

        if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

        mostrarToast("Zona desactivada correctamente");
        obtenerReferencias(); // Refresca la tabla de zonas
        toggleModal('modalConfirmacion');
        } catch (error) {
        console.error('Error al desactivar zona:', error);
        mostrarToast("No se pudo desactivar la zona");
        }
    }else{
        mostrarToast("No se pudo desactivar la zona");
    }
    
}
async function obtenerDatosZona(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/zonas/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    // Llenar el modal con los datos del cliente
      const data=await response.json();
       if (data) {
      const { id, nombre,distrito,centroLatitud,centroLongitud,radioKm,costoEnvio,tiempoEntregaEstimadoMinutos} = data;
        document.querySelector('#idZona').value = id;
        document.querySelector('#nombreZona').value = nombre || '';
        document.querySelector('#distritoZona').value = distrito || '';
        document.querySelector('#centroLatitud').value = centroLatitud || '';
        document.querySelector('#centroLongitud').value = centroLongitud || '';
        document.querySelector('#radioKm').value = radioKm || '';
        document.querySelector('#costoEnvio').value = costoEnvio || '';
        document.querySelector('#tiempoEntrega').value = tiempoEntregaEstimadoMinutos || '';

        toggleModal('modalNuevaZona');  // Mostrar modal de edición
    }
   
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    mostrarToast("No se pudo agregar el cliente");
  }
}

async function guardarClienteEditar(e) {
  e.preventDefault(e);
  const idCliente = document.querySelector('#idClienteEditar').value;
  const persona = {
    nombre: document.querySelector('#nombreEditar').value.trim(),
    apellidoPaterno: document.querySelector('#apellidoPaternoEditar').value.trim(),
    apellidoMaterno: document.querySelector('#apellidoMaternoEditar').value.trim(),
    dni: document.querySelector('#dniEditar').value.trim(),
    genero: document.querySelector('#generoEditar').value,
    correo: document.querySelector('#correoEditar').value.trim(),
    telefono: document.querySelector('#telefonoEditar').value.trim()
  };

  // Validaciones básicas
  if (!persona.nombre || !persona.apellidoPaterno || !persona.apellidoMaterno || !persona.dni ||
      !persona.genero || !persona.correo) {
    mostrarToast("Todos los campos son obligatorios.");
    return;
  }

  if (persona.dni.length !== 8) {
    mostrarToast("El DNI debe tener 8 dígitos.");
    return;
  }

  try {
    const response = await fetch(`http://localhost:8080/api/clientes/${idCliente}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ persona }) // Solo enviamos persona
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    mostrarToast('Cliente actualizado correctamente');
    toggleModal('modalEditarCliente'); // Cerramos el modal
    obtenerClientes(); // Refrescamos la tabla
  } catch (error) {
    console.error('Error al actualizar cliente:', error);
    mostrarToast('No se pudo actualizar el cliente');
  }
}

function eventosPagina() {
  const btnAbrirModalAgregar = document.querySelector('#btnAbrirModalAgregar');
  const cancelarZona=document.querySelector('#cancelarZona');
  btnAbrirModalAgregar?.addEventListener('click', () => toggleModal('modalNuevaZona'));
  cancelarZona?.addEventListener('click', () => toggleModal('modalNuevaZona'));  
  
  const cancelarModal=document.querySelector('#cancelarModal');
  cancelarModal?.addEventListener('click', () => toggleModal('modalConfirmacion'));

  const formAgregarZona = document.querySelector('#formAgregarZona');
  formAgregarZona?.addEventListener('submit', (e) => {
      e.preventDefault(); // Evita submit por defecto

    const idZona = document.querySelector('#idZona').value.trim();
        if (idZona) {
            editarZona(e,idZona);  
        } else {
            agregarZona(e);    
        }
  });
  const btnConfirmarEliminar=document.querySelector('#btnConfirmarEliminar');
  btnConfirmarEliminar?.addEventListener('click',(e)=>descativarZona(e));
}

async function agregarZona(e) {
  e.preventDefault();

  const form = document.querySelector('#formAgregarZona');
  // Capturar valores del formulario
  const nombre = document.querySelector('#nombreZona').value.trim();
  const distrito = document.querySelector('#distritoZona').value.trim();
  const centroLatitud = document.querySelector('#centroLatitud').value.trim();
  const centroLongitud = document.querySelector('#centroLongitud').value.trim();
  const radioKm = document.querySelector('#radioKm').value.trim();
  const costoEnvio = document.querySelector('#costoEnvio').value.trim();
  const tiempoEntrega = document.querySelector('#tiempoEntrega').value.trim();

  // Validaciones básicas
  if (!nombre || !distrito || !centroLatitud || !centroLongitud || !radioKm || !costoEnvio || !tiempoEntrega) {
    mostrarToast("Todos los campos son obligatorios.");
    return;
  }

  // Construir el objeto datos
  const datos = {
    nombre,
    distrito,
    centroLatitud: parseFloat(centroLatitud),
    centroLongitud: parseFloat(centroLongitud),
    radioKm: parseFloat(radioKm),
    costoEnvio: parseFloat(costoEnvio),
    tiempoEntregaEstimadoMinutos: parseInt(tiempoEntrega),
    activo:true
  };

  try {
    const respuesta = await fetch('http://localhost:8080/api/zonas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

    mostrarToast("Zona creada correctamente");
    toggleModal('modalNuevaZona'); // Cierra el modal
    form.reset();                  // Limpia el formulario
    obtenerReferencias();                 // Refresca la tabla de zonas
  } catch (error) {
    console.error('Error al agregar zona:', error);
    mostrarToast("No se pudo agregar la zona");
  }
}


async function editarZona(e,idZona) {
    e.preventDefault();

    const form = document.querySelector('#formAgregarZona');
    // Capturar valores del formulario
    const nombre = document.querySelector('#nombreZona').value.trim();
    const distrito = document.querySelector('#distritoZona').value.trim();
    const centroLatitud = document.querySelector('#centroLatitud').value.trim();
    const centroLongitud = document.querySelector('#centroLongitud').value.trim();
    const radioKm = document.querySelector('#radioKm').value.trim();
    const costoEnvio = document.querySelector('#costoEnvio').value.trim();
    const tiempoEntrega = document.querySelector('#tiempoEntrega').value.trim();

  // Validaciones básicas
  if (!nombre || !distrito || !centroLatitud || !centroLongitud || !radioKm || !costoEnvio || !tiempoEntrega) {
    mostrarToast("Todos los campos son obligatorios.");
    return;
  }

  // Construir el objeto datos
  const datos = {
    id:parseInt(idZona),
    nombre,
    distrito,
    centroLatitud: parseFloat(centroLatitud),
    centroLongitud: parseFloat(centroLongitud),
    radioKm: parseFloat(radioKm),
    costoEnvio: parseFloat(costoEnvio),
    tiempoEntregaEstimadoMinutos: parseInt(tiempoEntrega),
    activo:true
  };
  
  try {
    const respuesta = await fetch(`http://localhost:8080/api/zonas/${idZona}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

    mostrarToast("Zona editada correctamente");
    toggleModal('modalNuevaZona'); // Cierra el modal
    form.reset();                  // Limpia el formulario
    obtenerReferencias();                 // Refresca la tabla de zonas
  } catch (error) {
    console.error('Error al actualizar zona:', error);
    mostrarToast("No se pudo actualizar zona");
  }
  
}

function toggleModal(modalId) {
  const modal = document.querySelector(`#${modalId}`);
  if (!modal) {
    console.warn(`Modal con id "${modalId}" no encontrado.`);
    return;
  }
  modal.classList.toggle('hidden');
}

function mostrarToast(mensaje) {
  const toast = document.getElementById('toast');
  toast.textContent = mensaje;
  toast.classList.remove('hidden');
  setTimeout(() => {
    toast.classList.add('hidden');
  }, 3000); // Oculta después de 3 segundos
}

