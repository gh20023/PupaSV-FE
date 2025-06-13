export class PagoMapper {
    static toRequest({ idOrden, metodoPago, monto }) {
        return {
            idOrden,
            metodoPago: (metodoPago || '').toUpperCase(),
            referencia: '',
            monto,
            observaciones: ''
        };
    }
}