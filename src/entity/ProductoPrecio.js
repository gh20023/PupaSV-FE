export class ProductoPrecio{
    constructor(idProductoPrecio, fechaDesde, fechaHasta, precioSugerido, ordenDetalleList, idProducto){
        this.idProductoPrecio = idProductoPrecio;
        this.fechaDesde = fechaDesde;
        this.fechaHasta = fechaHasta;
        this.precioSugerido = precioSugerido;
        this.ordenDetalleList = ordenDetalleList;
        this.idProducto = idProducto;
    }
}