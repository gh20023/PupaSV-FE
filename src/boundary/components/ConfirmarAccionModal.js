class ConfirmarAccionModal extends HTMLElement {
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
                    <h2 id="modal-title"></h2>
                    <button class="si"></button>
                    <button class="no"></button>
                </div>
            </div>
        `;
        this.$overlay = this.shadowRoot.querySelector('.overlay');
        this.$title = this.shadowRoot.getElementById('modal-title');
        this.$btnSi = this.shadowRoot.querySelector('.si');
        this.$btnNo = this.shadowRoot.querySelector('.no');
        this._resolve = null;
    }

    open({ 
        mensaje = '¿Confirmar acción?', 
        textoSi = 'Sí', 
        textoNo = 'No', 
        colorSi = '#2b7a78', 
        colorNo = '#d94f04' 
    } = {}) {
        this.$title.textContent = mensaje;
        this.$btnSi.textContent = textoSi;
        this.$btnNo.textContent = textoNo;
        this.$btnSi.style.background = colorSi;
        this.$btnNo.style.background = colorNo;
        this.$overlay.classList.add('active');
        return new Promise(resolve => {
            this._resolve = resolve;
        });
    }

    close() {
        this.$overlay.classList.remove('active');
    }

    connectedCallback() {
        this.$btnSi.onclick = () => {
            this.close();
            if (this._resolve) this._resolve(true);
        };
        this.$btnNo.onclick = () => {
            this.close();
            if (this._resolve) this._resolve(false);
        };
        this.$overlay.onclick = (e) => {
            if (e.target === this.$overlay) {
                this.close();
                if (this._resolve) this._resolve(false);
            }
        };
    }
}

customElements.define('confirmar-accion-modal', ConfirmarAccionModal);