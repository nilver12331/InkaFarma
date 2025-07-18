document.addEventListener('DOMContentLoaded',app);
function app(){
  obtenerClientes();
}
async function obtenerClientes(){
  try{
    const respuesta = await fetch('http://localhost:8080/api/category/categorias',{
      method: 'GET',
      mode: 'cors'
    });
    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }
    const datos = await respuesta.json();
  }catch(error){
    console.error('Hubo un problema al obtener los datos:', error);
  }
}