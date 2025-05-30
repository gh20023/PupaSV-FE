export class Orden{
    constructor(idOrden, fecha, sucursal, anulada, ordenDetalleList, pagoList){
        this.idOrden = idOrden;
        this.fecha = fecha;
        this.sucursal = sucursal;
        this.anulada = anulada;
        this.ordenDetalleList = ordenDetalleList;
        this.pagoList = pagoList;
    }
}