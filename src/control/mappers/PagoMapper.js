import {Pago} from '../../entity/Pago.js';
import {PagoDetalleMapper} from './PagoDetalleMapper.js';

export class PagoMapper{
    static fromJSON(json){
        return new Pago(
            json.idPago,
            json.fecha,
            json.metodoPago,
            json.referencia,
            (json.pagoDetalleList || []).map(pd => PagoDetalleMapper.fromJSON(pd)),
            json.idOrden ? { idOrden: json.idOrden } : null // Unicamente traer el idOrden para evitar bucles
        );
    }
}