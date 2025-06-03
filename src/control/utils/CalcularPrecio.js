export function calcularTotalCombo(combo) {
    return combo.productos.reduce(
        (sum, producto) => sum + (producto.precio * producto.cantidad), 0
    );
}