import {OrdenDetalle} from '../../entity/OrdenDetalle.js';
import { ProductoPrecioMapper } from './ProductoPrecioMapper.js';

export class OrdenDetalleMapper {
    static fromJSON(json){
        return new OrdenDetalle(
            json.ordenDetallePK,
            json.cantidad,
            json.precio,
            json.observaciones,
            json.orden ? { idOrden: json.orden.idOrden } : null, // Unicamente traer el idOrden para evitar bucles
            json.productoPrecio ? ProductoPrecioMapper.fromJSON(json.productoPrecio) : null
        );
    }
}