class PagoTarjeta extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <form class="pago-tarjeta" style="margin-top:1em;">
                <label>Número de tarjeta</label>
                <input type="text" maxlength="19" placeholder="0000 0000 0000 0000" required pattern="\\d{4} \\d{4} \\d{4} \\d{4}">
                <label>Nombre en la tarjeta</label>
                <input type="text" placeholder="Como aparece en la tarjeta" required>
                <div style="display:flex; gap:1em;">
                    <div style="flex:1;">
                        <label>Expira</label>
                        <input type="text" maxlength="5" placeholder="MM/AA" required pattern="\\d{2}/\\d{2}">
                    </div>
                    <div style="flex:1;">
                        <label>CVV</label>
                        <input type="text" maxlength="4" placeholder="123" required pattern="\\d{3,4}">
                    </div>
                </div>
                <div style="margin-top:1em; color:#888; font-size:0.95em;">
                    * Simulación de pago, no se realizará ningún cargo real.
                </div>
            </form>
        `;
    }
}
customElements.define('pago-tarjeta', PagoTarjeta);