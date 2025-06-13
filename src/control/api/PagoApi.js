import AbstractApi from './AbstractApi.js';

export default class PagoApi extends AbstractApi {
    constructor() {
        super('pago');
    }

    realizarPago(pagoRequest) {
        return this.post('', pagoRequest);
    }
}