import {ComboDetalle} from '../../entity/ComboDetalle.js';
import {ProductoMapper} from './ProductoMapper.js';

export class ComboDetalleMapper{
    static fromJSON(json){
        return new ComboDetalle(
            json.ComboDetallePK,
            json.cantidad,
            json.activo,
            json.producto ? ProductoMapper.fromJSON(json.producto) : null
        );
    }
}