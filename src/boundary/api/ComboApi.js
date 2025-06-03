import { apiGet } from './AbstractApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { calcularTotalCombo } from '../../control/utils/CalcularPrecio.js';

async function obtenerCombos(){
    const data = await apiGet('/combo/por-combo');
    return Object.entries(data).map(([nombre, productos]) => ({
        nombre,
        productos
    }));
}

export async function mostrarCombos() {
    const contenedor = document.getElementById('combos');
    contenedor.innerHTML = '<p>Cargando combos...</p>';
    try {
        const combos = await obtenerCombos();
        contenedor.innerHTML = '';
        if (combos.length === 0) {
            contenedor.innerHTML = '<p>No hay combos disponibles.</p>';
        } else {
            combos.forEach(combo => {
                const total = calcularTotalCombo(combo);
                const comboElement = document.createElement('div');
                comboElement.className = 'combo';
                comboElement.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: space-between;">
                        <h3 style="margin:0; cursor:pointer;">${combo.nombre}</h3>
                        <span class="combo-total" style="font-weight:bold;">Total: $${total.toFixed(2)}</span>
                    </div>
                    <ul>
                        ${combo.productos.map(producto => `
                            <li>
                                ${producto.nombre} - Cantidad: ${producto.cantidad}
                            </li>
                        `).join('')}
                    </ul>
                `;
                // clic para abrir el modal
                comboElement.onclick = () => abrirModalDetalle({
                    tipo: 'combo',
                    data: combo,
                    onAgregar: (detalle) => {
                        alert(`Agregado ${detalle.cantidad} ${detalle.nombre} al carrito`);
                    }
                });
                contenedor.appendChild(comboElement);
            });
        }
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar los combos: ${error.message}</p>`;
    }
}

mostrarCombos();