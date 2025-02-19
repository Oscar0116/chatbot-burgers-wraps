// Productos disponibles
const productos = [
    { id: 1, nombre: 'Burger Clásica', precio: 5.99 },
    { id: 2, nombre: 'Burger BBQ', precio: 6.99 },
    { id: 3, nombre: 'Wrap de Pollo', precio: 4.99 },
    { id: 4, nombre: 'Wrap Vegetariano', precio: 4.49 }
];

// Carrito de compras
let carrito = [];

// Función para crear un mensaje en el chat
function crearMensaje(mensaje, tipo) {
    const chatBox = document.getElementById("chat-box");
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("message", tipo);
    divMensaje.innerText = mensaje;
    chatBox.appendChild(divMensaje);
    chatBox.scrollTop = chatBox.scrollHeight; // Desplazar al final
}

// Mensaje de bienvenida
function mensajeBienvenida() {
    setTimeout(() => {
        crearMensaje("👋 ¡Hola! Soy el chatbot del Grupo 6. ¿En qué puedo ayudarte?", "bot-message");
        crearMensaje("Puedes escribir 'Ver productos', 'Ver carrito' o 'Confirmar compra'.", "bot-message");
    }, 500); // Retraso leve para que se vea más natural
}

// Mostrar productos
function mostrarProductos() {
    crearMensaje("🍔 Estos son nuestros productos:", "bot-message");
    productos.forEach(producto => {
        const btn = document.createElement("button");
        btn.innerText = `Agregar ${producto.nombre} - $${producto.precio.toFixed(2)}`;
        btn.onclick = () => agregarAlCarrito(producto.id);
        btn.style.display = "block";
        btn.style.margin = "5px 0";
        document.getElementById("chat-box").appendChild(btn);
    });
}

// Agregar producto al carrito
function agregarAlCarrito(id) {
    const producto = productos.find(p => p.id === id);
    if (producto) {
        carrito.push(producto);
        crearMensaje(`✅ ${producto.nombre} ha sido agregado al carrito.`, "bot-message");
    }
}

// Mostrar carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        crearMensaje("🛒 Tu carrito está vacío.", "bot-message");
    } else {
        crearMensaje("🛒 Tu carrito:", "bot-message");
        carrito.forEach(p => crearMensaje(`${p.nombre} - $${p.precio.toFixed(2)}`, "bot-message"));
    }
}

// Confirmar compra
function confirmarCompra() {
    if (carrito.length === 0) {
        crearMensaje("🚨 No tienes productos en el carrito.", "bot-message");
    } else {
        const total = carrito.reduce((sum, p) => sum + p.precio, 0);
        crearMensaje(`🎉 ¡Compra confirmada! Total: $${total.toFixed(2)}`, "bot-message");
        carrito = [];
    }
}

// Responder preguntas comunes
function responderPregunta(pregunta) {
    const texto = pregunta.toLowerCase();
    if (texto.includes("hola") || texto.includes("buenas") || texto.includes("hey")) {
        crearMensaje("👋 ¡Hola! ¿Cómo puedo ayudarte?", "bot-message");
    } else if (texto.includes("productos")) {
        mostrarProductos();
    } else if (texto.includes("precio")) {
        crearMensaje("💲 Nuestros productos tienen precios desde $4.49 hasta $6.99.", "bot-message");
    } else if (texto.includes("cómo comprar")) {
        crearMensaje("🛒 Escribe 'Ver productos', elige los que te gusten y confirma la compra.", "bot-message");
    } else {
        crearMensaje("❓ No entiendo. Prueba con 'Ver productos' o 'Ver carrito'.", "bot-message");
    }
}

// Capturar entrada del usuario
document.getElementById("send-btn").addEventListener("click", () => {
    const input = document.getElementById("user-input").value.trim();
    if (input) {
        crearMensaje(input, "user-message");
        responderPregunta(input);
        document.getElementById("user-input").value = "";
    }
});

// Cargar mensaje de bienvenida al inicio
document.addEventListener("DOMContentLoaded", mensajeBienvenida);

