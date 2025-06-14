import { expect } from 'chai';
import sinon from 'sinon';
import ComboApi from '../../src/control/api/ComboApi.js';

describe('ComboApi', () => {
    let comboApi;
    beforeEach(() => {
        comboApi = new ComboApi();
    });

    afterEach(() => {
        sinon.restore();
    });

    it('debería llamar a get con el path correcto y mapear la respuesta', () => {
        const fakeResponse = {
            'Combo 1': [{ id: 1, nombre: 'Prod1' }],
            'Combo 2': [{ id: 2, nombre: 'Prod2' }]
        };
        const expected = [
            { nombre: 'Combo 1', productos: [{ id: 1, nombre: 'Prod1' }] },
            { nombre: 'Combo 2', productos: [{ id: 2, nombre: 'Prod2' }] }
        ];
        const getStub = sinon.stub(comboApi, 'get').resolves(fakeResponse);

        return comboApi.getCombos().then(result => {
            expect(getStub.calledOnceWith('/por-combo')).to.be.true;
            expect(result).to.deep.equal(expected);
        });
    });

    it('debería retornar un array vacío si la respuesta es un objeto vacío', () => {
        sinon.stub(comboApi, 'get').resolves({});
        return comboApi.getCombos().then(result => {
            expect(result).to.deep.equal([]);
        });
    });

    it('debería propagar el error si get lanza un error', () => {
        const error = new Error('Network');
        sinon.stub(comboApi, 'get').rejects(error);
        return comboApi.getCombos()
            .then(() => {
                throw new Error('No lanzó error');
            })
            .catch(e => {
                expect(e).to.equal(error);
            });
    });
});