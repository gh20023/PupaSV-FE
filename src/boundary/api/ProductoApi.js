import { apiGet } from './AbstractApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';

async function obtenerProductosPorTipo() {
    const data = await apiGet('/producto/por-tipo');
    return data;
}

export async function mostrarProductosPorTipo() {
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

            // Añadir evento click a cada producto
            productos.forEach((producto, idx) => {
                const li = tipoSection.querySelector(`#producto-${tipo}-${idx}`);
                if (li) li.onclick = () => abrirModalDetalle({
                    tipo: 'producto',
                    data: producto,
                    onAgregar: (detalle) => {
                        alert(`Agregado ${detalle.cantidad} ${detalle.nombre} al carrito`);
                    }
                });
            });
        });
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
    }
}

mostrarProductosPorTipo();