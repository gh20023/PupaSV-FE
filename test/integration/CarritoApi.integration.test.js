import { expect } from 'chai';
import sinon from 'sinon';
import CarritoApi from '../../src/control/api/CarritoApi.js';
import { CarritoMapper } from '../../src/control/mappers/CarritoMapper.js';

describe('CarritoApi', () => {
    afterEach(() => {
        sinon.restore();
    });

    it('debería obtener el carrito y mapearlo correctamente', () => {
        const fakeResponse = { productos: [{ id: 1, nombre: 'Test', cantidad: 2 }] };
        sinon.stub(CarritoApi, 'get').resolves(fakeResponse);
        const mappedCarrito = { items: [{ id: 1, nombre: 'Test', cantidad: 2 }] };
        sinon.stub(CarritoMapper, 'fromJSON').returns(mappedCarrito);

        return CarritoApi.obtenerCarrito().then(result => {
            expect(result).to.deep.equal(mappedCarrito);
            expect(CarritoApi.get.calledOnce).to.be.true;
            expect(CarritoMapper.fromJSON.calledOnceWith(fakeResponse)).to.be.true;
        });
    });

    it('debería enviar el carrito correctamente', () => {
        const carrito = {
            items: [
                {
                    idProductoPrecio: 1,
                    nombreProducto: 'Test',
                    cantidad: 2,
                    precio: 10,
                    observaciones: 'Sin'
                }
            ]
        };
        const expectedPayload = [
            {
                idProductoPrecio: 1,
                nombreProducto: 'Test',
                cantidad: 2,
                precio: 10,
                observaciones: 'Sin'
            }
        ];
        const postStub = sinon.stub(CarritoApi, 'post').resolves({ success: true });

        return CarritoApi.enviarCarrito(carrito).then(result => {
            expect(postStub.calledOnceWith('', expectedPayload)).to.be.true;
            expect(result).to.deep.equal({ success: true });
        });
    });

    it('debería eliminar un item del carrito', () => {
        const deleteStub = sinon.stub(CarritoApi, 'delete').resolves({ success: true });
        const idProductoPrecio = 123;

        return CarritoApi.eliminarItemCarrito(idProductoPrecio).then(result => {
            expect(deleteStub.calledOnceWith(`/${idProductoPrecio}`)).to.be.true;
            expect(result).to.deep.equal({ success: true });
        });
    });
});