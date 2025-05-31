import {Orden} from '../../entity/Orden.js';
import {OrdenDetalleMapper} from './OrdenDetalleMapper.js';
import {PagoMapper} from './PagoMapper.js';

export class OrdenMapper{
    static fromJSON(json){
        return new Orden(
            json.idOrden,
            json.fecha,
            json.sucursal,
            json.anulada,
            (json.ordenDetalleList || []).map(od => OrdenDetalleMapper.fromJSON(od)),
            (json.pagoList || []).map(p => PagoMapper.fromJSON(p))
        );
    }
}