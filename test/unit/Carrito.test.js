import { expect } from 'chai';
import { Carrito } from '../../src/entity/Carrito.js';

describe('Carrito', () => {
    it('debería crear un carrito vacío por defecto', () => {
        const carrito = new Carrito();
        expect(carrito.items).to.deep.equal([]);
        expect(carrito.total).to.equal(0);
    });

    it('debería crear un carrito con items y total especificados', () => {
        const items = [{ id: 1 }, { id: 2 }];
        const total = 50;
        const carrito = new Carrito(items, total);
        expect(carrito.items).to.equal(items);
        expect(carrito.total).to.equal(50);
    });
});