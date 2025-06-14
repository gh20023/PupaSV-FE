import { expect } from 'chai';
import sinon from 'sinon';
import OrdenApi from '../../src/control/api/OrdenApi.js';

describe('OrdenApi', () => {
    let ordenApi;

    beforeEach(() => {
        ordenApi = new OrdenApi();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('debería llamar a post con el path y payload correctos', () => {
        const sucursal = 'Sucursal Central';
        const expectedPath = `/desde-carrito?sucursal=${encodeURIComponent(sucursal)}`;
        const postStub = sinon.stub(ordenApi, 'post').resolves({ success: true });

        return ordenApi.crearOrden(sucursal).then(result => {
            expect(postStub.calledOnceWith(expectedPath, {})).to.be.true;
            expect(result).to.deep.equal({ success: true });
        });
    });

    it('debería propagar el error si post lanza un error', () => {
        const sucursal = 'ZRZM';
        const error = new Error('Network');
        sinon.stub(ordenApi, 'post').rejects(error);

        return ordenApi.crearOrden(sucursal)
            .then(() => {
                throw new Error('No lanzó error');
            })
            .catch(e => {
                expect(e).to.equal(error);
            });
        });
}); 