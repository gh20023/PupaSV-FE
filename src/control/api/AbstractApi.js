export default class AbstractApi {
    constructor(basePath = '') {
        this.BASE_URL = "http://localhost:9080/PupaSv-1.0-SNAPSHOT/v1/";
        this.basePath = basePath;
    }
    //Metodo para GET
    get(path = '', options = {}) {
        return fetch(this.BASE_URL + this.basePath + path, {
            method: 'GET',
            credentials: 'include',
            ...options
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al hacer GET: ${response.status} ${response.statusText}`);
            }
            return response.json();
        });
    }
    //Metodo para POST
    post(path = '', data = {}, options = {}) {
        return fetch(this.BASE_URL + this.basePath + path, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
            credentials: 'include',
            ...options
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al hacer POST: ${response.status} ${response.statusText}`);
            }
            // Manejar respuesta vacía
            return response.text().then(text => text ? JSON.parse(text) : true);
        });
    }
    //Metodo para DELETE
    delete(path = '', options = {}) {
        return fetch(this.BASE_URL + this.basePath + path, {
            method: 'DELETE',
            credentials: 'include',
            ...options
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error al hacer DELETE: ${response.status} ${response.statusText}`);
            }
            return true;
        });
    }
}