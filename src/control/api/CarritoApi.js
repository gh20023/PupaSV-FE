import AbstractApi from './AbstractApi.js';
import { CarritoMapper } from '../mappers/CarritoMapper.js';

class CarritoApi extends AbstractApi {
    constructor() {
        super('carrito');
    }

    obtenerCarrito() {
        return this.get()
            .then(data => CarritoMapper.fromJSON(data));
    }

    enviarCarrito(carrito) {
        const itemsArray = carrito.items.map(item => ({
            idProductoPrecio: item.idProductoPrecio,
            nombreProducto: item.nombreProducto,
            cantidad: item.cantidad,
            precio: item.precio,
            observaciones: item.observaciones
        }));
        return this.post('', itemsArray);
    }

    eliminarItemCarrito(idProductoPrecio) {
        return this.delete(`/${idProductoPrecio}`);
    }
}

export default new CarritoApi();
