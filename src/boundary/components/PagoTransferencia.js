class PagoTransferencia extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="pago-transferencia" style="margin-top:1em; text-align:center;">
                <div style="margin-bottom:0.5em;">Escanea el QR para transferir:</div>
                <img src="../../resources/images/qr-ejemplo.png" alt="QR de cuenta bancaria" style="width:160px; height:160px; border-radius:8px; border:1px solid #eee;">
                <div style="margin-top:0.5em; color:#888; font-size:0.95em;">
                    * Simulación de pago, no se realizará ningún cargo real.
                </div>
            </div>
        `;
    }
}
customElements.define('pago-transferencia', PagoTransferencia);