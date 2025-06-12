class ConfirmarOrdenModal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .overlay {
                    display: none;
                    position: fixed;
                    top: 0; left: 0; width: 100vw; height: 100vh;
                    background: rgba(0,0,0,0.3);
                    z-index: 2000;
                    justify-content: center;
                    align-items: center;
                }
                .overlay.active {
                    display: flex;
                }
                .modal {
                    background: #fff;
                    border-radius: 10px;
                    padding: 2rem;
                    min-width: 300px;
                    max-width: 90vw;
                    box-shadow: 0 4px 16px rgba(0,0,0,0.2);
                    text-align: center;
                }
                .modal h2 {
                    margin-bottom: 2rem;
                    color: #2b7a78;
                }
                .modal button {
                    margin: 0 1rem;
                    padding: 0.7em 1.5em;
                    border-radius: 6px;
                    border: none;
                    font-size: 1rem;
                    cursor: pointer;
                    background: #2b7a78;
                    color: #fff;
                    transition: background 0.2s;
                }
                .modal button.no {
                    background: #d94f04;
                }
                .modal button:hover {
                    opacity: 0.9;
                }
            </style>
            <div class="overlay">
                <div class="modal">
                    <h2>¿Ya está listo para ordenar?</h2>
                    <button class="si">Sí</button>
                    <button class="no">No, quiero agregar más productos.</button>
                </div>
            </div>
        `;
        this.$overlay = this.shadowRoot.querySelector('.overlay');
        this.$btnSi = this.shadowRoot.querySelector('.si');
        this.$btnNo = this.shadowRoot.querySelector('.no');
    }

    open() {
        this.$overlay.classList.add('active');
    }

    close() {
        this.$overlay.classList.remove('active');
    }

    connectedCallback() {
        this.$btnSi.onclick = () => {
            this.dispatchEvent(new CustomEvent('confirmar', { bubbles: true }));
            this.close();
        };
        this.$btnNo.onclick = () => {
            this.dispatchEvent(new CustomEvent('cancelar', { bubbles: true }));
            this.close();
        };
        this.$overlay.onclick = (e) => {
            if (e.target === this.$overlay) this.close();
        };
    }
}

customElements.define('confirmar-orden-modal', ConfirmarOrdenModal);