document.addEventListener('DOMContentLoaded', app);
function app() {
  obtenerClientes();
  eventosPagina();
}
async function obtenerClientes() {
  try {
    const respuesta = await fetch('http://localhost:8080/api/clientes', {
      method: 'GET',
      mode: 'cors'
    });
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = (await respuesta.json()) ?? [];  // si la respuesta es null, se convierte en []
    mostrarClienteHTML(Array.isArray(datos) ? datos : []);
  } catch (error) {
    console.error('Hubo un problema al obtener los datos:', error);
  }
}

function mostrarClienteHTML(clientes) {
  const divTablaClientes = document.querySelector('#divTablaClientes');
  if (clientes.length > 0) {
    divTablaClientes.replaceChildren();
    let stringClientes = "";
    stringClientes = `<table id="table_categorias" class="table w-full">
                          <thead class="bg-gray-600 hover:bg-gray-700 text-slate-100 text-sm uppercase">
                              <tr>
                                  <th class="w-[15px] px-4 py-2">N°</th>
                                  <th class="px-4 py-2">Nombre</th>
                                  <th class="px-4 py-2">Apellido Paterno</th>
                                  <th class="px-4 py-2">Apellido Materno</th>
                                  <th class="px-4 py-2">Telefono</th>
                                  <th class="px-4 py-2">Correo</th>
                                  <th class="w-2/12 px-4 py-2 text-center">Opciones</th>
                              </tr>
                          </thead>
                          <tbody>`;
    clientes.forEach((cliente, index) => {
      console.log(cliente);
      const { apellidoMaterno, apellidoPaterno, nombre, telefono, correo } = cliente.persona;
      stringClientes += `
                                      <tr class="hover:bg-gray-100 border-b border-gray-200">
                                          <td class="px-4 py-2">${index + 1}</td>
                                          <td class="px-4 py-2">${nombre}</td>
                                          <td class="px-4 py-2">${apellidoPaterno}</td>
                                           <td class="px-4 py-2">${apellidoMaterno}</td>
                                           <td class="px-4 py-2">${telefono}</td>
                                              <td class="px-4 py-2">${correo}</td>
                                          <td class="px-4 py-2 flex justify-center gap-2">
                                              <button class="btn bg-indigo-500 hover:bg-indigo-600 text-slate-100 btn-editar" data-id="${cliente.idCliente}"><i class="fas fa-edit mr-1"></i> Editar</button>
                                          </td>
                                      </tr>
                                  `;
    });
    stringClientes+=` </tbody>
                </table>
    `;
    divTablaClientes.innerHTML = stringClientes;
    agregarEventosTabla();
  } else {
    mostrarToast('No tiene ningun cliente registrado, ingrese uno');
    divTablaClientes.replaceChildren();
    divTablaClientes.textContent = "No tienen ningun cliente registrado, registra uno";
  }
}

function agregarEventosTabla() {
  const botonesEditar = document.querySelectorAll('.btn-editar');

  if (botonesEditar) {
    botonesEditar.forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.dataset.id;
        obteerDatosCliente(id);
      })
    });
  }
}

async function obteerDatosCliente(id) {
  try {
    const response = await fetch(`http://localhost:8080/api/clientes/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);

    // Llenar el modal con los datos del cliente
      const data=await response.json();
      console.log(data);
       if (data) {
      const { idCliente, persona } = data;
        document.querySelector('#idClienteEditar').value = idCliente;
        document.querySelector('#nombreEditar').value = persona.nombre || '';
        document.querySelector('#apellidoPaternoEditar').value = persona.apellidoPaterno || '';
        document.querySelector('#apellidoMaternoEditar').value = persona.apellidoMaterno || '';
        document.querySelector('#dniEditar').value = persona.dni || '';
        document.querySelector('#correoEditar').value = persona.correo || '';
        document.querySelector('#telefonoEditar').value = persona.telefono || '';
        document.querySelector('#generoEditar').value = persona.genero || '';

        toggleModal('modalEditarCliente');  // Mostrar modal de edición
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
  btnAbrirModalAgregar?.addEventListener('click', () => toggleModal('modalNuevoCliente'));
  cancelarCrear?.addEventListener('click', () => toggleModal('modalNuevoCliente'));
  const formAgregarCliente = document.querySelector('#formAgregarCliente');
  formAgregarCliente?.addEventListener('submit', (e) => agregarCliente(e));
  const cancelarEditarCliente=document.querySelector("#cancelarEditarCliente");
  cancelarEditarCliente.addEventListener('click',() => toggleModal('modalEditarCliente'))
  btnGuardarCambios.addEventListener('click', (e)=>guardarClienteEditar(e));
}

async function agregarCliente(e) {
  e.preventDefault();

  const form = document.querySelector('#formAgregarCliente');

  // Campos para la parte principal
  const usuario = document.querySelector('#usuario').value.trim();
  const clave = document.querySelector('#clave').value.trim();

  // Campos para persona
  const nombre = document.querySelector('#nombre').value.trim();
  const apellidoPaterno = document.querySelector('#apellidoPaterno').value.trim();
  const apellidoMaterno = document.querySelector('#apellidoMaterno').value.trim();
  const dni = document.querySelector('#dni').value.trim();
  const genero = document.querySelector('#genero').value.trim();
  const correo = document.querySelector('#correo').value.trim();
  const telefono = document.querySelector('#telefono')?.value.trim() || ""; // opcional
  const imgPerfil = document.querySelector('#imgPerfil')?.value.trim() || ""; // opcional

  // Validaciones básicas
  if (!usuario || !clave || !nombre || !apellidoPaterno || !apellidoMaterno || !dni || !genero || !correo) {
    mostrarToast("Todos los campos obligatorios deben estar completos.");
    return;
  }
  if (dni.length !== 8) {
    mostrarToast("El DNI debe tener 8 dígitos.");
    return;
  }
  if (!validarEmail(correo)) {
    mostrarToast("El correo no es válido.");
    return;
  }

  // Construir el objeto datos
  const datos = {
    usuario,
    clave,
    persona: {
      nombre,
      apellidoPaterno,
      apellidoMaterno,
      dni,
      genero,
      telefono,
      correo,
      imgPerfil
    }
  };

  try {
    const respuesta = await fetch('http://localhost:8080/api/clientes/registrarCliente', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error(`Error HTTP: ${respuesta.status}`);

    mostrarToast("Cliente agregado correctamente");
    toggleModal('modalNuevoCliente');
    form.reset();
    obtenerClientes();
  } catch (error) {
    console.error('Error al agregar cliente:', error);
    mostrarToast("No se pudo agregar el cliente");
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

function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}