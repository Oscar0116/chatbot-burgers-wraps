// Productos disponibles
const productos = [
    { id: 1, nombre: '🍔 Burger Clásica', precio: 8.99 },
    { id: 2, nombre: '🌯 Wrap BBQ', precio: 6.99 },
    { id: 3, nombre: '🍔 Burger Doble Queso', precio: 10.99 }
];

// Carrito de compras
let carrito = [];

// Función para crear mensajes en el chat
function crearMensaje(mensaje, tipo) {
    const chatBox = document.getElementById("chat-box");
    const divMensaje = document.createElement("div");
    divMensaje.classList.add("message", tipo);
    divMensaje.innerText = mensaje;
    chatBox.appendChild(divMensaje);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Mensaje de bienvenida
function iniciarChat() {
    crearMensaje("👋 ¡Hola! Soy el chatbot del Grupo 6. ¿Cómo te puedo ayudar?", "bot-message");
    crearMensaje("Puedes preguntar por nuestros productos, precios o hacer un pedido.", "bot-message");
}

// Mostrar productos con botón para agregar al carrito
function mostrarProductos() {
    crearMensaje("🍔 Aquí están nuestros productos:", "bot-message");

    productos.forEach(producto => {
        const chatBox = document.getElementById("chat-box");

        // Crear el mensaje con el producto
        const divMensaje = document.createElement("div");
        divMensaje.classList.add("message", "bot-message");
        divMensaje.innerHTML = `${producto.nombre} - $${producto.precio.toFixed(2)} <br>`;

        // Crear botón de agregar al carrito
        const btnAgregar = document.createElement("button");
        btnAgregar.innerText = "➕ Agregar al carrito";
        btnAgregar.style.marginTop = "5px";
        btnAgregar.onclick = function () {
            agregarAlCarrito(producto.id);
        };

        divMensaje.appendChild(btnAgregar);
        chatBox.appendChild(divMensaje);
        chatBox.scrollTop = chatBox.scrollHeight;
    });
}

// Agregar un producto al carrito
function agregarAlCarrito(idProducto) {
    const producto = productos.find(p => p.id === idProducto);
    carrito.push(producto);
    crearMensaje(`✅ ${producto.nombre} ha sido agregado al carrito.`, "bot-message");
}

// Mostrar carrito
function mostrarCarrito() {
    if (carrito.length === 0) {
        crearMensaje("🛒 Tu carrito está vacío.", "bot-message");
    } else {
        let mensaje = "🛍️ Tu carrito:\n";
        let total = 0;
        carrito.forEach((item, index) => {
            mensaje += `${index + 1}. ${item.nombre} - $${item.precio.toFixed(2)}\n`;
            total += item.precio;
        });
        mensaje += `\n💰 Total: $${total.toFixed(2)}`;
        crearMensaje(mensaje, "bot-message");
    }
}

// Confirmar compra
function confirmarCompra() {
    if (carrito.length === 0) {
        crearMensaje("❌ No puedes confirmar una compra sin productos en el carrito.", "bot-message");
    } else {
        crearMensaje("✅ ¡Compra confirmada! Gracias por tu pedido. 🍔🥤", "bot-message");
        carrito = []; // Vaciar carrito después de la compra
    }
}

// Enviar mensaje del usuario
document.getElementById("send-btn").addEventListener("click", function () {
    const userInput = document.getElementById("user-input").value;
    if (userInput.trim() !== "") {
        crearMensaje(userInput, "user-message");
        procesarMensaje(userInput.toLowerCase());
        document.getElementById("user-input").value = "";
    }
});

// Responder preguntas comunes
function procesarMensaje(mensaje) {
    if (mensaje.includes("hola") || mensaje.includes("buenas")) {
        crearMensaje("👋 ¡Hola! ¿En qué puedo ayudarte?", "bot-message");
    } else if (mensaje.includes("productos") || mensaje.includes("qué venden")) {
        mostrarProductos();
    } else if (mensaje.includes("carrito")) {
        mostrarCarrito();
    } else if (mensaje.includes("comprar") || mensaje.includes("confirmar")) {
        confirmarCompra();
    } else {
        crearMensaje("🤖 No entendí tu mensaje. Puedes escribir 'Ver productos', 'Ver carrito' o 'Confirmar compra'.", "bot-message");
    }
}

// Iniciar chat con mensaje de bienvenida
document.addEventListener("DOMContentLoaded", iniciarChat);
