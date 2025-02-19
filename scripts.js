const productos = [
    { id: 1, nombre: '🍔 Classic Burger', precio: 8.99 },
    { id: 2, nombre: '🔥 Spicy BBQ Burger', precio: 10.99 },
    { id: 3, nombre: '🌱 Vegan Delight Burger', precio: 9.99 },
    { id: 4, nombre: '🌯 Chicken Wrap', precio: 7.99 },
    { id: 5, nombre: '🥑 Avocado Wrap', precio: 8.49 }
];

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function crearMensaje(mensaje, tipo) {
    const chatBox = document.getElementById("chat-box");
    const msg = document.createElement("div");
    msg.classList.add("message", tipo);
    msg.innerText = mensaje;
    chatBox.appendChild(msg);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function mostrarProductos() {
    crearMensaje("📜 Aquí está nuestro menú:", "bot-message");
    productos.forEach(producto => {
        crearMensaje(`${producto.nombre} - $${producto.precio.toFixed(2)}`, "bot-message");
    });
    crearMensaje("👉 Para ordenar, escribe 'agregar [nombre del producto]'", "bot-message");
}

function agregarAlCarrito(nombre) {
    const producto = productos.find(p => p.nombre.toLowerCase().includes(nombre.toLowerCase()));
    if (producto) {
        carrito.push(producto);
        localStorage.setItem("carrito", JSON.stringify(carrito));
        crearMensaje(`✅ ${producto.nombre} añadido al pedido.`, "bot-message");
    } else {
        crearMensaje("❌ Producto no encontrado. Prueba 'Ver menú' para ver opciones.", "bot-message");
    }
}

function mostrarCarrito() {
    if (carrito.length === 0) {
        crearMensaje("🛒 Tu pedido está vacío.", "bot-message");
    } else {
        crearMensaje("📦 Tu pedido contiene:", "bot-message");
        carrito.forEach(p => {
            crearMensaje(`${p.nombre} - $${p.precio.toFixed(2)}`, "bot-message");
        });
        crearMensaje("Para confirmar tu pedido, escribe: 'confirmar pedido' o presiona el botón.", "bot-message");
    }
}

function confirmarCompra() {
    if (carrito.length === 0) {
        crearMensaje("❌ No tienes productos en tu pedido.", "bot-message");
    } else {
        let total = carrito.reduce((acc, p) => acc + p.precio, 0);
        crearMensaje(`🎉 ¡Pedido confirmado! Total a pagar: $${total.toFixed(2)}`, "bot-message");

        const pedido = {
            productos: carrito,
            total: total,
            fecha: new Date().toISOString()
        };

        localStorage.setItem("pedido", JSON.stringify(pedido));
        carrito = [];
        localStorage.removeItem("carrito");
    }
}

function responderPreguntas(pregunta) {
    if (pregunta.includes("menú") || pregunta.includes("productos")) {
        mostrarProductos();
    } else if (pregunta.includes("precio")) {
        crearMensaje("💰 Los precios varían según el producto. Pregunta por uno específico.", "bot-message");
    } else if (pregunta.includes("cómo ordenar")) {
        crearMensaje("🍽️ Para ordenar: elige un producto y agrégalo con 'agregar [nombre del producto]'.", "bot-message");
    } else {
        crearMensaje("❓ No entendí. Prueba con 'Ver menú' o 'Ver pedido'.", "bot-message");
    }
}

document.getElementById("send-btn").addEventListener("click", () => {
    const userInput = document.getElementById("user-input").value.toLowerCase();
    document.getElementById("user-input").value = "";

    crearMensaje(userInput, "user-message");

    if (userInput.includes("ver menú")) {
        mostrarProductos();
    } else if (userInput.includes("agregar")) {
        const productoNombre = userInput.replace("agregar ", "");
        agregarAlCarrito(productoNombre);
    } else if (userInput.includes("ver pedido")) {
        mostrarCarrito();
    } else if (userInput.includes("confirmar pedido")) {
        confirmarCompra();
    } else {
        responderPreguntas(userInput);
    }
});

crearMensaje("👋 ¡Hola! Soy el Chatbot de Burgers & Wraps 🍔🌯. ¿Qué te gustaría pedir hoy?", "bot-message");
crearMensaje("Usa los botones o escribe para interactuar. 🚀", "bot-message");
