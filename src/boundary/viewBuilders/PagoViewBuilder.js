import OrdenApi from '../../control/api/OrdenApi.js';
import PagoApi from '../../control/api/PagoApi.js';
import carritoApi from '../../control/api/CarritoApi.js';
import { PagoMapper } from '../../control/mappers/PagoRequestMapper.js';
import { setupMetodoPagoSwitcher } from './MetodoPagoSwitcher.js';

const ordenApi = new OrdenApi();
const pagoApi = new PagoApi();

document.addEventListener('DOMContentLoaded', () => {
    setupMetodoPagoSwitcher();
    const btnConfirmar = document.getElementById('btn-confirmar-orden');
    const sucursalSelect = document.getElementById('sucursal');
    const metodoPagoSelect = document.getElementById('metodo-pago');

    btnConfirmar.onclick = function (e) {
        e.preventDefault();

        let sucursal = sucursalSelect.value;
        const metodoPago = metodoPagoSelect.value;

        if (!sucursal) {
            alert('Selecciona una sucursal.');
            return;
        }
        if (!metodoPago) {
            alert('Selecciona un método de pago.');
            return;
        }

        btnConfirmar.disabled = true;
        btnConfirmar.textContent = 'Procesando...';

        carritoApi.obtenerCarrito()
            .then(carrito => {
                const monto = carrito.total || 0;
                return ordenApi.crearOrden(sucursal)
                    .then(orden => ({ orden, monto }));
            })
            .then(({ orden, monto }) => {
                const pagoRequest = PagoMapper.toRequest({
                    idOrden: orden.idOrden,
                    metodoPago,
                    monto
                });
                return pagoApi.realizarPago(pagoRequest)
                    .then(() => orden);
            })
            .then(orden => {
                let mensajePago = '';
                if (metodoPago.toUpperCase() === 'EFECTIVO') {
                    mensajePago = `¡Orden creada con éxito!<br>Tu número de orden es <b>${orden.idOrden}</b>.<br>Por favor, pasa a caja a pagar.`;
                } else if (metodoPago.toUpperCase() === 'TARJETA') {
                    mensajePago = `¡Orden y pago con tarjeta simulados exitosamente!<br>Tu número de orden es <b>${orden.idOrden}</b>.`;
                } else if (metodoPago.toUpperCase() === 'TRNSFRNCIA') {
                    mensajePago = `¡Orden creada!<br>Tu número de orden es <b>${orden.idOrden}</b>.<br>Recuerda mostrar tu comprobante de transferencia.`;
                }

                document.body.innerHTML = `
                <div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100vh;">
                    <h1 style="color:#2b7a78;">¡Gracias por tu compra!</h1>
                    <div style="font-size:1.2rem;margin:2rem 0;">${mensajePago}</div>
                    <a href="index.html" class="btn" style="padding:1em 2em;">Volver al inicio</a>
                </div>
            `;
            })
            .catch(e => {
                alert('Error al procesar la orden/pago: ' + (e.message || e));
            })
            .finally(() => {
                btnConfirmar.disabled = false;
                btnConfirmar.textContent = 'Confirmar pago';
            });
    };
});