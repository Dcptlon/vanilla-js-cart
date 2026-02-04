import { productos } from "./data.js"
import { renderizarProductos } from "./ui.js"
import { inicializarListenersCarrito } from "./cart.js"
import { cart } from "./cart.js"
import { renderizarCarrito } from "./ui.js"


renderizarProductos(productos)
inicializarListenersCarrito()
renderizarCarrito(cart)
const cantidadCarrito = document.getElementById("totalProductos")
const btCantidad = document.querySelectorAll(".bt-cantidad")

//originalmente para un ejercicios
/*
btCantidad.forEach((e) => {
    e.addEventListener("click", () => {
        const cantidad = parseInt(e.dataset.cantidad) + parseInt(cantidadCarrito.textContent)
        if (cantidad < 0) {
            cantidadCarrito.textContent = "0"
            return
        }
        cantidadCarrito.textContent = cantidad
    })
})
*/

