import { API_BASE_URL } from './AbstractApi.js';
import { CarritoMapper } from '../../control/mappers/CarritoMapper.js';

// Obtener (GET) el carrito del backend
export async function obtenerCarrito() {
    const response = await fetch(`${API_BASE_URL}/carrito`, {
        method: 'GET',
        credentials: 'include' // Cookies para session
    });
    if (!response.ok) {
        throw new Error('Error al obtener el carrito');
    }
    const data = await response.json();
    return CarritoMapper.fromJSON(data);
}
// Enviar (POST) el carrito al backend
export async function enviarCarrito(carrito) {
    const itemsArray = carrito.items.map(item => ({
        idProductoPrecio: item.idProductoPrecio,
        nombreProducto: item.nombreProducto,
        cantidad: item.cantidad,
        precio: item.precio,
        observaciones: item.observaciones
    }));
    const response = await fetch(`${API_BASE_URL}/carrito`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemsArray),
        credentials: 'include' // Cookies para session
    });
    if (!response.ok) {
        throw new Error('Error al enviar el carrito');
    }
    // Manejar respuesta vacía (HTTP 200 sin body)
    const text = await response.text();
    if (text) {
        return JSON.parse(text);
    }
    // Si no hay contenido, simplemente retorna true o undefined
    return true;
}
