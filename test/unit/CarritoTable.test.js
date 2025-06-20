import { expect } from 'chai';
import { JSDOM } from 'jsdom';

describe('CarritoTable', () => {
    let window, document;

    before(function () {
        const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: "http://localhost" });
        window = dom.window;
        document = window.document;
        global.window = window;
        global.document = document;
        global.HTMLElement = window.HTMLElement; // <-- ¡Esto es clave!
        global.CustomEvent = window.CustomEvent;
        global.customElements = window.customElements;
        // Ahora sí puedes importar el componente
        return import('../../src/boundary/components/CarritoTable.js').then(() => { });
    });

    after(() => {
        delete global.window;
        delete global.document;
        delete global.HTMLElement;
        delete global.CustomEvent;
        delete global.customElements;
    });

    it('debería mostrar mensaje de carrito vacío si no hay items', () => {
        const carritoTable = document.createElement('carrito-table');
        carritoTable.data = { items: [], total: 0, editable: false };
        expect(carritoTable.innerHTML).to.include('El carrito está vacío');
    });

    it('debería renderizar los items correctamente', () => {
        const carritoTable = document.createElement('carrito-table');
        const items = [
            { idProductoPrecio: 1, nombreProducto: 'Producto 1', cantidad: 2, precio: 10, observaciones: 'Sin azúcar' },
            { idProductoPrecio: 2, nombreProducto: 'Producto 2', cantidad: 1, precio: 5, observaciones: '' }
        ];
        carritoTable.data = { items, total: 25, editable: false };
        expect(carritoTable.innerHTML).to.include('Producto 1');
        expect(carritoTable.innerHTML).to.include('Producto 2');
        expect(carritoTable.innerHTML).to.include('$10.00');
        expect(carritoTable.innerHTML).to.include('$20.00');
        expect(carritoTable.innerHTML).to.include('Total: $25.00');
    });

    it('debería mostrar botones de eliminar si editable es true', () => {
        const carritoTable = document.createElement('carrito-table');
        const items = [
            { idProductoPrecio: 1, nombreProducto: 'Producto 1', cantidad: 2, precio: 10, observaciones: '' }
        ];
        carritoTable.data = { items, total: 20, editable: true };
        expect(carritoTable.innerHTML).to.include('btn-eliminar');
        expect(carritoTable.innerHTML).to.include('🗑️');
    });

    it('debería disparar el evento "eliminar" al hacer click en el botón', () => {
        const carritoTable = document.createElement('carrito-table');
        const items = [
            { idProductoPrecio: 1, nombreProducto: 'Producto 1', cantidad: 2, precio: 10, observaciones: '' }
        ];
        carritoTable.data = { items, total: 20, editable: true };
        document.body.appendChild(carritoTable);

        let eventoRecibido = null;
        carritoTable.addEventListener('eliminar', e => {
            eventoRecibido = e;
        });

        const btn = carritoTable.querySelector('.btn-eliminar');
        btn.click();

        expect(eventoRecibido).to.not.be.null;
        expect(eventoRecibido.detail.id).to.equal('1');
        document.body.removeChild(carritoTable);
    });
});