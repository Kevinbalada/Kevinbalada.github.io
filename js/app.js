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
async function agregarPrendaAlCarrito(event) {
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

function mostrarCatalogo(productos) {
  const catalogo = document.getElementById('catalogo');

  productos.forEach((producto) => {
    const div = document.createElement('div');
    div.classList.add('producto');
    
    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;
    
    const h3 = document.createElement('h3');
    h3.textContent = producto.nombre;
    
    const p = document.createElement('p');
    p.textContent = `${producto.precio}$`;
    
    const button = document.createElement('button');
    button.classList.add('agregar-carrito');
    button.setAttribute('data-id', producto.id);
    button.textContent = 'Agregar al carrito';
    
    div.appendChild(img);
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(button);
    
    catalogo.appendChild(div);
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

