import { apiGet } from './AbstractApi.js';

export async function obtenerCombos(){
    const data = await apiGet('/combo/por-combo');
    return Object.entries(data).map(([nombre, productos]) => ({
        nombre,
        productos
    }));
}
