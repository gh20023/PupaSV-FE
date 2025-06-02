export const API_BASE_URL = 'http://localhost:9080/PupaSv-1.0-SNAPSHOT/v1';

//Promesa para obtener datos desde la API
export async function apiGet(path){
    const response = await fetch(`${API_BASE_URL}${path}`);
    if (!response.ok){
        throw new Error(`Error al obtener datos desde ${path}: ${response.statusText}`);
    }
    return await response.json();
}