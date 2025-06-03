import { calcularTotalCombo } from './CalcularPrecio.js';

export function abrirModalDetalle({ tipo, data, onAgregar }) {
    let cantidad = 1;
    const modalBody = document.getElementById('modal-body');
    let html = '';

    if (tipo === 'combo') {
        const total = calcularTotalCombo(data);
        html = `
            <h2>${data.nombre}</h2>
            <ul>
                ${data.productos.map(producto => `
                    <li>${producto.nombre} - Cantidad: ${producto.cantidad}</li>
                `).join('')}
            </ul>
            <p style="font-weight:bold;">Total: $${total.toFixed(2)}</p>
        `;
    } else if (tipo === 'producto') {
        html = `
            <h2>${data.nombre}</h2>
            <div style="font-size:0.95em; color:#555;">${data.observaciones}</div>
            <p style="font-weight:bold;">Precio: $${data.precio}</p>
        `;
    }

    html += `
        <div style="margin:1em 0;">
            <label>Cantidad: </label>
            <button id="menos-cantidad">-</button>
            <span id="cantidad-detalle">${cantidad}</span>
            <button id="mas-cantidad">+</button>
        </div>
        <button id="agregar-carrito-detalle" class="btn">Agregar al carrito</button>
    `;

    modalBody.innerHTML = html;
    document.getElementById('modal-overlay').classList.add('active');

    document.getElementById('menos-cantidad').onclick = () => {
        if (cantidad > 1) {
            cantidad--;
            document.getElementById('cantidad-detalle').textContent = cantidad;
        }
    };
    document.getElementById('mas-cantidad').onclick = () => {
        cantidad++;
        document.getElementById('cantidad-detalle').textContent = cantidad;
    };

    document.getElementById('agregar-carrito-detalle').onclick = () => {
        if (onAgregar) onAgregar({ ...data, cantidad });
        document.getElementById('modal-overlay').classList.remove('active');
    };
}

document.addEventListener('DOMContentLoaded', () => {
    const overlay = document.getElementById('modal-overlay');
    const closeBtn = document.getElementById('modal-close');
    if (closeBtn) closeBtn.onclick = () => overlay.classList.remove('active');
    overlay.onclick = (e) => { if (e.target === overlay) overlay.classList.remove('active'); };
});