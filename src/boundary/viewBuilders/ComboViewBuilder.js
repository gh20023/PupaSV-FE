import ComboApi from '../../control/api/ComboApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { calcularTotalCombo } from '../../control/utils/CalcularPrecio.js';
import { carrito } from '../../control/utils/CarritoStore.js';
import { agregarAlCarritoYEnviar } from '../../control/utils/AgregarCarritoUtils.js';
import '../components/ComboItem.js'; //Custom element

const comboApi = new ComboApi();

function mostrarCombos() {
    const contenedor = document.getElementById('combos');
    contenedor.innerHTML = '<p>Cargando combos...</p>';

    comboApi.getCombos()
        .then(combos => {
            contenedor.innerHTML = '';
            if (combos.length === 0) {
                contenedor.innerHTML = '<p>No hay combos disponibles.</p>';
            } else {
                combos.forEach(combo => {
                    combo.total = calcularTotalCombo(combo);

                    const item = document.createElement('combo-item');
                    item.data = combo;
                    item.onclick = () => abrirModalDetalle({
                        tipo: 'combo',
                        data: combo,
                        onAgregar: (detalle) => {
                            // Prepara productos con la cantidad total
                            const productosParaAgregar = detalle.productos.map(producto => ({
                                ...producto,
                                cantidad: producto.cantidad * detalle.cantidad
                            }));
                            agregarAlCarritoYEnviar({
                                carrito,
                                productos: productosParaAgregar,
                                mensajeExito: 'Combo agregado al carrito'
                            });
                        }
                    });
                    contenedor.appendChild(item);
                });
            }
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error al cargar los combos: ${error.message}</p>`;
        });
}

mostrarCombos();