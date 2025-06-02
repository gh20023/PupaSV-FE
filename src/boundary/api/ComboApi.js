import { apiGet } from './AbstractApi.js';
import {ComboMapper} from '../../control/mappers/ComboMapper.js';

async function obtenerCombos(){
    const data = await apiGet('/combo/por-combo');
    return Object.entries(data).map(([nombre, productos]) => ({
        nombre,
        descripcionPublica: '', // Puedes poner una descripción si la tienes
        activo: true, // O ajusta según tu lógica
        comboDetalleList: productos.map(producto => ({
            producto: { nombre: producto.nombre },
            cantidad: producto.cantidad
        }))
    }));
}

export async function mostrarCombos() {
    const contenedor = document.getElementById('combos');
    contenedor.innerHTML = '<p>Cargando combos...</p>';
    try{
        const combos = await obtenerCombos();
        contenedor.innerHTML = ''; // Limpiar el contenedor
        if (combos.length === 0) {
            contenedor.innerHTML = '<p>No hay combos disponibles.</p>';
        } else {
            combos.forEach(combo => {
                const comboElement = document.createElement('div');
                comboElement.className = 'combo';
                comboElement.innerHTML = `
                    <h3>${combo.nombre}</h3>
                    <p>${combo.descripcionPublica}</p>
                    <p>Activo: ${combo.activo ? 'Sí' : 'No'}</p>
                    <ul>
                        ${combo.comboDetalleList.map(detalle => `<li>${detalle.producto.nombre} - Cantidad: ${detalle.cantidad}</li>`).join('')}
                    </ul>
                `;
                contenedor.appendChild(comboElement);
            });
        }
    } catch (error){
        contenedor.innerHTML = `<p>Error al cargar los combos: ${error.message}</p>`;
    }
}

mostrarCombos();