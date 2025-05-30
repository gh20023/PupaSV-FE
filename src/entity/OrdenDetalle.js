export class OrdenDetalle{
    constructor(ordenDetallePK, cantidad, precio, observaciones, orden, productoPrecio){
        this.ordenDetallePK = ordenDetallePK;
        this.cantidad = cantidad;
        this.precio = precio;
        this.observaciones = observaciones;
        this.orden = orden;
        this.productoPrecio = productoPrecio;
    }
}