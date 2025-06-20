import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('ComboItem', () => {
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
        return import('../../src/boundary/components/ComboItem.js').then(() => {});
    });

    after(() => {
        delete global.window;
        delete global.document;
        delete global.HTMLElement;
        delete global.CustomEvent;
        delete global.customElements;
    });

    it('debería renderizar el nombre y total del combo', () => {
        const combo = {
            nombre: 'Combo Familiar',
            total: 25.5,
            productos: []
        };
        const comboItem = document.createElement('combo-item');
        comboItem.data = combo;
        const shadow = comboItem.shadowRoot;
        expect(shadow.querySelector('.combo-nombre').textContent).to.equal('Combo Familiar');
        expect(shadow.querySelector('.combo-total').textContent).to.include('25.50');
    });

    it('debería renderizar la lista de productos', () => {
        const combo = {
            nombre: 'Combo 2',
            total: 10,
            productos: [
                { nombre: 'Hamburguesa', cantidad: 2 },
                { nombre: 'Papas', cantidad: 1 }
            ]
        };
        const comboItem = document.createElement('combo-item');
        comboItem.data = combo;
        const shadow = comboItem.shadowRoot;
        const items = shadow.querySelectorAll('ul li');
        expect(items.length).to.equal(2);
        expect(items[0].textContent).to.include('Hamburguesa');
        expect(items[0].textContent).to.include('2');
        expect(items[1].textContent).to.include('Papas');
        expect(items[1].textContent).to.include('1');
    });

    it('debería exponer el combo por el getter data', () => {
        const combo = {
            nombre: 'Combo Test',
            total: 5,
            productos: []
        };
        const comboItem = document.createElement('combo-item');
        comboItem.data = combo;
        expect(comboItem.data).to.deep.equal(combo);
    });
});