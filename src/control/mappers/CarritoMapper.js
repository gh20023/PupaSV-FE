import { Carrito } from '../../entity/Carrito.js';
import { CarritoItem } from '../../entity/CarritoItem.js';

export class CarritoMapper {
    static toJSON(carrito) {
        return {
            itemsCarrito: carrito.items.map(item => ({
                idProductoPrecio: item.idProductoPrecio,
                nombreProducto: item.nombreProducto,
                cantidad: item.cantidad,
                precio: item.precio,
                observaciones: item.observaciones
            })),
        };
    }

    static fromJSON(json) {
        return new Carrito(
            (json.itemsCarrito || []).map(item => 
                new CarritoItem(
                    item.idProductoPrecio,
                    item.nombreProducto,
                    item.cantidad,
                    item.precio,
                    item.observaciones
                )
            ),
            json.total
        );
    }
}