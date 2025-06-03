import { obtenerCarrito } from '../api/CarritoApi.js';

async function mostrarCarrito() {
  const itemsDiv = document.getElementById('carrito-items');
  const totalDiv = document.getElementById('carrito-total');
  itemsDiv.innerHTML = '<p>Cargando carrito...</p>';
  try {
    const carrito = await obtenerCarrito();
    if (!carrito.items.length) {
      itemsDiv.innerHTML = '<p>El carrito está vacío.</p>';
      totalDiv.innerHTML = '';
      return;
    }
    itemsDiv.innerHTML = `
      <table style="width:100%;border-collapse:collapse;">
        <thead>
          <tr>
            <th>Producto</th>
            <th>Cantidad</th>
            <th>Precio unitario</th>
            <th>Subtotal</th>
            <th>Observaciones</th>
          </tr>
        </thead>
        <tbody>
          ${carrito.items.map(item => `
            <tr>
              <td>${item.nombreProducto}</td>
              <td>${item.cantidad}</td>
              <td>$${Number(item.precio).toFixed(2)}</td>
              <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
              <td>${item.observaciones || ''}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div id="carrito-total"></div>
    `;
    document.getElementById('carrito-total').innerHTML = `Total: $${Number(carrito.total).toFixed(2)}`;
  } catch (e) {
    itemsDiv.innerHTML = `<p style="color:red;">Error al cargar el carrito: ${e.message}</p>`;
    totalDiv.innerHTML = '';
  }
}

mostrarCarrito();