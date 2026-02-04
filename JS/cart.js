import { productos } from "./data.js"
import { renderizarCarrito } from "./ui.js"
import { mostrarToast } from "./ui.js"
import { actualizarBotonEstado } from "./ui.js"
const addToCard = document.getElementById('contProductos')
const vaciarCarrito = document.getElementById('btVaciar')
const carritoBotones = document.getElementById('listaProductos')
export let cart = [
]

export function inicializarListenersCarrito() {
    addToCard.addEventListener('click', (e) => {
        if (e.target.classList.contains('button-cart')) {
            const card = e.target.closest('.product-card')
            agregarAlCarrito(parseInt(card.dataset.id))
        }
    })

    vaciarCarrito.addEventListener('click', EliminarCarrito)

    carritoBotones.addEventListener('click', (e) => {
        if (e.target.classList.contains('bt-item')) {
            const li = e.target.closest('li')
            const id = parseInt(li.dataset.id)
            const accion = e.target.dataset.accion

            switch (accion) {
                case 'Eliminar':
                    eliminarDelCarrito(id)
                    break
                case 'Aumentar':
                    aumentarCantidad(id)
                    break
                case 'Disminuir':
                    disminuirCantidad(id)
                    break
            }
        }
    })


}

function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id)
    const isOnCart = cart.find(p => p.id === id)
    const nuevoProducto = { 
        ...producto,
        cantidad: 1
    }

    if (producto.stock <= 0) {
        mostrarToast('El producto se ha quedado sin stock')
        return
    }

    if (!isOnCart) {
        cart.push(nuevoProducto)
        producto.stock -= 1
        renderizarCarrito(cart)
        actualizarBotonEstado(producto.id, producto.stock)
        mostrarToast('Producto Agregado al carrito')
        return
    }

    if (isOnCart.cantidad >= producto.stock_maximo) {
        mostrarToast('Has alcanzado el limite para este producto')
        return
    }

    isOnCart.cantidad += 1
    producto.stock -= 1
    console.log('carrito = ' , cart, 'almacen = ' ,productos)
    actualizarBotonEstado(producto.id, producto.stock)

    console.log(cart)
    renderizarCarrito(cart)
    mostrarToast('Producto Agregado al carrito')
}


function EliminarCarrito() {
    if(cart.length == 0){
        mostrarToast('Tu carrito ya esta vacio')
        return
    } 
    cart.forEach(item => {
        const producto = productos.find(p => p.id === item.id)
        if (!producto) return
        
        producto.stock += item.cantidad
        
        actualizarBotonEstado(producto.id, producto.stock)
    })
    console.log('almacen nuevo', productos)
    cart = []
    renderizarCarrito(cart)
    mostrarToast('Carrito vaciado exitosamente')
}

function eliminarDelCarrito(id) {
    const producto = productos.find(p => p.id === id)
    const item = cart.find(p => p.id === id)
    producto.stock += item.cantidad

    cart = cart.filter(p => p.id !== id)
    console.log('carrito = ' , cart, 'almacen = ' ,productos)
    actualizarBotonEstado(producto.id, producto.stock)
    renderizarCarrito(cart)
    mostrarToast('Producto Eliminado del carrito')
}

function disminuirCantidad(id) {
    const producto = productos.find(p => p.id === id)
    const isOnCart = cart.find(p => p.id === id)
    if(!isOnCart) {
        mostrarToast('el producto no existe en el carrito')
        return
    }

    if(isOnCart.cantidad > 1){
        isOnCart.cantidad -= 1
        producto.stock += 1
        actualizarBotonEstado(producto.id, producto.stock)
        renderizarCarrito(cart)
        return
    }

    console.log('carrito = ' , cart, 'almacen = ' ,productos)
    eliminarDelCarrito(id)
}

function aumentarCantidad(id) {
    const item = cart.find(p => p.id === id)
    const producto = productos.find(p => p.id === id)
    if (!item) {
        mostrarToast('el producto no existe en el carrito')
        return
    }

    if (producto.stock <= 0) {
        mostrarToast('El producto se ha quedado sin stock')
        return
    }

    if (item.cantidad >= producto.stock_maximo && producto) {
        mostrarToast('Has alcanzado el limite para este producto')
        return
    }

    item.cantidad += 1
    producto.stock -= 1
    console.log('carrito = ' , cart, 'almacen = ' ,productos)
    actualizarBotonEstado(producto.id, producto.stock)
    renderizarCarrito(cart)
}

export function obtenerCarrito() {
    return cart
}
