import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('ConfirmarAccionModal', () => {
    let window, document;

    before(function () {
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: "http://localhost" });
        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;
        global.HTMLElement = window.HTMLElement;
        global.CustomEvent = window.CustomEvent;
        global.customElements = window.customElements;
        return import('../../src/boundary/components/ConfirmarAccionModal.js').then(() => {});
    });

    after(() => {
        delete global.window;
        delete global.document;
        delete global.HTMLElement;
        delete global.CustomEvent;
        delete global.customElements;
    });

    it('debería mostrar el mensaje y botones personalizados al abrir', () => {
        const modal = document.createElement('confirmar-accion-modal');
        document.body.appendChild(modal);
        modal.connectedCallback();
        modal.open({ mensaje: '¿Seguro?', textoSi: 'Aceptar', textoNo: 'Cancelar' });
        const shadow = modal.shadowRoot;
        expect(shadow.getElementById('modal-title').textContent).to.equal('¿Seguro?');
        expect(shadow.querySelector('.si').textContent).to.equal('Aceptar');
        expect(shadow.querySelector('.no').textContent).to.equal('Cancelar');
        document.body.removeChild(modal);
    });

    it('debería resolver true al hacer click en el botón "Sí"', () => {
        const modal = document.createElement('confirmar-accion-modal');
        document.body.appendChild(modal);
        modal.connectedCallback();
        const prom = modal.open();
        modal.shadowRoot.querySelector('.si').click();
        return prom.then(result => {
            expect(result).to.be.true;
            document.body.removeChild(modal);
        });
    });

    it('debería resolver false al hacer click en el botón "No"', () => {
        const modal = document.createElement('confirmar-accion-modal');
        document.body.appendChild(modal);
        modal.connectedCallback();
        const prom = modal.open();
        modal.shadowRoot.querySelector('.no').click();
        return prom.then(result => {
            expect(result).to.be.false;
            document.body.removeChild(modal);
        });
    });

    it('debería resolver false al hacer click fuera del modal', () => {
        const modal = document.createElement('confirmar-accion-modal');
        document.body.appendChild(modal);
        modal.connectedCallback();
        const prom = modal.open();
        // Simula click en el overlay
        const overlay = modal.shadowRoot.querySelector('.overlay');
        const event = new window.MouseEvent('click', { bubbles: true });
        overlay.dispatchEvent(event);
        return prom.then(result => {
            expect(result).to.be.false;
            document.body.removeChild(modal);
        });
    });

    it('debería cerrar el modal al llamar close()', () => {
        const modal = document.createElement('confirmar-accion-modal');
        document.body.appendChild(modal);
        modal.connectedCallback();
        modal.open();
        modal.close();
        expect(modal.shadowRoot.querySelector('.overlay').classList.contains('active')).to.be.false;
        document.body.removeChild(modal);
    });
});