let idCategoriaSeleccionada = null;
let datos = [];
const confirmarModal = document.getElementById('btnConfirmarEliminar');
const divTablaCategoria = document.querySelector('#divTablaCategoria');
const btnAbrirModal = document.querySelector('#btnAbrirModal');

document.addEventListener('DOMContentLoaded', app);

function app() {
    obtenerCategorias();
    agregarCategoria();
}

async function obtenerCategorias() {
    try {
        const respuesta = await fetch('http://localhost:8080/api/category/categorias');
        if (!respuesta.ok) {
            throw new Error(`Error Http: ${respuesta.status}`);
        }
        datos = await respuesta.json();

        if (datos.length > 0) {
            mostrarHtmlCategoria();

        } else {
            mostrarToast('No tiene categorías creadas');
        }
    } catch (error) {
        console.error("Hubo un problema al obtener los datos: ", error);
    }
}

function mostrarHtmlCategoria() {
    let htmlCategoria = `
        <table id="table_categorias" class="table w-full">
            <thead class="bg-gray-600 hover:bg-gray-700 text-slate-100 text-sm uppercase">
                <tr>
                    <th class="w-2/12 px-4 py-2">N°</th>
                    <th class="w-8/12 px-4 py-2">Nombre</th>
                    <th class="w-2/12 px-4 py-2 text-center">Opciones</th>
                </tr>
            </thead>
            <tbody>
    `;

    datos.forEach((categoria, index) => {
        const { idCategoria, nombre } = categoria;
        htmlCategoria += `
            <tr class="hover:bg-gray-100 border-b border-gray-200">
                <td class="px-4 py-2">${index + 1}</td>
                <td class="px-4 py-2">${nombre}</td>
                <td class="px-4 py-2 flex justify-center gap-2">
                    <button class="btn bg-indigo-500 hover:bg-indigo-600 text-slate-100 btn-editar" data-id="${idCategoria}"><i class="fas fa-edit mr-1"></i> Editar</button>
                    <button class="btn bg-rose-500 hover:bg-rose-600 text-slate-100  btn-eliminar" data-id="${idCategoria}"><i class="fas fa-trash-alt mr-1"></i> Eliminar</button>
                    <button class="btn bg-slate-600 hover:bg-slate-700  text-slate-100"> <i class="fas fa-cog mr-1"></i> Atributos</button>
                </td>
            </tr>
        `;
    });

    htmlCategoria += `
            </tbody>
        </table>
    `;

    divTablaCategoria.innerHTML = htmlCategoria;

    if ($.fn.DataTable.isDataTable('#table_categorias')) {
        $('#table_categorias').DataTable().destroy();
    }

    $('#table_categorias').DataTable({
        language: {
            url: "https://cdn.datatables.net/plug-ins/1.13.6/i18n/es-ES.json"
        },
    });
    $('#table_categorias tbody tr').addClass('border-b border-gray-200 hover:bg-gray-100');
    agregarEventos();
}

function agregarEventos() {
    // Evento para abrir modal de eliminar
    divTablaCategoria.addEventListener('click', function (e) {
        if (e.target.closest('.btn-eliminar')) {
            e.preventDefault();

            const btnEliminar = e.target.closest('.btn-eliminar');
            idCategoriaSeleccionada = btnEliminar.dataset.id;

            document.getElementById('modalConfirmacion').classList.remove('hidden');
        }
    });
    //Evento para editar categoria
    divTablaCategoria.addEventListener('click', e => {
        const btnEditar = e.target.closest('.btn-editar');
        if (btnEditar) {
            e.preventDefault();
            const idCategoria = parseInt(btnEditar.dataset.id);
            mostrarModalEditar(idCategoria);
        }
    });

    // Evento cancelar modal
    document.getElementById('cancelarModal').addEventListener('click', () => {
        document.getElementById('modalConfirmacion').classList.add('hidden');
        idCategoriaSeleccionada = null;
    });

    // Evento confirmar eliminación
    confirmarModal.addEventListener('click', async () => {
        if (!idCategoriaSeleccionada) return;

        try {
            const response = await fetch(`http://localhost:8080/api/category/${idCategoriaSeleccionada}/desactivar`, {
                method: 'PUT'
            });

            if (response.ok) {
                mostrarToast('Categoría desactivada correctamente');
                const fila = document.querySelector(`[data-id="${idCategoriaSeleccionada}"]`).closest('tr');
                const table = $('#table_categorias').DataTable();
                table.row(fila).remove().draw();
                idCategoriaSeleccionada = null;
            } else {
                mostrarToast('Error al desactivar la categoría');

            }
        } catch (error) {
            console.error(error);
            mostrarToast('Error de red al desactivar la categoría');
        }

        document.getElementById('modalConfirmacion').classList.add('hidden');
        idCategoriaSeleccionada = null;
    });

}

function mostrarModalEditar(idCategoria) {
    const modalNuevo = document.querySelector('#modalEditarCategoria');
    const formCategoria = document.querySelector('#formEditarCategoria');
    // Elimina listeners anteriores para evitar múltiples
    const nuevoForm = formCategoria.cloneNode(true);
    formCategoria.parentNode.replaceChild(nuevoForm, formCategoria);
    const cancelarEditar = document.querySelector('#cancelarEditar');
    const nombreEditar = document.querySelector('#nombreEditar');

    const toggleModal = (show) => {
        modalNuevo.classList.toggle('hidden', !show);
        if (show) formCategoria.reset();
    }

    let categoriaSeleccionada = datos.find(c => c.idCategoria === idCategoria);

    if (!categoriaSeleccionada) {
        mostrarToast("Categoría no encontrada");
        return;
    }

    toggleModal(true);
    nombreEditar.value = categoriaSeleccionada.nombre;

    cancelarEditar?.addEventListener('click', () => toggleModal(false));

    nuevoForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = nombreEditar.value.trim();
        if (!nombre) {
            mostrarToast("El nombre es obligatorio");
            return;
        }
        try {
            categoriaSeleccionada.nombre = nombre;
            const response = await fetch(`http://localhost:8080/api/category/${idCategoria}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(categoriaSeleccionada)
            });
            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const categoriaEditada = await response.json();

            // Actualiza array
            datos = datos.map(cat =>
                cat.idCategoria === categoriaEditada.idCategoria
                    ? { ...cat, nombre: categoriaEditada.nombre }
                    : cat
            );

            mostrarHtmlCategoria();
            toggleModal(false);
            mostrarToast('Categoría editada correctamente');
        } catch (err) {
            console.error(err);
            mostrarToast('Error al editar la categoría');
        }
    });
}



function agregarCategoria() {
    const modalNuevo = document.querySelector('#modalNuevaCategoria');
    const cancelarCrear = document.querySelector('#cancelarCrear');
    const formCategoria = document.querySelector('#formCategoria');

    const toggleModal = (show) => {
        modalNuevo.classList.toggle('hidden', !show);
        if (show) formCategoria.reset();
    };

    btnAbrirModal?.addEventListener('click', () => toggleModal(true));
    cancelarCrear?.addEventListener('click', () => toggleModal(false));

    formCategoria?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = formCategoria.nombre.value.trim();
        if (!nombre) {
            mostrarToast('El nombre es obligatorio');
            return;
        }
        try {
            const response = await fetch('http://localhost:8080/api/category', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre })
            });

            if (!response.ok) throw new Error(`Error HTTP: ${response.status}`);
            const nuevaCategoria = await response.json();

            // Agregar nueva fila al DataTable
            const table = $('#table_categorias').DataTable();
            const botones = `
                <button class="btn btn-warning text-white">Editar</button>
                <button class="btn btn-error text-white btn-eliminar" data-id="${nuevaCategoria.idCategoria}">Eliminar</button>
                <button class="btn btn-primary text-white">Atributos</button>
            `;
            const row = table.row.add([
                table.rows().count() + 1,
                nuevaCategoria.nombre,
                botones
            ]).draw().node();

            // Asegura data-id para evento eliminar
            row.querySelector('.btn-eliminar').dataset.id = nuevaCategoria.idCategoria;
            mostrarToast('Categoría agregada correctamente');
            toggleModal(false);
        } catch (err) {
            console.error(err);
            mostrarToast('Error al crear la categoría');
        }
    });
}

function mostrarToast(mensaje) {
    const toast = document.getElementById('toast');
    toast.textContent = mensaje;
    toast.classList.remove('hidden');
    setTimeout(() => {
        toast.classList.add('hidden');
    }, 3000); // Oculta después de 3 segundos
}