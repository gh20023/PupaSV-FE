import { expect } from 'chai';
import { CarritoItem } from '../../src/entity/CarritoItem.js';

describe('CarritoItem', () => {
    it('debería crear un item de carrito con todas las propiedades', () => {
        const item = new CarritoItem(1, 'Producto Test', 2, 10.5, 'Sin azúcar');
        expect(item.idProductoPrecio).to.equal(1);
        expect(item.nombreProducto).to.equal('Producto Test');
        expect(item.cantidad).to.equal(2);
        expect(item.precio).to.equal(10.5);
        expect(item.observaciones).to.equal('Sin azúcar');
    });
});