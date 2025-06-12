import ProductoApi from '../../control/api/ProductoApi.js';
import { abrirModalDetalle } from '../../control/utils/Modal.js';
import { carrito } from '../../control/utils/CarritoStore.js';
import { CarritoItem } from '../../entity/CarritoItem.js';
import CarritoApi from '../../control/api/CarritoApi.js';
import '../components/ProductoItem.js'; // Importa el custom element

const productoApi = new ProductoApi();

function mostrarProductosPorTipo() {
    const contenedor = document.getElementById('productos');
    contenedor.innerHTML = '<p>Cargando productos...</p>';

    productoApi.getProductosPorTipo()
        .then(productosPorTipo => {
            contenedor.innerHTML = '';
            Object.entries(productosPorTipo).forEach(([tipo, productos]) => {
                const tipoSection = document.createElement('section');
                tipoSection.className = 'tipo-producto';
                const h2 = document.createElement('h2');
                h2.textContent = tipo.charAt(0).toUpperCase() + tipo.slice(1);
                tipoSection.appendChild(h2);

                const ul = document.createElement('ul');
                productos.forEach(producto => {
                    const item = document.createElement('producto-item');
                    item.data = producto;
                    item.onclick = () => abrirModalDetalle({
                        tipo: 'producto',
                        data: producto,
                        onAgregar: (detalle) => {
                            const carritoItem = new CarritoItem(
                                producto.idProductoPrecio,
                                producto.nombre,
                                detalle.cantidad,
                                producto.precio,
                                producto.observaciones || ''
                            );
                            carrito.items.push(carritoItem);

                            CarritoApi.enviarCarrito(carrito)
                                .then(() => {
                                    alert('Producto agregado al carrito');
                                })
                                .catch(error => {
                                    alert('Error al agregar al carrito: ' + error.message);
                                });
                        }
                    });
                    ul.appendChild(item);
                });
                tipoSection.appendChild(ul);
                contenedor.appendChild(tipoSection);
            });
        })
        .catch(error => {
            contenedor.innerHTML = `<p>Error al cargar los productos: ${error.message}</p>`;
        });
}

mostrarProductosPorTipo();