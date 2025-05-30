import {ProductoDetalle} from '../../entity/ProductoDetalle.js';
import {TipoProductoMapper} from './TipoProductoMapper.js';

export class ProductoDetalleMapper {
    static fromJSON(json){
        return new ProductoDetalle(
            json.productoDetallePK,
            json.activo,
            json.observaciones,
            json.producto ? {idProducto: json.producto.idProducto} : null, //Unicamente traer el idProducto para evitar bucles
            json.tipoProducto ? TipoProductoMapper.fromJSON(json.tipoProducto) : null 
        )
    }
}