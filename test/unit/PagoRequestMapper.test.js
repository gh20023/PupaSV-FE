import { expect } from 'chai';
import { PagoMapper } from '../../src/control/mappers/PagoRequestMapper.js';

describe('PagoMapper', () => {
    describe('toRequest', () => {
        it('debería mapear correctamente los campos básicos', () => {
            const input = { idOrden: 123, metodoPago: 'tarjeta', monto: 100 };
            const result = PagoMapper.toRequest(input);
            expect(result).to.deep.equal({
                idOrden: 123,
                metodoPago: 'TARJETA',
                referencia: '',
                monto: 100,
                observaciones: ''
            });
        });

        it('debería poner metodoPago en mayúsculas aunque ya esté en mayúsculas', () => {
            const input = { idOrden: 1, metodoPago: 'EFECTIVO', monto: 50 };
            const result = PagoMapper.toRequest(input);
            expect(result.metodoPago).to.equal('EFECTIVO');
        });

        it('debería manejar metodoPago undefined o vacío', () => {
            const input = { idOrden: 2, monto: 75 };
            const result = PagoMapper.toRequest(input);
            expect(result.metodoPago).to.equal('');
        });

        it('debería mantener monto y campos extra vacíos', () => {
            const input = { idOrden: 5, metodoPago: 'transferencia', monto: 200 };
            const result = PagoMapper.toRequest(input);
            expect(result.referencia).to.equal('');
            expect(result.observaciones).to.equal('');
            expect(result.monto).to.equal(200);
        });
     });
});       