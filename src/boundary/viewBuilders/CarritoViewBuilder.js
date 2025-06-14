import carritoApi from '../../control/api/CarritoApi.js';
import { showToast } from '../../control/utils/Toast.js';
import '../../control/utils/ConfirmarOrdenModal.js';
import '../../boundary/components/CarritoTable.js';

function mostrarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    const totalDiv = document.getElementById('carrito-total');
    itemsDiv.innerHTML = '<p>Cargando carrito...</p>';

    carritoApi.obtenerCarrito()
        .then(carrito => {
            const table = document.createElement('carrito-table');
            table.data = { items: carrito.items, total: carrito.total, editable: true };
            itemsDiv.innerHTML = '';
            itemsDiv.appendChild(table);

            table.addEventListener('eliminar', e => {
                const id = e.detail.id;
                if (confirm('¿Eliminar este producto del carrito?')) {
                    carritoApi.eliminarItemCarrito(id)
                        .then(() => mostrarCarrito())
                        .catch(e => showToast('Error al eliminar: ' + e.message, 'error'));
                }
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