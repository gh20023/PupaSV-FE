class PagoEfectivo extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `
            <div class="pago-instruccion" style="margin-top:1em; color:#2b7a78; font-weight:bold;">
                PASAR A PAGAR A CAJA CON EL NÚMERO DE ORDEN.
            </div>
        `;
    }
}
customElements.define('pago-efectivo', PagoEfectivo);