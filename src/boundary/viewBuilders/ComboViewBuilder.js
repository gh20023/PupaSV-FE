import ComboApi from '../../control/api/ComboApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { calcularTotalCombo } from '../../control/utils/CalcularPrecio.js';
import { carrito } from '../../control/utils/CarritoStore.js';
import { CarritoItem } from '../../entity/CarritoItem.js';
import CarritoApi from '../../control/api/CarritoApi.js';

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
                    const total = calcularTotalCombo(combo);
                    const comboElement = document.createElement('div');
                    comboElement.className = 'combo';
                    comboElement.innerHTML = `
                        <div style="display: flex; align-items: center; justify-content: space-between;">
                            <h3 style="margin:0; cursor:pointer;">${combo.nombre}</h3>
                            <span class="combo-total" style="font-weight:bold;">Total: $${total.toFixed(2)}</span>
                        </div>
                        <ul>
                            ${combo.productos.map(producto => `
                                <li>
                                    ${producto.nombre} - Cantidad: ${producto.cantidad}
                                </li>
                            `).join('')}
                        </ul>
                    `;
                    comboElement.onclick = () => abrirModalDetalle({
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
                    contenedor.appendChild(comboElement);
                });
            }
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error al cargar los combos: ${error.message}</p>`;
        });
}

mostrarCombos();