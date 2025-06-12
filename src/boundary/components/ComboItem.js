class ComboItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    set data(combo) {
        this.shadowRoot.innerHTML = `
            <style>
                .combo {
                    background: #fff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                    margin-bottom: 2rem;
                    padding: 1.5rem;
                    cursor: pointer;
                    border: 2px solid transparent;
                    transition: all 0.3s ease;
                }
                .combo:hover {
                    border-color: #f4c542;
                }
                .combo-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    margin-bottom: 1rem;
                    padding-bottom: 0.5rem;
                    border-bottom: 1px solid #f0f0f0;
                }
                .combo-nombre {
                    color: #2b7a78;
                    font-size: 1.4rem;
                    font-weight: 600;
                    margin: 0;
                }
                .combo-total {
                    color: #d94f04;
                    font-weight: bold;
                    font-size: 1.2rem;
                }
                ul {
                    list-style-type: none;
                    padding: 0;
                    margin: 0;
                }
                li {
                    padding: 0.5rem 0;
                    color: #555;
                    font-size: 0.95rem;
                    border-bottom: 1px dashed #eee;
                }
                li:last-child {
                    border-bottom: none;
                }
            </style>
            <div class="combo">
                <div class="combo-header">
                    <h3 class="combo-nombre">${combo.nombre}</h3>
                    <span class="combo-total">Total: $${combo.total?.toFixed(2) ?? ''}</span>
                </div>
                <ul>
                    ${combo.productos.map(producto => `
                        <li>
                            ${producto.nombre} - Cantidad: ${producto.cantidad}
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
        this._combo = combo;
    }

    get data() {
        return this._combo;
    }
}

customElements.define('combo-item', ComboItem);