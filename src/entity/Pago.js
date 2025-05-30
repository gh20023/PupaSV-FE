export class Pago{
    constructor(idPago, fecha, metodoPago, referencia, pagoDetalleList, idOrden){
        this.idPago = idPago;
        this.fecha = fecha;
        this.metodoPago = metodoPago;
        this.referencia = referencia;
        this.pagoDetalleList = pagoDetalleList;
        this.idOrden = idOrden;
    }
}