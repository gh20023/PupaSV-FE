import { CarritoItem } from '../../entity/CarritoItem.js';
import CarritoApi from '../api/CarritoApi.js';
import { Toast} from './Toast.js';

export function agregarAlCarritoYEnviar({ carrito, productos, mensajeExito }) {
    productos.forEach(producto => {
        const id = producto.idProductoPrecio;
        const cantidad = producto.cantidad;
        let existente = carrito.items.find(item => item.idProductoPrecio === id);
        if (existente) {
            existente.cantidad += cantidad;
        } else {
            carrito.items.push(
                producto instanceof CarritoItem
                    ? producto
                    : new CarritoItem(
                        producto.idProductoPrecio,
                        producto.nombre,
                        cantidad,
                        producto.precio,
                        producto.observaciones || ''
                    )
            );
        }
    });

    return CarritoApi.enviarCarrito(carrito)
        .then(() => Toast.showToast(mensajeExito, 'success'))
        .catch(error => Toast.showToast('Error al agregar al carrito: ' + error.message, 'error'));
}