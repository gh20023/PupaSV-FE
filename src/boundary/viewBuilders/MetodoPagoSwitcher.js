import '../components/PagoEfectivo.js';
import '../components/PagoTarjeta.js';
import '../components/PagoTransferencia.js';

export function setupMetodoPagoSwitcher() {
    const metodoPagoSelect = document.getElementById('metodo-pago');
    const pagoExtra = document.getElementById('pago-extra');

    function mostrarPagoExtra() {
        pagoExtra.innerHTML = '';
        if (metodoPagoSelect.value === 'Efectivo') {
            pagoExtra.innerHTML = '<pago-efectivo></pago-efectivo>';
        } else if (metodoPagoSelect.value === 'Tarjeta') {
            pagoExtra.innerHTML = '<pago-tarjeta></pago-tarjeta>';
        } else if (metodoPagoSelect.value === 'Transferencia') {
            pagoExtra.innerHTML = '<pago-transferencia></pago-transferencia>';
        }
    }

    metodoPagoSelect.addEventListener('change', mostrarPagoExtra);
    mostrarPagoExtra();
}