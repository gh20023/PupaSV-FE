import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('ProductoItem', () => {
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
        return import('../../src/boundary/components/ProductoItem.js').then(() => {});
    });

    after(() => {
        delete global.window;
        delete global.document;
        delete global.HTMLElement;
        delete global.CustomEvent;
        delete global.customElements;
    });

    it('debería renderizar el nombre, precio y observaciones del producto', () => {
        const producto = {
            nombre: 'Café',
            precio: 2.5,
            observaciones: 'Sin azúcar'
        };
        const productoItem = document.createElement('producto-item');
        productoItem.data = producto;
        const shadow = productoItem.shadowRoot;
        expect(shadow.querySelector('.nombre').textContent).to.equal('Café');
        expect(shadow.querySelector('.precio').textContent).to.include('2.5');
        expect(shadow.querySelector('.observaciones').textContent).to.include('Sin azúcar');
    });

    it('debería renderizar observaciones vacío si no se provee', () => {
        const producto = {
            nombre: 'Té',
            precio: 1.75
        };
        const productoItem = document.createElement('producto-item');
        productoItem.data = producto;
        const shadow = productoItem.shadowRoot;
        expect(shadow.querySelector('.observaciones').textContent).to.equal('');
    });

    it('debería exponer el producto por el getter data', () => {
        const producto = {
            nombre: 'Jugo',
            precio: 3.0,
            observaciones: 'Natural'
        };
        const productoItem = document.createElement('producto-item');
        productoItem.data = producto;
        expect(productoItem.data).to.deep.equal(producto);
    });
});