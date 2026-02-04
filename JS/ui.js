/**
 * @param {import("./types").Producto[]} productos 
 */
export function renderizarProductos(productos) {
    const contenedor = document.getElementById('contProductos')
    contenedor.innerHTML = ''
    productos.forEach(producto => {
        const card = crearCard(producto)
        contenedor.appendChild(card)
    });
}

/**
 * @param {import("./types").Producto} producto 
 * @returns {HTMLDivElement}
 */
function crearCard(producto) {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = producto.id

    const name = document.createElement('h3');
    name.className = 'nombre';
    name.textContent = producto.nombre;

    const price = document.createElement('span');
    price.className = 'precio';
    price.textContent = `$${producto.precio / 100}`;

    const imgContainer = document.createElement('div');
    imgContainer.className = 'cont-img';

    const img = document.createElement('img');
    img.src = producto.imagen;
    img.alt = producto.nombre;

    imgContainer.appendChild(img);

    const buttonCarrito = document.createElement('button')
    buttonCarrito.className = 'button-cart'
    buttonCarrito.textContent = 'Agregar al carrito'

    card.append(name, price, imgContainer, buttonCarrito);

    return card

}

/**
 * @param {import("./types").ProductoItem[]} cart
 */
export function renderizarCarrito(cart) {
    const contenedor = document.getElementById("listaProductos")
    const SpanTotalProductos = document.getElementById('totalProductos')
    const spanMontoTotal = document.getElementById("montoFinal")
    contenedor.innerHTML = ''

    SpanTotalProductos.innerText = cart.reduce((sum, item) => sum + item.cantidad, 0)
    console.log(cart.reduce((sum, item) => sum + item.cantidad, 0))
    spanMontoTotal.innerText = cart.reduce((sum, item) => sum + item.precio * item.cantidad, 0) / 100 + "$"

    if (cart.length == 0) {
        contenedor.textContent = "Tu carrito esta vacio"
        return
    }

    cart.forEach(producto => {
        const lista = crearLiProducto(producto)
        contenedor.appendChild(lista)
    })


}
/**
 * @param {import("./types").ProductoItem} productoItem
 * @returns {HTMLLIElement}
 */
function crearLiProducto(productoItem) {
    const subtotal = (productoItem.cantidad * productoItem.precio) / 100 + "$"

    const CarritoItem = document.createElement('li')
    CarritoItem.dataset.id = productoItem.id
    CarritoItem.innerText = `${productoItem.nombre} $${productoItem.precio / 100} x ${productoItem.cantidad} = ${subtotal}`

    const opciones = document.createElement('div')
    opciones.className = 'cart-opciones'

    const btEliminar = document.createElement('button')
    btEliminar.innerText = "Eliminar"
    btEliminar.className = 'bt-Eliminar-item bt-item'
    btEliminar.dataset.accion = 'Eliminar'

    const btAumentar = document.createElement('button')
    btAumentar.innerText = "+1"
    btAumentar.className = 'bt-cantidad bt-item'
    btAumentar.dataset.accion = 'Aumentar'

    const btDisminuir = document.createElement('button')
    btDisminuir.innerText = '-1'
    btDisminuir.className = 'bt-cantidad bt-item'
    btDisminuir.dataset.accion = 'Disminuir'

    opciones.append(btAumentar, btDisminuir, btEliminar)
    CarritoItem.append(opciones)

    return CarritoItem
}

/**
 * 
 * @param {string} mensaje 
 */
export function mostrarToast(mensaje) {
    const toast = document.createElement('div')
    toast.className = 'toast'
    toast.textContent = mensaje

    document.body.appendChild(toast)
    setTimeout(() => {
        toast.remove()
    }, 3000)
}

/**
 * 
 * @param {number} idProducto 
 * @param {number} stock 
 */

export function actualizarBotonEstado(idProducto, stock) {
    const card = document.querySelector(`[data-id="${idProducto}"]`)
    if (!card) return

    const boton = card.querySelector('.button-cart')
    boton.disabled = stock === 0
    boton.textContent = stock === 0 ? 'Agotado' : 'Agregar al carrito'

}