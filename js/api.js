async function obtenerProductosDesdeBD() {
  try {
    const response = await fetch('productos.json');

    if (!response.ok) {
      throw new Error('Error al obtener los productos desde la base de datos.');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error('Error al obtener los productos desde la base de datos: ' + error.message);
  }
}

var productos = [];
var carrito = {
  productos: [],
  subtotal: 0,
  envio: 0,
  total: 0,
  seleccionado: false
};

// Función para agregar una prenda al carrito
async function agregarPrendaAlCarrito(event) {
  // Resto del código...

  // Actualizar el stock del producto
  producto.stock--;

  // Resto del código...
}

// Resto del código...

// Función asíncrona para cargar los productos desde el archivo JSON utilizando fetch
async function cargarProductosDesdeJSON() {
  try {
    const response = await fetch('productos.json');
    const productosDesdeJSON = await response.json();
    productos = productosDesdeJSON;

    mostrarCatalogo();
    mostrarResumenCompra();
  } catch (error) {
    console.error('Error al cargar los productos desde el archivo JSON:', error);
  }
}

// Llamar a la función para cargar los productos desde el archivo JSON y establecer el título de la página
async function inicializarPagina() {
  try {
    const productosDesdeBD = await obtenerProductosDesdeBD();
    productos = productosDesdeBD;

    mostrarCatalogo();
    mostrarResumenCompra();

    // Establecer el título de la página
    document.title = 'RUP';
  } catch (error) {
    console.error('Error al inicializar la página:', error);
  }
}

// Llamar a la función para inicializar la página
inicializarPagina();
