var productos = [
  {
    id: 1,
    nombre: "Buzo orchid celeste",
    precio: 12000,
    stock: 5
  },
  // Resto de los productos...
];

var carrito = {
  productos: [],
  subtotal: 0,
  envio: 0,
  total: 0,
  seleccionado: false
};

// Función para agregar una prenda al carrito
function agregarPrendaAlCarrito(event) {
  var id = parseInt(event.target.dataset.id);

  var producto = productos.find(function(item) {
    return item.id === id;
  });

  if (!producto) {
    mostrarMensaje("La prenda con ID " + id + " no existe.", "error");
    return;
  }

  if (producto.stock === 0) {
    mostrarMensaje("No hay stock disponible para la prenda " + producto.nombre, "error");
    return;
  }

  carrito.productos.push(producto);
  carrito.subtotal += producto.precio;
  producto.stock--;

  calcularTotal();
  mostrarPrecioEnCarrito();
  mostrarMensaje("La prenda " + producto.nombre + " se agregó al carrito.", "success");

  carrito.seleccionado = true;

  guardarCarritoEnLocalStorage();
  mostrarResumenCompra();
}

function calcularTotal() {
  carrito.total = carrito.subtotal + carrito.envio;
}

function mostrarPrecioEnCarrito() {
  var totalElement = document.getElementById("total");
  totalElement.textContent = "Total: $" + carrito.total;
}

function mostrarMensaje(mensaje, tipo) {
  Swal.fire({
    text: mensaje,
    icon: tipo,
    showConfirmButton: false,
    timer: 1500
  });
}

function guardarCarritoEnLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function obtenerCarritoDeLocalStorage() {
  var carritoGuardado = localStorage.getItem("carrito");
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    mostrarPrecioEnCarrito();
  }
}

function mostrarCatalogo() {
  var catalogoElement = document.getElementById("catalogo");
  catalogoElement.innerHTML = ""; // Limpiar contenido anterior

  productos.forEach(function(producto) {
    var productoElement = document.createElement("div");
    productoElement.classList.add("producto");

    var nombreElement = document.createElement("h3");
    nombreElement.textContent = producto.nombre;
    productoElement.appendChild(nombreElement);

    var precioElement = document.createElement("p");
    precioElement.textContent = "Precio: $" + producto.precio;
    productoElement.appendChild(precioElement);

    var stockElement = document.createElement("p");
    stockElement.textContent = "Stock: " + producto.stock;
    productoElement.appendChild(stockElement);

    var agregarElement = document.createElement("button");
    agregarElement.textContent = "Agregar al carrito";
    agregarElement.dataset.id = producto.id;
    agregarElement.addEventListener("click", agregarPrendaAlCarrito);
    productoElement.appendChild(agregarElement);

    catalogoElement.appendChild(productoElement);
  });
}

function mostrarResumenCompra() {
  var resumenElement = document.getElementById("resumen");
  resumenElement.innerHTML = ""; // Limpiar contenido anterior

  if (carrito.seleccionado) {
    var subtotalElement = document.createElement("p");
    subtotalElement.textContent = "Subtotal: $" + carrito.subtotal;
    resumenElement.appendChild(subtotalElement);

    var envioElement = document.createElement("p");
    envioElement.textContent = "Envío: $" + carrito.envio;
    resumenElement.appendChild(envioElement);

    var totalElement = document.createElement("p");
    totalElement.textContent = "Total: $" + carrito.total;
    resumenElement.appendChild(totalElement);

    var productosElement = document.createElement("div");
    productosElement.classList.add("productos-carrito");
    resumenElement.appendChild(productosElement);

    carrito.productos.forEach(function(producto) {
      var productoElement = document.createElement("div");
      productoElement.classList.add("producto-carrito");

      var nombreElement = document.createElement("p");
      nombreElement.textContent = "Nombre: " + producto.nombre;
      productoElement.appendChild(nombreElement);

      var precioElement = document.createElement("p");
      precioElement.textContent = "Precio: $" + producto.precio;
      productoElement.appendChild(precioElement);

      productosElement.appendChild(productoElement);
    });
  } else {
    var mensajeElement = document.createElement("p");
    mensajeElement.textContent = "No se ha seleccionado ningún producto.";
    resumenElement.appendChild(mensajeElement);
  }
}

var botonesAgregarCarrito = document.querySelectorAll(".agregar-carrito");
botonesAgregarCarrito.forEach(function(boton) {
  boton.addEventListener("click", agregarPrendaAlCarrito);
});

obtenerCarritoDeLocalStorage();
mostrarCatalogo();
mostrarResumenCompra();
