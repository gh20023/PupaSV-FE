export class Producto{
    constructor(idProducto, nombre, activo, observaciones, productoDetalleList, productoPrecioList){
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.activo = activo;
        this.observaciones = observaciones;
        this.productoDetalleList = productoDetalleList;
        this.productoPrecioList = productoPrecioList;
    }
}