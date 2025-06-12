import carritoApi from '../../control/api/CarritoApi.js';

function mostrarResumenCarrito() {
    const itemsDiv = document.getElementById('resumen-carrito-items');
    const totalDiv = document.getElementById('resumen-carrito-total');
    itemsDiv.innerHTML = '<p>Cargando resumen...</p>';

    carritoApi.obtenerCarrito()
        .then(carrito => {
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
            `;
            totalDiv.innerHTML = `Total a pagar: $${Number(carrito.total || 0).toFixed(2)}`;
        })
        .catch(e => {
            itemsDiv.innerHTML = `<p style="color:red;">Error al cargar el resumen: ${e.message}</p>`;
            totalDiv.innerHTML = '';
        });
}

mostrarResumenCarrito();