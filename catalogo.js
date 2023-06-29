fetch('./js/productos.json')
  .then(response => response.json())
  .then(data => {
    const catalogo = document.getElementById('catalogo');
    console.log('Datos recuperados:', data); // Mostrar los datos en la consola
    
    data.forEach(producto => {
      const { id, titulo, precio, imagen } = producto;

      const div = document.createElement('div');
      div.classList.add('div' + id);

      const img = document.createElement('img');
      img.src = imagen;
      img.alt = titulo;

      const h3 = document.createElement('h3');
      h3.textContent = titulo;

      const p = document.createElement('p');
      p.textContent = precio + '$';

      const button = document.createElement('button');
      button.classList.add('agregar-carrito');
      button.dataset.id = id;
      button.textContent = 'Agregar al carrito';

      div.appendChild(img);
      div.appendChild(h3);
      div.appendChild(p);
      div.appendChild(button);

      catalogo.appendChild(div);
    });
  })
  .catch(error => {
    console.log('Error:', error);
  });

// Agregar evento de clic a los botones "Agregar al carrito"
const agregarCarritoButtons = document.querySelectorAll('.agregar-carrito');
agregarCarritoButtons.forEach(button => {
  button.addEventListener('click', () => {
    const prenda = button.parentNode;
    const nombre = prenda.querySelector('h3').textContent;
    swal("Prenda seleccionada", `Has seleccionado la prenda: ${nombre}`, "success");
  });
});
