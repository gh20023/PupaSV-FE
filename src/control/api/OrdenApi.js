import AbstractApi from './AbstractApi.js';

export default class OrdenApi extends AbstractApi {
    constructor() {
        super('orden');
    }

    crearOrden(sucursal) {
        return this.post(`/desde-carrito?sucursal=${encodeURIComponent(sucursal)}`,{});
    }
}