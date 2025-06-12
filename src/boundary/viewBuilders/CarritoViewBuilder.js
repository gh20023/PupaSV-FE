import carritoApi from '../../control/api/CarritoApi.js';
import '../../control/utils/ConfirmarOrdenModal.js';

function mostrarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    const totalDiv = document.getElementById('carrito-total');
    itemsDiv.innerHTML = '<p>Cargando carrito...</p>';

    carritoApi.obtenerCarrito()
        .then(carrito => {
            console.log('Carrito recibido:', carrito); // Debug
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
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        ${carrito.items.map(item => `
                            <tr data-id="${item.idProductoPrecio}">
                                <td>${item.nombreProducto}</td>
                                <td>${item.cantidad}</td>
                                <td>$${Number(item.precio).toFixed(2)}</td>
                                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                                <td>${item.observaciones || ''}</td>
                                <td>
                                    <button class="btn-eliminar" style="background:#d94f04; color:#fff; border:none; border-radius:5px; padding:0.3em 0.7em; cursor:pointer;">🗑️</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            `;
            totalDiv.innerHTML = `Total: $${Number(carrito.total || 0).toFixed(2)}`;

            // Eliminar productos del carrito
            itemsDiv.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.onclick = function () {
                    const tr = this.closest('tr');
                    const id = tr.getAttribute('data-id');
                    if (confirm('¿Eliminar este producto del carrito?')) {
                        carritoApi.eliminarItemCarrito(id)
                            .then(() => mostrarCarrito())
                            .catch(e => alert('Error al eliminar: ' + e.message));
                    }
                };
            });
        })
        .catch(e => {
            itemsDiv.innerHTML = `<p style="color:red;">Error al cargar el carrito: ${e.message}</p>`;
            totalDiv.innerHTML = '';
        });
}

mostrarCarrito();

const modal = document.querySelector('confirmar-orden-modal');

document.getElementById('pagar-carrito').onclick = function () {
    modal.open();
};

modal.addEventListener('confirmar', () => {
    window.location.href = 'ordenar.html';
});

modal.addEventListener('cancelar', () => {
    window.location.href = 'menu.html';
});