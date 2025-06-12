class ProductoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(producto) {
        this.shadowRoot.innerHTML = `
            <style>
                :host { display: block; margin-bottom: 1em; cursor: pointer; }
                .nombre { font-weight: bold; }
                .precio { font-weight: bold; }
                .observaciones { font-size: 0.95em; color: #555; }
            </style>
            <div>
                <div style="display:flex; align-items:center; justify-content:space-between;">
                    <span class="nombre">${producto.nombre}</span>
                    <span class="precio">$${producto.precio}</span>
                </div>
                <div class="observaciones">${producto.observaciones || ''}</div>
            </div>
        `;
        // Guarda el producto para usarlo en eventos
        this._producto = producto;
    }

    get data() {
        return this._producto;
    }
}

customElements.define('producto-item', ProductoItem);