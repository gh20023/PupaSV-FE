import { apiGet } from './AbstractApi.js';

export async function obtenerProductosPorTipo() {
    const data = await apiGet('/producto/por-tipo');
    return data;
}
