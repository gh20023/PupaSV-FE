class CarritoTable extends HTMLElement {
    set data({ items = [], total = 0, editable = false }) {
        this.render(items, total, editable);
    }

    render(items, total, editable) {
        if (!items || items.length === 0) {
            this.innerHTML = `
                <div style="text-align:center; color:#888; margin:2em 0;">
                    El carrito está vacío.
                </div>
            `;
            return;
        }
        this.innerHTML = `
            <div id="carrito-items">
                <table>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>Cantidad</th>
                            <th>Precio unitario</th>
                            <th>Subtotal</th>
                            <th>Observaciones</th>
                            ${editable ? '<th></th>' : ''}
                        </tr>
                    </thead>
                    <tbody>
                        ${items.map(item => `
                            <tr data-id="${item.idProductoPrecio}">
                                <td>${item.nombreProducto}</td>
                                <td>${item.cantidad}</td>
                                <td>$${Number(item.precio).toFixed(2)}</td>
                                <td>$${(item.precio * item.cantidad).toFixed(2)}</td>
                                <td>${item.observaciones || ''}</td>
                                ${editable ? `<td>
                                    <button class="btn-eliminar" style="background:#d94f04; color:#fff; border:none; border-radius:5px; padding:0.3em 0.7em; cursor:pointer;">🗑️</button>
                                </td>` : ''}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                <div id="carrito-total">
                    Total: $${Number(total || 0).toFixed(2)}
                </div>
            </div>
        `;

        if (editable) {
            this.querySelectorAll('.btn-eliminar').forEach(btn => {
                btn.onclick = (e) => {
                    const tr = btn.closest('tr');
                    const id = tr.getAttribute('data-id');
                    this.dispatchEvent(new CustomEvent('eliminar', { detail: { id } }));
                };
            });
        }
    }
}
customElements.define('carrito-table', CarritoTable);