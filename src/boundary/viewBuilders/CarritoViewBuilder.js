import carritoApi from '../../control/api/CarritoApi.js';
import { showToast } from '../../control/utils/Toast.js';
import '../../boundary/components/CarritoTable.js';
import '../../boundary/components/ConfirmarAccionModal.js';

function mostrarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    const btnPagar = document.getElementById('pagar-carrito');
    itemsDiv.innerHTML = '<p>Cargando carrito...</p>';

    carritoApi.obtenerCarrito()
        .then(carrito => {
            itemsDiv.innerHTML = '';
            if (!carrito.items || carrito.items.length === 0) {
                const table = document.createElement('carrito-table');
                table.data = { items: [], total: 0, editable: true };
                itemsDiv.appendChild(table);
                if (btnPagar) btnPagar.classList.add('btn-inactivo');
                return;
            }
            if (btnPagar) btnPagar.classList.remove('btn-inactivo');

            const table = document.createElement('carrito-table');
            table.data = { items: carrito.items, total: carrito.total, editable: true };
            itemsDiv.appendChild(table);

            table.addEventListener('eliminar', e => {
                const id = e.detail.id;
                modal.open({
                    mensaje: '¿Eliminar este producto del carrito?',
                    textoSi: 'Eliminar',
                    textoNo: 'Cancelar',
                    colorSi: '#d94f04',
                    colorNo: '#888'
                }).then(confirmado => {
                    if (confirmado) {
                        carritoApi.eliminarItemCarrito(id)
                            .then(() => mostrarCarrito())
                            .catch(e => showToast('Error al eliminar: ' + e.message, 'error'));
                    }
                });
            });
        })
        .catch(e => {
            itemsDiv.innerHTML = `<p style="color:red;">Error al cargar el carrito: ${e.message}</p>`;
            if (btnPagar) btnPagar.classList.add('btn-inactivo');
        });
}


// comentario 

mostrarCarrito();

const modal = document.querySelector('confirmar-accion-modal');
const btnPagar = document.getElementById('pagar-carrito');

btnPagar.onclick = function () {
    if (btnPagar.classList.contains('btn-inactivo')) {
        showToast('No se puede ordenar con un carrito vacío', 'error');
        return;
    }
    modal.open({
        mensaje: '¿Ya está listo para ordenar?',
        textoSi: 'Sí',
        textoNo: 'No, quiero agregar más productos.',
        colorSi: '#2b7a78',
        colorNo: '#d94f04'
    }).then(confirmado => {
        if (confirmado) {
            window.location.href = 'ordenar.html';
        } else {
            window.location.href = 'menu.html';
        }
    });
};