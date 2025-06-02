import { apiGet } from './AbstractApi.js';

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
                // Calcular el precio total del combo
                const total = combo.productos.reduce(
                    (sum, producto) => sum + (producto.precio * producto.cantidad), 0
                );
                const comboElement = document.createElement('div');
                comboElement.className = 'combo';
                comboElement.innerHTML = `
                    <h3>${combo.nombre}</h3>
                    <p class="combo-total">Total: $${total.toFixed(2)}</p>
                    <ul>
                        ${combo.productos.map(producto => `
                            <li>
                                ${producto.nombre} - Cantidad: ${producto.cantidad}
                            </li>
                        `).join('')}
                    </ul>
                `;
                contenedor.appendChild(comboElement);
            });
        }
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar los combos: ${error.message}</p>`;
    }
}

mostrarCombos();