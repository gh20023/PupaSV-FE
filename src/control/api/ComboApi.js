import AbstractApi from './AbstractApi.js';

export default class ComboApi extends AbstractApi {
    constructor() {
        super('combo');
    }

    getCombos() {
        return this.get('/por-combo')
            .then(data =>
                Object.entries(data).map(([nombre, productos]) => ({
                    nombre,
                    productos
                }))
            );
    }
}
