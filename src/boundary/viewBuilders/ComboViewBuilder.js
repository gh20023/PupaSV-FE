import ComboApi from '../../control/api/ComboApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { calcularTotalCombo } from '../../control/utils/CalcularPrecio.js';
import { carrito } from '../../control/utils/CarritoStore.js';
import { CarritoItem } from '../../entity/CarritoItem.js';
import CarritoApi from '../../control/api/CarritoApi.js';
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
                    // Calcula el total si no viene del backend
                    combo.total = calcularTotalCombo(combo);

                    const item = document.createElement('combo-item');
                    item.data = combo;
                    item.onclick = () => abrirModalDetalle({
                        tipo: 'combo',
                        data: combo,
                        onAgregar: (detalle) => {
                            detalle.productos.forEach(producto => {
                                const cantidadTotal = producto.cantidad * detalle.cantidad;
                                let existente = carrito.items.find(
                                    item => item.idProductoPrecio === producto.idProductoPrecio
                                );
                                if (existente) {
                                    existente.cantidad += cantidadTotal;
                                } else {
                                    carrito.items.push(new CarritoItem(
                                        producto.idProductoPrecio,
                                        producto.nombre,
                                        cantidadTotal,
                                        producto.precio,
                                        producto.observaciones || ''
                                    ));
                                }
                            });

                            CarritoApi.enviarCarrito(carrito)
                                .then(() => {
                                    alert('Combo agregado al carrito');
                                })
                                .catch(error => {
                                    alert('Error al agregar al carrito: ' + error.message);
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