import { TipoProducto } from "../../entity/TipoProducto";

export class TipoProductoMapper {
    static fromJSON(json) {
        return new TipoProducto(
            json.idTipoProducto,
            json.nombre,
            json.activo,
            json.observaciones
        );
    }
}