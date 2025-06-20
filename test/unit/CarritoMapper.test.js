import { expect } from 'chai';
import { CarritoMapper } from '../../src/control/mappers/CarritoMapper.js';
import { Carrito } from '../../src/entity/Carrito.js';
import { CarritoItem } from '../../src/entity/CarritoItem.js';

describe('CarritoMapper', () => {
    describe('toJSON', () => {
        it('debería mapear un carrito vacío correctamente', () => {
            const carrito = new Carrito([], 0);
            const json = CarritoMapper.toJSON(carrito);
            expect(json).to.deep.equal({ itemsCarrito: [] });
        });

        it('debería mapear un carrito con items correctamente', () => {
            const items = [
                new CarritoItem(1, 'Producto 1', 2, 10, 'Sin azúcar'),
                new CarritoItem(2, 'Producto 2', 1, 5, '')
            ];
            const carrito = new Carrito(items, 25);
            const json = CarritoMapper.toJSON(carrito);
            expect(json).to.deep.equal({
                itemsCarrito: [
                    {
                        idProductoPrecio: 1,
                        nombreProducto: 'Producto 1',
                        cantidad: 2,
                        precio: 10,
                        observaciones: 'Sin azúcar'
                    },
                    {
                        idProductoPrecio: 2,
                        nombreProducto: 'Producto 2',
                        cantidad: 1,
                        precio: 5,
                        observaciones: ''
                    }
                ]
            });
        });
    });

    describe('fromJSON', () => {
        it('debería mapear un JSON vacío a un carrito vacío', () => {
            const json = { itemsCarrito: [], total: 0 };
            const carrito = CarritoMapper.fromJSON(json);
            expect(carrito).to.be.an.instanceof(Carrito);
            expect(carrito.items).to.deep.equal([]);
            expect(carrito.total).to.equal(0);
        });

        it('debería mapear un JSON con items a un carrito con items', () => {
            const json = {
                itemsCarrito: [
                    {
                        idProductoPrecio: 1,
                        nombreProducto: 'Producto 1',
                        cantidad: 2,
                        precio: 10,
                        observaciones: 'Sin azúcar'
                    },
                    {
                        idProductoPrecio: 2,
                        nombreProducto: 'Producto 2',
                        cantidad: 1,
                        precio: 5,
                        observaciones: ''
                    }
                ],
                total: 25
            };
            const carrito = CarritoMapper.fromJSON(json);
            expect(carrito).to.be.an.instanceof(Carrito);
            expect(carrito.items).to.have.lengthOf(2);
            expect(carrito.items[0]).to.be.an.instanceof(CarritoItem);
            expect(carrito.items[0]).to.include({
                idProductoPrecio: 1,
                nombreProducto: 'Producto 1',
                cantidad: 2,
                precio: 10,
                observaciones: 'Sin azúcar'
            });
            expect(carrito.total).to.equal(25);
        });

        it('debería manejar JSON sin itemsCarrito', () => {
            const json = { total: 0 };
            const carrito = CarritoMapper.fromJSON(json);
            expect(carrito).to.be.an.instanceof(Carrito);
            expect(carrito.items).to.deep.equal([]);
            expect(carrito.total).to.equal(0);
        });
    });
});