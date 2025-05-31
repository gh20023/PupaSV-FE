import {PagoDetalle} from '../../entity/PagoDetalle.js';

export class PagoDetalleMapper {
    static fromJSON(json){
        return new PagoDetalle(
            json.idPagoDetalle,
            json.monto,
            json.observaciones,
            json.idPago ? { idPago: json.idPago } : null // Unicamente traer el idPago para evitar bucles
        );
    }
}