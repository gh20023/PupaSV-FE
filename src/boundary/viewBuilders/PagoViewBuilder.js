import '../components/PagoEfectivo.js';
import '../components/PagoTarjeta.js';
import '../components/PagoTransferencia.js';

document.addEventListener('DOMContentLoaded', () => {
    const metodoPago = document.getElementById('metodo-pago');
    const pagoExtra = document.getElementById('pago-extra');

    metodoPago.addEventListener('change', () => {
        pagoExtra.innerHTML = '';
        if (metodoPago.value === 'Efectivo') {
            pagoExtra.innerHTML = '<pago-efectivo></pago-efectivo>';
        } else if (metodoPago.value === 'Tarjeta') {
            pagoExtra.innerHTML = '<pago-tarjeta></pago-tarjeta>';
        } else if (metodoPago.value === 'Transferencia') {
            pagoExtra.innerHTML = '<pago-transferencia></pago-transferencia>';
        }
    });
});