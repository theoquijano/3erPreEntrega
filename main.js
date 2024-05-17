let manoElegida = document.querySelectorAll(".mano")
let puntosUsuario = 0
let puntosPC = 0
let contenedorPuntosUsuario = document.querySelector("#puntos-usuario")
let contenedorPuntosPC = document.querySelector("#puntos-computadora")
let mensaje = document.querySelector("#mensaje")
let manoEleccion = document.querySelector("#mano-eleccion")
let reiniciar = document.querySelector("#reiniciar")
let botonHistorial = document.querySelector("#historial")
let usuarioHistorial = document.querySelector("#historial-usuario")
let pcHistorial = document.querySelector("#historial-pc")

manoElegida.forEach(mano => {
    mano.addEventListener("click", empezarJuego)
})

function empezarJuego(event) {
    let computadora = Math.floor(Math.random() * 3)
    let usuario = event.currentTarget.id

    computadora === 0 ? computadora = "piedra" :
    computadora === 1 ? computadora = "papel" :
    computadora === 2 ? computadora = "tijera" : ''

    if (
        (usuario === "piedra" && computadora === "tijera") ||
        (usuario === "tijera" && computadora === "papel") ||
        (usuario === "papel" && computadora === "piedra")
    ) {
        ganadorUsuario()
    } else if (
        (computadora === "piedra" && usuario === "tijera") ||
        (computadora === "tijera" && usuario === "papel") ||
        (computadora === "papel" && usuario === "piedra")
    ) {
        ganadorPC()
    }

    if (puntosUsuario === 5 || puntosPC === 5) {
        manoEleccion.classList.add("disabled")
        contenedorPuntosPC.innerText = puntosPC
        contenedorPuntosUsuario.innerHTML = puntosUsuario
        reiniciar.classList.remove("disabled")
        reiniciar.addEventListener("click", reiniciarJuego)
        guardarResultados()
    }
}

function ganadorUsuario() {
    puntosUsuario++
    contenedorPuntosUsuario.innerText = puntosUsuario
}

function ganadorPC() {
    puntosPC++
    contenedorPuntosPC.innerText = puntosPC
}

function reiniciarJuego() {
    puntosUsuario = 0
    puntosPC = 0
    contenedorPuntosPC.innerText = puntosPC
    contenedorPuntosUsuario.innerHTML = puntosUsuario
    reiniciar.classList.add("disabled")
    manoEleccion.classList.remove("disabled")
} 

function guardarResultados() {
    localStorage.setItem("puntosUsuario", puntosUsuario);
    localStorage.setItem("puntosPC", puntosPC);
}

botonHistorial.addEventListener("click", () => {
    let historialUs = localStorage.getItem("puntosUsuario")
    let historialPc = localStorage.getItem("puntosPC")

    if (usuarioHistorial.classList.contains("hidden") || pcHistorial.classList.contains("hidden")) {
        usuarioHistorial.classList.remove("hidden")
        pcHistorial.classList.remove("hidden")
        usuarioHistorial.innerHTML = historialUs
        pcHistorial.innerHTML = historialPc
    } else {
        usuarioHistorial.classList.add("hidden")
        pcHistorial.classList.add("hidden")
    }
    
})