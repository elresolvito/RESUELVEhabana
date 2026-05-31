// ============================================
// RESUELVEhabana - Estado Global del Carrito
// ============================================

let globalCart = [];

// ========== CATÁLOGO DE PRODUCTOS (COMPLETO 36+ productos) ==========
const PRODUCTS_CATALOG = [
    // Alimentos y conservas
    { id: "1", name: "Atún en lata", category: "Alimentos y conservas", price: 540, priceUSD: 5.40, img: "https://i.postimg.cc/76xHK6zt/atun_precio_500.png", desc: "Lata estándar 200g. Producto de alta calidad." },
    { id: "2", name: "Pasta de tomate", category: "Alimentos y conservas", price: 350, priceUSD: 3.50, img: "https://i.postimg.cc/gjjYPTNv/pasta_tomate_precio_350.png", desc: "Paquete de pasta de tomate concentrada." },
    { id: "3", name: "Pimiento fresco", category: "Alimentos y conservas", price: 750, priceUSD: 7.50, img: "https://i.postimg.cc/4yyJTSBj/pimiento_presio_750.png", desc: "Unidad de pimiento fresco." },
    { id: "4", name: "Café Dualis 250 g", category: "Alimentos y conservas", price: 1450, priceUSD: 14.50, img: "https://i.postimg.cc/WbZBX2hN/cafe_dualis_250_g_precio_1450.png", desc: "Paquete 250 g. Café de alta calidad." },
    { id: "5", name: "Café Dufiltro 250 g", category: "Alimentos y conservas", price: 1450, priceUSD: 14.50, img: "https://i.postimg.cc/hG26fv31/cafe_Dufiltro_250_g_precio_1450.png", desc: "Paquete 250 g. Café de filtro." },
    { id: "6", name: "Café Enepa", category: "Alimentos y conservas", price: 470, priceUSD: 4.70, img: "https://i.postimg.cc/nhY6f04N/cafe_enepa_precio_450.png", desc: "Café Enepa tradicional." },
    { id: "7", name: "Cartón de huevo 30 u", category: "Alimentos y conservas", price: 3000, priceUSD: 30.00, img: "https://i.postimg.cc/sDWkwVvv/carton_de_huevo_30_u_precio_3000.png", desc: "Cartón con 30 huevos frescos." },
    { id: "8", name: "Leche condensada", category: "Alimentos y conservas", price: 950, priceUSD: 9.50, img: "https://i.postimg.cc/tT2XwjtT/leche_condensada.png", desc: "Lata 397 g. Leche condensada." },
    { id: "9", name: "Harina blanca 1 Kg", category: "Alimentos y conservas", price: 600, priceUSD: 6.00, img: "https://i.postimg.cc/3xc2NHFB/harina_blanca1_kg.png", desc: "Paquete 1 Kg de harina blanca." },
    // Snacks y golosinas
    { id: "10", name: "Chicoticos Pelly 90 g", category: "Snacks y golosinas", price: 400, priceUSD: 4.00, img: "https://i.postimg.cc/1zv2fXjZ/chicoticos_pelly_90_g_precio_400.png", desc: "Paquete 90 g. Chicotitos Pelly." },
    { id: "11", name: "Papitas Campesinas", category: "Snacks y golosinas", price: 690, priceUSD: 6.90, img: "https://i.postimg.cc/cLgrDtf9/papitas_campesinas_precio_690.png", desc: "Papitas campesinas artesanales." },
    { id: "12", name: "Pelly Jamón", category: "Snacks y golosinas", price: 580, priceUSD: 5.80, img: "https://i.postimg.cc/pdQV7frX/pelly_jamon_precio_580.png", desc: "Snack sabor jamón." },
    // Salsas
    { id: "13", name: "Mayonesa Mediana", category: "Salsas", price: 850, priceUSD: 8.50, img: "https://i.postimg.cc/KzJZw2rR/mayonesa_precio_850.png", desc: "Frasco mediano de mayonesa." },
    { id: "14", name: "Mayonesa Grande", category: "Salsas", price: 1100, priceUSD: 11.00, img: "https://i.postimg.cc/Px2t9jzz/mayonesa_precio1100.png", desc: "Frasco grande de mayonesa." },
    // Higiene personal
    { id: "15", name: "Cuchilla de Afeitar", category: "Higiene personal", price: 100, priceUSD: 1.00, img: "https://i.postimg.cc/8CdkdW7x/cuchilla_de_afeitar_precio_100.png", desc: "Unidad de cuchilla de afeitar." },
    { id: "16", name: "Jabón Marwa", category: "Higiene personal", price: 150, priceUSD: 1.50, img: "https://i.postimg.cc/3RK8tRpR/jabon_marwa_precio_150.png", desc: "Pastilla de jabón Marwa." },
    { id: "17", name: "Papel Sanitario", category: "Higiene personal", price: 490, priceUSD: 4.90, img: "https://i.postimg.cc/bwW289qD/papel_sanitario_precio_490i.png", desc: "Paquete de papel sanitario." },
    { id: "18", name: "Toallas Sanitarias", category: "Higiene personal", price: 450, priceUSD: 4.50, img: "https://i.postimg.cc/KjjZyH0b/toallas_sanitarias_precio_450.png", desc: "Paquete de toallas sanitarias." },
    { id: "19", name: "Toallas Húmedas", category: "Higiene personal", price: 690, priceUSD: 6.90, img: "https://i.postimg.cc/W4ZSP3cw/toallas_humedas_precio_690.png", desc: "Paquete de toallas húmedas." },
    // Aseo del hogar
    { id: "20", name: "Jabón de Lavar", category: "Aseo del hogar", price: 250, priceUSD: 2.50, img: "https://i.postimg.cc/V6YfK6Mz/jabon_de_lavar_precio_250.png", desc: "Pastilla de jabón para lavar." },
    // Perfumes y desodorantes
    { id: "21", name: "Perfume Candy", category: "Perfumes y desodorantes", price: 3100, priceUSD: 31.00, img: "https://i.postimg.cc/vTgJRyhp/perfume_candy_precio_3100.png", desc: "Frasco 50 ml. Perfume Candy." },
    { id: "22", name: "Perfume genérico", category: "Perfumes y desodorantes", price: 3100, priceUSD: 31.00, img: "https://i.postimg.cc/ZKrT0PPG/perfume_precio_3100.png", desc: "Frasco 50 ml. Perfume genérico." },
    { id: "23", name: "Perfume Q", category: "Perfumes y desodorantes", price: 3100, priceUSD: 31.00, img: "https://i.postimg.cc/CL03P3Dn/perfume_q_precio_3100.png", desc: "Frasco 50 ml. Perfume Q." },
    { id: "24", name: "Desodorante Obao", category: "Perfumes y desodorantes", price: 1100, priceUSD: 11.00, img: "https://i.postimg.cc/PxtXSxD2/desodorante_obao_precio_1100.png", desc: "Spray/Roll-on desodorante Obao." },
    { id: "25", name: "Desodorante Rush Blanco", category: "Perfumes y desodorantes", price: 1000, priceUSD: 10.00, img: "https://i.postimg.cc/FR9rTRS8/desodorante_rush_blanco_precio_1000.png", desc: "Roll-on desodorante Rush Blanco." },
    { id: "26", name: "Desodorante Rush", category: "Perfumes y desodorantes", price: 1000, priceUSD: 10.00, img: "https://i.postimg.cc/sXVjTXSF/desodorante_rush_precio_1000.png", desc: "Spray desodorante Rush." },
    { id: "27", name: "Colonia Niña", category: "Perfumes y desodorantes", price: 1100, priceUSD: 11.00, img: "https://i.postimg.cc/G3v04rsM/colonia_nina.png", desc: "Botella 100 ml. Colonia Niña." },
    // Pastas y fideos
    { id: "28", name: "Macarrones", category: "Pastas y fideos", price: 300, priceUSD: 3.00, img: "https://i.postimg.cc/Hsmz1H69/macarrones_precio_300.png", desc: "Paquete estándar de macarrones." },
    { id: "29", name: "Sopas instantáneas", category: "Pastas y fideos", price: 160, priceUSD: 1.60, img: "https://i.postimg.cc/FzNTpQqK/sopas_instantaneas_precio_160.png", desc: "Paquete de sopas instantáneas." },
    // Bebidas alcohólicas y malta
    { id: "30", name: "Licor de fresa", category: "Bebidas alcohólicas y malta", price: 2500, priceUSD: 25.00, img: "https://i.postimg.cc/59YT2x5p/licor_de_fresa_precio_2500.png", desc: "Botella de licor de fresa." },
    { id: "31", name: "Licor Cocobay", category: "Bebidas alcohólicas y malta", price: 2500, priceUSD: 25.00, img: "https://i.postimg.cc/7ZDW90Fz/locor_cocobay_precio_2500.png", desc: "Botella de licor Cocobay." },
    { id: "32", name: "Whisky Spirit 200 ml", category: "Bebidas alcohólicas y malta", price: 320, priceUSD: 3.20, img: "https://i.postimg.cc/4N8W6q1t/tea_precio_320.png", desc: "Botella 200 ml. Whisky Spirit." },
    { id: "33", name: "Whisky 1L", category: "Bebidas alcohólicas y malta", price: 1350, priceUSD: 13.50, img: "https://i.postimg.cc/cLyrb4T0/whisky_1L_precio_1350.png", desc: "Botella 1 L de whisky." },
    { id: "34", name: "Whisky Sir Albin", category: "Bebidas alcohólicas y malta", price: 550, priceUSD: 5.50, img: "https://i.postimg.cc/y84kbYnC/whisky_sir_albin_precio_550.png", desc: "Botella pequeña de whisky Sir Albin." },
    { id: "35", name: "Vino Pluvium", category: "Bebidas alcohólicas y malta", price: 1200, priceUSD: 12.00, img: "https://i.postimg.cc/XNLLWmmx/vino_pluvium_precio_1200.png", desc: "Botella de vino Pluvium." },
    // Electrónicos y accesorios
    { id: "36", name: "Baterías Triple A", category: "Electrónicos y accesorios", price: 300, priceUSD: 3.00, img: "https://i.postimg.cc/DZ2vxZsT/Gemini_Generated_Image_824rio824rio824r.png", desc: "Pack de 4 unidades baterías AAA." },
    // ACCESORIOS (carteras y chancletas)
    { id: "37", name: "Cartera Beige", category: "Accesorios", price: 1200, priceUSD: 12.00, img: "https://i.postimg.cc/jdT90t0x/cartera-beige.webp", desc: "Cartera elegante color beige." },
    { id: "38", name: "Cartera Carmelita", category: "Accesorios", price: 1200, priceUSD: 12.00, img: "https://i.postimg.cc/Yq7VKMKk/cartera-carmelita.webp", desc: "Cartera elegante color carmelita." },
    { id: "39", name: "Cartera Negra", category: "Accesorios", price: 1200, priceUSD: 12.00, img: "https://i.postimg.cc/XNdhzXPv/cartera-negra.webp", desc: "Cartera elegante color negra." },
    { id: "40", name: "Chancletas Blancas", category: "Accesorios", price: 800, priceUSD: 8.00, img: "https://i.postimg.cc/VkLVvgkM/CHANCLETAS-BLANCAS.webp", desc: "Chancletas cómodas color blanco." },
    { id: "41", name: "Chancletas Negras", category: "Accesorios", price: 800, priceUSD: 8.00, img: "https://i.postimg.cc/vZHNThZ3/chancletas-negras.webp", desc: "Chancletas cómodas color negro." }
];

function getProductById(id) {
    return PRODUCTS_CATALOG.find(p => p.id === id);
}

function getAllCategories() {
    const cats = [...new Set(PRODUCTS_CATALOG.map(p => p.category))];
    return cats.sort();
}

// Cargar carrito desde localStorage
function loadCart() {
    const saved = localStorage.getItem('resuelve_cart');
    if (saved) {
        try {
            globalCart = JSON.parse(saved);
        } catch(e) { globalCart = []; }
    } else {
        globalCart = [];
    }
    updateAllBadges();
    return globalCart;
}

// Guardar carrito
function saveCart() {
    localStorage.setItem('resuelve_cart', JSON.stringify(globalCart));
    updateAllBadges();
    window.dispatchEvent(new Event('cartUpdated'));
}

// Añadir producto al carrito
function addToCart(product, quantity = 1) {
    if (!product || !product.id) return false;
    
    const existing = globalCart.find(item => item.id === product.id);
    if (existing) {
        existing.quantity += quantity;
    } else {
        globalCart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            priceUSD: product.priceUSD || product.price / 100,
            category: product.category,
            img: product.img,
            desc: product.desc || '',
            quantity: quantity
        });
    }
    saveCart();
    showAddToCartFeedback(product.name, quantity);
    return true;
}

// Actualizar badge del carrito
function updateAllBadges() {
    const totalItems = globalCart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelectorAll('.cart-badge').forEach(badge => {
        badge.textContent = totalItems;
        if (totalItems > 0) {
            badge.style.display = 'flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

// Obtener carrito
function getCart() {
    return [...globalCart];
}

function getCartTotalItems() {
    return globalCart.reduce((sum, item) => sum + item.quantity, 0);
}

function getCartSubtotalCUP() {
    return globalCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

function getCartSubtotalUSD() {
    return globalCart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
}

function updateCartItem(productId, newQuantity) {
    if (newQuantity <= 0) {
        globalCart = globalCart.filter(item => item.id !== productId);
    } else {
        const item = globalCart.find(i => i.id === productId);
        if (item) item.quantity = newQuantity;
    }
    saveCart();
}

function removeCartItem(productId) {
    globalCart = globalCart.filter(item => item.id !== productId);
    saveCart();
}

function clearCart() {
    globalCart = [];
    saveCart();
}

function showAddToCartFeedback(productName, quantity) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `✓ ${quantity} × ${productName.substring(0, 35)} añadido al carrito`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

window.addEventListener('storage', (e) => {
    if (e.key === 'resuelve_cart') {
        loadCart();
    }
});

// Estilos del toast
const toastStyles = document.createElement('style');
toastStyles.textContent = `
    .toast-notification {
        position: fixed;
        bottom: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #00535b;
        color: white;
        padding: 12px 24px;
        border-radius: 100px;
        font-size: 14px;
        font-weight: bold;
        z-index: 10000;
        animation: slideUpFade 2.8s ease forwards;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        font-family: 'Quicksand', sans-serif;
    }
    @keyframes slideUpFade {
        0% { opacity: 0; transform: translateX(-50%) translateY(20px); }
        15% { opacity: 1; transform: translateX(-50%) translateY(0); }
        85% { opacity: 1; transform: translateX(-50%) translateY(0); }
        100% { opacity: 0; transform: translateX(-50%) translateY(-20px); visibility: hidden; }
    }
`;
document.head.appendChild(toastStyles);
