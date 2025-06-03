import { apiGet } from './AbstractApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';

export async function obtenerProductosPorTipo() {
    const data = await apiGet('/producto/por-tipo');
    return data;
}
