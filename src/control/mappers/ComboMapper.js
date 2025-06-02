import {Combo} from '../../entity/Combo.js';
import {ComboDetalleMapper} from './ComboDetalleMapper.js';

export class ComboMapper {
    static fromJSON(json){
        return new Combo(
            json.idCombo,
            json.nombre,
            json.activo,
            json.descripcionPublica,
            (json.comboDetalleList || []).map(cd => ComboDetalleMapper.fromJSON(cd)) //Trae una lista en base a otro mapper
        );
    }
}