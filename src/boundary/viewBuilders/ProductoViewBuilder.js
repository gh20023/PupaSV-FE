import { obtenerProductosPorTipo } from '../api/ProductoApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { carrito } from '../../control/utils/CarritoStore.js';
import { CarritoItem } from '../../entity/CarritoItem.js';
import { enviarCarrito } from '../api/CarritoApi.js';

async function mostrarProductosPorTipo() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '<p>Cargando productos...</p>';
    try {
        const productosPorTipo = await obtenerProductosPorTipo();
        contenedor.innerHTML = '';
        Object.entries(productosPorTipo).forEach(([tipo, productos]) => {
            const tipoSection = document.createElement('section');
            tipoSection.className = 'tipo-producto';
            tipoSection.innerHTML = `
                <h2>${tipo.charAt(0).toUpperCase() + tipo.slice(1)}</h2>
                <ul>
                    ${productos.map((producto, idx) => `
                        <li style="margin-bottom:1em; cursor:pointer;" id="producto-${tipo}-${idx}">
                            <div style="display:flex; align-items:center; justify-content:space-between;">
                                <strong>${producto.nombre}</strong>
                                <span style="font-weight:bold;">$${producto.precio}</span>
                            </div>
                            <div style="font-size:0.95em; color:#555;">${producto.observaciones}</div>
                        </li>
                    `).join('')}
                </ul>
            `;
            contenedor.appendChild(tipoSection);

            // Añade evento click a cada producto
            productos.forEach((producto, idx) => {
                const li = tipoSection.querySelector(`#producto-${tipo}-${idx}`);
                if (li) li.onclick = () => abrirModalDetalle({
                    tipo: 'producto',
                    data: producto,
                    onAgregar: async (detalle) => {
                        // Crea el item y lo agrega al carrito
                        const item = new CarritoItem(
                            producto.idProductoPrecio,
                            producto.nombre,
                            detalle.cantidad,
                            producto.precio,
                            producto.observaciones || ''
                        );
                        carrito.items.push(item);

                        // Envía el carrito al backend
                        try {
                            await enviarCarrito(carrito);
                            alert(`Agregado ${detalle.cantidad} ${detalle.nombre} al carrito`);
                        } catch (e) {
                            alert('Error al agregar al carrito: ' + e.message);
                        }
                    }
                });
            });
        });
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
    }
}

mostrarProductosPorTipo();