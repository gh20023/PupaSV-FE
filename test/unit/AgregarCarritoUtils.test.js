import { expect } from 'chai';
import sinon from 'sinon';
import { agregarAlCarritoYEnviar } from '../../src/control/utils/AgregarCarritoUtils.js';
import { CarritoItem } from '../../src/entity/CarritoItem.js';
import CarritoApi from '../../src/control/api/CarritoApi.js';
import { Toast } from '../../src/control/utils/Toast.js';

describe('agregarAlCarritoYEnviar', () => {
    let carrito;
    let showToastStub;
    let enviarCarritoStub;

    beforeEach(() => {
        carrito = { items: [] };
        showToastStub = sinon.stub(Toast, 'showToast');
        enviarCarritoStub = sinon.stub(CarritoApi, 'enviarCarrito').resolves();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('debería agregar un producto nuevo al carrito y mostrar toast de éxito', () => {
        const producto = { idProductoPrecio: 1, nombre: 'Test', cantidad: 2, precio: 10 };
        const mensajeExito = 'Agregado!';
        return agregarAlCarritoYEnviar({ carrito, productos: [producto], mensajeExito }).then(() => {
            expect(carrito.items).to.have.lengthOf(1);
            expect(carrito.items[0]).to.include({ idProductoPrecio: 1, nombreProducto: 'Test', cantidad: 2, precio: 10 });
            expect(enviarCarritoStub.calledOnceWith(carrito)).to.be.true;
            expect(showToastStub.calledOnceWith(mensajeExito, 'success')).to.be.true;
        });
    });

    it('debería sumar cantidad si el producto ya existe en el carrito', () => {
        carrito.items.push(new CarritoItem(1, 'Test', 1, 10, ''));
        const producto = { idProductoPrecio: 1, nombre: 'Test', cantidad: 3, precio: 10 };
        return agregarAlCarritoYEnviar({ carrito, productos: [producto], mensajeExito: 'OK' }).then(() => {
            expect(carrito.items).to.have.lengthOf(1);
            expect(carrito.items[0].cantidad).to.equal(4);
        });
    });

    it('debería aceptar instancias de CarritoItem directamente', () => {
        const item = new CarritoItem(2, 'Otro', 1, 5, 'Obs');
        return agregarAlCarritoYEnviar({ carrito, productos: [item], mensajeExito: 'OK' }).then(() => {
            expect(carrito.items[0]).to.equal(item);
        });
    });

    it('debería mostrar toast de error si enviarCarrito falla', () => {
        enviarCarritoStub.rejects(new Error('Fallo API'));
        const producto = { idProductoPrecio: 3, nombre: 'Err', cantidad: 1, precio: 1 };
        return agregarAlCarritoYEnviar({ carrito, productos: [producto], mensajeExito: 'OK' }).then(() => {
            expect(showToastStub.calledWithMatch('Error al agregar al carrito: Fallo API', 'error')).to.be.true;
        });
    });
});