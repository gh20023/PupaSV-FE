class ProductoItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(producto) {
        this.shadowRoot.innerHTML = `
            <style>
                .producto {
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                .producto:hover {
                    border-color: #f4c542;
                }
                .producto-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 0.5rem;
                }
                .nombre {
                    color: #2b7a78;
                    font-size: 1.2rem;
                    font-weight: 600;
                    margin: 0;
                }
                .precio {
                    color: #d94f04;
                    font-weight: bold;
                    font-size: 1.1rem;
                }
                .observaciones {
                    font-size: 0.95em;
                    color: #555;
                }
            </style>
            <div class="producto">
                <div class="producto-header">
                    <span class="nombre">${producto.nombre}</span>
                    <span class="precio">$${producto.precio}</span>
                </div>
                <div class="observaciones">${producto.observaciones || ''}</div>
            </div>
        `;
        this._producto = producto;
    }

    get data() {
        return this._producto;
    }
}

customElements.define('producto-item', ProductoItem);