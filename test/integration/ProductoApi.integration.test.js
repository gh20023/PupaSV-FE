import { expect } from 'chai';
import sinon from 'sinon';
import ProductoApi from '../../src/control/api/ProductoApi.js';

describe('ProductoApi', () => {
    let productoApi;

    beforeEach(() => {
        productoApi = new ProductoApi();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('debería llamar a get con el path correcto y retornar los productos', () => {
        const fakeResponse = [
            { id: 1, nombre: 'Producto 1', tipo: 'Bebida' },
            { id: 2, nombre: 'Producto 2', tipo: 'Comida' }
        ];
        const getStub = sinon.stub(productoApi, 'get').resolves(fakeResponse);

        return productoApi.getProductosPorTipo().then(result => {
            expect(getStub.calledOnceWith('/por-tipo')).to.be.true;
            expect(result).to.deep.equal(fakeResponse);
        });
    });

    it('debería propagar el error si get lanza un error', () => {
        const error = new Error('Network');
        sinon.stub(productoApi, 'get').rejects(error);

        return productoApi.getProductosPorTipo()
            .then(() => {
                throw new Error('No lanzó error');
            })
            .catch(e => {
                expect(e).to.equal(error);
            });
    });
});