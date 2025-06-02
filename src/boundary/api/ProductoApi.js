import { apiGet } from './AbstractApi.js';

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
                    ${productos.map(producto => `
                        <li>
                            <strong>${producto.nombre}</strong> - $${producto.precio}
                            <br>
                            <span>${producto.observaciones}</span>
                        </li>
                    `).join('')}
                </ul>
            `;
            contenedor.appendChild(tipoSection);
        });
    } catch (error) {
        contenedor.innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
    }
}

mostrarProductosPorTipo();