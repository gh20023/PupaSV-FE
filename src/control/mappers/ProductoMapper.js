import { Producto } from '../../entity/Producto.js';
import {ProductoDetalleMapper} from './ProductoDetalleMapper.js';
import {ProductoPrecioMapper} from './ProductoPrecioMapper.js';

export class ProductoMapper{
    static fromJSON(json){
        return new Producto(
            json.idProducto,
            json.nombre,
            json.activo,
            json.observaciones,
            (json.productoDetalleList || []).map(pd => ProductoDetalleMapper.fromJSON(pd)),
            (json.productoPrecioList || []).map(pp => ProductoPrecioMapper.fromJSON(pp))
        );
    }
}