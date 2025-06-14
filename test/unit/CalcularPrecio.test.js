import { expect } from 'chai';
import { calcularTotalCombo } from '../../src/control/utils/CalcularPrecio.js';

describe('calcularTotalCombo', () => {
    it('debería retornar 0 si el combo no tiene productos', () => {
        const combo = { productos: [] };
        expect(calcularTotalCombo(combo)).to.equal(0);
    });

    it('debería calcular el total correctamente para un combo con productos', () => {
        const combo = {
            productos: [
                { precio: 10, cantidad: 2 }, // 20
                { precio: 5, cantidad: 3 },  // 15
            ]
        };
        expect(calcularTotalCombo(combo)).to.equal(35);
    });

    it('debería manejar productos con cantidad 0', () => {
        const combo = {
            productos: [
                { precio: 10, cantidad: 0 },
                { precio: 5, cantidad: 1 }
            ]
        };
        expect(calcularTotalCombo(combo)).to.equal(5);
    });
});