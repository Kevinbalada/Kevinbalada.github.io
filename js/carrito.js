// carrito.js

// Función para agregar un producto al carrito
function agregarProductoAlCarrito(producto) {
  let carritoProductos = obtenerProductosDelCarrito();

  // Convertir el precio a un número decimal utilizando parseFloat
  producto.precio = parseFloat(producto.precio.replace(/\./g, '').replace(/,/g, '.'));

  carritoProductos.push(producto);
  guardarProductosEnCarrito(carritoProductos);
}

// Función para obtener los productos almacenados en el carrito desde el almacenamiento local
function obtenerProductosDelCarrito() {
  const productosString = localStorage.getItem('carritoProductos');
  if (productosString) {
    return JSON.parse(productosString);
  }
  return [];
}

// Función para guardar los productos en el carrito en el almacenamiento local
function guardarProductosEnCarrito(productos) {
  localStorage.setItem('carritoProductos', JSON.stringify(productos));
}

// carrito.js

// Función para mostrar los productos en el carrito
function mostrarProductosEnCarrito() {
  const carritoProductosDiv = document.getElementById('carrito-productos');
  carritoProductosDiv.innerHTML = '';

  const carritoProductos = obtenerProductosDelCarrito();

  if (carritoProductos.length === 0) {
    mostrarCarritoVacio();
  } else {
    const ul = document.createElement('ul');
    carritoProductos.forEach(producto => {
      const li = document.createElement('li');

      const imagen = document.createElement('img');
      imagen.src = producto.imagen;
      imagen.alt = 'Imagen del producto';
      li.appendChild(imagen);

      const nombre = document.createElement('h3');
      nombre.textContent = producto.nombre;
      li.appendChild(nombre);

      const precio = document.createElement('p');
      precio.textContent = formatearPrecio(producto.precio);
      li.appendChild(precio);

      ul.appendChild(li);
    });
    carritoProductosDiv.appendChild(ul);
  }

  actualizarTotal();
}

// Resto del código (agregarProductoAlCarrito, obtenerProductosDelCarrito, guardarProductosEnCarrito, formatearPrecio, mostrarCarritoVacio, vaciarCarrito, actualizarTotal, finalizarCompra, etc.)


// Función para mostrar el mensaje de carrito vacío
function mostrarCarritoVacio() {
  const carritoProductosDiv = document.getElementById('carrito-productos');
  carritoProductosDiv.innerHTML = '<h2>No hay productos en el carrito</h2>';
}

// Función para formatear el precio
function formatearPrecio(precio) {
  return precio.toLocaleString('es-AR', { style: 'currency', currency: 'ARS', minimumFractionDigits: 0, maximumFractionDigits: 0 });
}


// Función para vaciar el carrito
function vaciarCarrito() {
  guardarProductosEnCarrito([]); // Vaciar el carrito eliminando todos los productos
  mostrarCarritoVacio(); // Mostrar el mensaje de carrito vacío
  actualizarTotal(); // Actualizar el total a cero

  // Mostrar notificación de éxito usando SweetAlert
  swal("Carrito vaciado", "Se ha vaciado el carrito de compras.", "success");
}

// Función para actualizar el total
function actualizarTotal() {
  const carritoProductos = obtenerProductosDelCarrito();
  let total = 0;

  carritoProductos.forEach(producto => {
    total += producto.precio;
  });

  const totalDiv = document.getElementById('total');
  totalDiv.textContent = `Total: ${formatearPrecio(total)}`; // Mostrar el total formateado
}

// Función para finalizar la compra
function finalizarCompra() {
  // Realizar el procesamiento adicional necesario para finalizar la compra
  // Por ejemplo, enviar los datos al servidor, generar una factura, etc.
  // Puedes agregar aquí el código específico de tu aplicación

  // Redirigir a la sección de pagos
  window.location.href = './pagos.html';
}

// Evento al hacer clic en el botón "Agregar al carrito"
const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
agregarCarritoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const prenda = button.parentNode;
    const nombre = prenda.querySelector('h3').textContent;
    const imagen = prenda.querySelector('img').src;
    const precio = prenda.querySelector('p').textContent;
    agregarProductoAlCarrito({ nombre: nombre, imagen: imagen, precio: precio });
    swal("Prenda seleccionada", `Has seleccionado la prenda: ${nombre}`, "success");
    actualizarTotal(); // Actualizar el total al agregar un producto al carrito
  });
});

// Evento al cargar la página
window.addEventListener('DOMContentLoaded', () => {
  mostrarProductosEnCarrito();
  actualizarTotal();
});

// Obtener referencia a los botones
const vaciarCarritoButton = document.getElementById('vaciar-carrito');
const finalizarCompraButton = document.getElementById('finalizar-compra');

// Agregar eventos click a los botones
vaciarCarritoButton.addEventListener('click', vaciarCarrito);
finalizarCompraButton.addEventListener('click', finalizarCompra);
