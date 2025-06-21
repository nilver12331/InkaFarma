/* ----------  DATA DEMO  ---------- */
const PRODUCTS = [
  {
    id: 1,
    nombre: "Huggies Dermacare Talla P",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 98.9,
    precio_oferta: 93.9,
    precio_old: 105.8,
    img: "/img/catalog/pañales-2.jpg"
  },
  {
    id: 2,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pañales-1.jpg"
  },
  {
    id: 3,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pañales-1.jpg"
  },
  {
    id: 4,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pack-locion.jpg"
  },
  {
    id: 5,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pañales-1.jpg"
  },
   {
    id: 6,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pack-locion.jpg"
  },
   {
    id: 7,
    nombre: "Huggies Natural Care Talla G",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 88.9,
    precio_oferta: 85.9,
    precio_old: 105,
    img: "/img/catalog/pack-locion.jpg"
  },
  {
    id: 8,
    nombre: "Jabon dove",
    departamento: "Mamá y Bebé",
    categoria: "Pañales para Bebé",
    precio_regular: 810.9,
    precio_oferta: 65,
    precio_old: 105,
    img: "/img/catalog/pack jabon dove.jpg"
  },
];

/* ----------  RENDER INICIAL  ---------- */
const grid   = document.getElementById("productGrid");
const tpl    = document.getElementById("productTemplate");
const result = document.getElementById("resultCount");
renderProducts(PRODUCTS);

/* ----------  FILTROS Y ORDEN  ---------- */
document.querySelectorAll(".filter-departamento, .filter-categoria").forEach(cb =>
  cb.addEventListener("change", applyFilters)
);
document.getElementById("clearFilters").addEventListener("click", () => {
  document.querySelectorAll(".filters input[type=checkbox]").forEach(cb => (cb.checked = false));
  applyFilters();
});
document.getElementById("sortSelect").addEventListener("change", applyFilters);

function applyFilters() {
  // reunir filtros seleccionados
  const deps = [...document.querySelectorAll(".filter-departamento:checked")].map(el => el.value);
  const cats = [...document.querySelectorAll(".filter-categoria:checked")].map(el => el.value);
  let filtered = PRODUCTS.filter(p =>
    (deps.length ? deps.includes(p.departamento) : true) &&
    (cats.length ? cats.includes(p.categoria)   : true)
  );

  // ordenar
  switch (document.getElementById("sortSelect").value) {
    case "price_asc":  filtered.sort((a,b)=>a.precio_oferta-b.precio_oferta); break;
    case "price_desc": filtered.sort((a,b)=>b.precio_oferta-a.precio_oferta); break;
    case "name_asc":   filtered.sort((a,b)=>a.nombre.localeCompare(b.nombre)); break;
    case "name_desc":  filtered.sort((a,b)=>b.nombre.localeCompare(a.nombre)); break;
  }

  renderProducts(filtered);
}

/* ----------  PINTAR GRID  ---------- */
function renderProducts(list) {
  grid.innerHTML = "";
  list.forEach(p => {
    const clone = tpl.content.cloneNode(true);
    clone.querySelector("img").src                       = p.img;
    clone.querySelector("img").alt                       = p.nombre;
    clone.querySelector(".product-name").textContent     = p.nombre;
    clone.querySelector(".product-price-regular").textContent = `S/ ${p.precio_regular.toFixed(2)}`;
    clone.querySelector(".product-price-offer").textContent   = `S/ ${p.precio_oferta.toFixed(2)}`;
    clone.querySelector(".product-price-old").textContent     = `S/ ${p.precio_old.toFixed(2)}`;
    grid.appendChild(clone);
  });
  result.textContent = `Encontramos ${list.length} productos`;
}
