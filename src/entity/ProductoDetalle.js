export class ProductoDetalle{
    constructor(productoDetallePK, activo, observaciones, producto, tipoProducto){
        this.productoDetallePK = productoDetallePK;
        this.activo = activo;
        this.observaciones = observaciones;
        this.producto = producto;
        this.tipoProducto = tipoProducto;
    }
}