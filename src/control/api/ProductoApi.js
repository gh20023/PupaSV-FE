import AbstractApi from './AbstractApi.js';

export default class ProductoApi extends AbstractApi {
    constructor(){
        super('producto');
    }

    getProductosPorTipo() {
        return this.get('/por-tipo');
    }
}
