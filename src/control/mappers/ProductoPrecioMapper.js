import {ProductoPrecio} from '../../entity/ProductoPrecio.js';

export class ProductoPrecioMapper {
    static fromJSON(json){
        return new ProductoPrecio(
            json.idProductoPrecio,
            json.fechaDesde,
            json.fechaHasta,
            json.precioSugerido,
            json.idProducto ? {idProducto: json.idProducto} : null // Unicamente traer el idProducto para evitar bucles
        )
    }
}