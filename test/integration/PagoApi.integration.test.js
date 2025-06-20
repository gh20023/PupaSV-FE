import { expect } from 'chai';
import sinon from 'sinon';
import PagoApi from '../../src/control/api/PagoApi.js';

describe('PagoApi', () => {
    let pagoApi;

    beforeEach(() => {
        pagoApi = new PagoApi();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('debería llamar a post con el path y payload correctos', () => {
        const pagoRequest = { monto: 100, metodo: 'tarjeta' };
        const postStub = sinon.stub(pagoApi, 'post').resolves({ success: true });

        return pagoApi.realizarPago(pagoRequest).then(result => {
            expect(postStub.calledOnceWith('', pagoRequest)).to.be.true;
            expect(result).to.deep.equal({ success: true });
        });
    });

    it('debería propagar el error si post lanza un error', () => {
        const pagoRequest = { monto: 100, metodo: 'tarjeta' };
        const error = new Error('Network');
        sinon.stub(pagoApi, 'post').rejects(error);

        return pagoApi.realizarPago(pagoRequest)
            .then(() => {
                throw new Error('No lanzó error');
            })
            .catch(e => {
                expect(e).to.equal(error);
            });
    });
});