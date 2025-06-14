import carritoApi from '../../control/api/CarritoApi.js';
import '../../boundary/components/CarritoTable.js';

function mostrarResumenCarrito() {
    const itemsDiv = document.getElementById('resumen-carrito-items');
    const totalDiv = document.getElementById('resumen-carrito-total');
    itemsDiv.innerHTML = '<p>Cargando resumen...</p>';

    carritoApi.obtenerCarrito()
        .then(carrito => {
            const table = document.createElement('carrito-table');
            table.data = { items: carrito.items, total: carrito.total, editable: false };
            itemsDiv.innerHTML = '';
            itemsDiv.appendChild(table);
        })
        .catch(e => {
            itemsDiv.innerHTML = `<p style="color:red;">Error al cargar el resumen: ${e.message}</p>`;
            totalDiv.innerHTML = '';
        });
}

mostrarResumenCarrito();