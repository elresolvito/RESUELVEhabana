// ============================================
// RESUELVEhabana - Estado Global del Carrito
// ============================================

let globalCart = [];

// Cargar carrito desde localStorage al inicio
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

// Guardar carrito y actualizar badges
function saveCart() {
    localStorage.setItem('resuelve_cart', JSON.stringify(globalCart));
    updateAllBadges();
    window.dispatchEvent(new Event('cartUpdated'));
}

// Añadir producto (con cantidad)
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
            priceUSD: product.priceUSD || product.price,
            category: product.category || 'General',
            img: product.img || '',
            quantity: quantity
        });
    }
    saveCart();
    showAddToCartFeedback(product.name, quantity);
    return true;
}

// Actualizar todos los badges de carrito en la página
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

// Obtener carrito (para página de checkout)
function getCart() {
    return [...globalCart];
}

// Obtener total de items
function getCartTotalItems() {
    return globalCart.reduce((sum, item) => sum + item.quantity, 0);
}

// Obtener subtotal en USD
function getCartSubtotalUSD() {
    return globalCart.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
}

// Obtener subtotal en CUP (si aplica)
function getCartSubtotalCUP() {
    return globalCart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Actualizar cantidad de un item
function updateCartItem(productId, newQuantity) {
    if (newQuantity <= 0) {
        globalCart = globalCart.filter(item => item.id !== productId);
    } else {
        const item = globalCart.find(i => i.id === productId);
        if (item) item.quantity = newQuantity;
    }
    saveCart();
}

// Eliminar item del carrito
function removeCartItem(productId) {
    globalCart = globalCart.filter(item => item.id !== productId);
    saveCart();
}

// Vaciar carrito completo
function clearCart() {
    globalCart = [];
    saveCart();
}

// Feedback visual al añadir (toast)
function showAddToCartFeedback(productName, quantity) {
    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `✓ ${quantity} × ${productName.substring(0, 30)} añadido al carrito`;
    document.body.appendChild(toast);
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

// ========== CATÁLOGO DE PRODUCTOS (compartido) ==========
const PRODUCTS_CATALOG = [
    { id: "p1", name: "Café Serrano (250g)", category: "Alimentos", price: 600, priceUSD: 12.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuBFh6AuApGCh5Vi8Q2UzNURwSuIff_8H_QBwc8__zxno66j7eQJ_6V_lHiBAy_kNZGaOoflwhYdwx0EmIEbUevlAEnVMJa5TV4HSm6-OFJxY0cMORadL5MB2ctZx47fOSqyNvFJJ2jLssCEohyeOIyze4sZyZv2RA3X6cOL38hofosypNC345JJwbmH290WO7VZDRSnpRC_cDkynm8XG5DZ1nw3udbk3wtQ0NQLIuBBx5-JASorsJHFZalH3PQcVXWJfeqYcA-8954", desc: "Tueste oscuro, grano entero. Aroma intenso." },
    { id: "p2", name: "Aceite de Girasol (1L)", category: "Alimentos", price: 420, priceUSD: 4.20, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuCIP42Cnr8TB1HBj0Z5X05y1p0gOkLmgWxmZV0gCwaxK4-IbrV3RNUDlwBI9BRpHsGmwaPdLuR4C5Sib3EvFkOxMQerDHPpf_UGctWafbkPhN9zRY5iJTlYuM8nEd3o_H3qa000ZrfGBUu4as4OCCNz1UIwCLj-OCaRQQffEJE1IgfapaG36cZ82frxLG5B39T9geEPrK8UpLf6MVww2gDLrdcjBzLP48XhCnmyjici1OsDD12HBQp4Z9TW2hIeMfL_PGR_oIrcMzU", desc: "Refinado, grado A. Ideal para freír." },
    { id: "p3", name: "Detergente en Polvo 500g", category: "Aseo", price: 280, priceUSD: 2.80, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAYSHZBJ9hoFUGKMR2RuGVfYHgq8Z6Ue0qNm62owqSJlxL0DGJ1BcdTsnc1FFit5b0XNY59BW1oC7wDt6CHbAvUtGWKIjgy0g8g6vTnIvtnGtHUFjVEYtQSRsZcXZWCkW9KSIdCUyTLxtRUYagtg3otT32iiQdtQLWdkJ6MphhurNJLVaQNpz0r7-SdPzmczaCxl_Bhm43mLt--LobDS6D7sBEgqdXHgsQZW1Mf-CmR4g5YTFii16j9TkIiOdg96zgDz64NfZ2j1lc", desc: "Poderoso quitamanchas, fragancia fresca." },
    { id: "p4", name: "Pasta Dental Mentol", category: "Aseo", price: 150, priceUSD: 1.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuA7ezOpIItP8jR9EZ_q50ntPMdpyEEdpCd2D8hU4N_38pINiuj2hXkubHO7KsfwH0NUzE-82X8s_C3zAd0FAXyLOh8tGHfVv9GsJfLJWJTx-FI93xqD9xHu3Y0j8swTIiTNVeMO4p2LDk7gO-tXXS02VXuip-Du7t5PD_qdlC6lwyQO_obKaA8RtWe2U-uzLmjxB7wgfxSDfpdjo7OjN2sSETkyMLDm6kjRZJ_k3yHZX_xFOVXzcK-A8vQuIx_WkpJdR60Bvjm9Lkk", desc: "Protección 24h, frescura de menta." },
    { id: "p5", name: "Jabón Líquido Manos", category: "Aseo", price: 320, priceUSD: 3.20, img: "https://images.unsplash.com/photo-1583947215259-38a31f2a4c3b?auto=format&fit=crop&q=80&w=800", desc: "Hidratación suave, aroma cítrico." },
    { id: "p6", name: "Arroz Premium 1kg", category: "Alimentos", price: 290, priceUSD: 2.90, img: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?auto=format&fit=crop&q=80&w=800", desc: "Grano largo selecto, de primera calidad." },
    { id: "p7", name: "Chocolate Artesano", category: "Alimentos", price: 450, priceUSD: 4.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuD6a2vq8ngQNZGaOXR5F5I6oKX9_tMm_Yi9iar0IYCFlO16VfJAi2L4f0zvjZudrOPc_BzawRMLL1J6knEpE9Z26RScemadPuplugPP1-nXfoHiH-67g2jHE7bVQEKq6pr1TPUeKRlX7obTH_74Wz6_70GD7jcZqyR6Z41HWThfm_B6IkhcpUROHP6r0aDOgqkpflNJqO04sszBaZ-fhN2DvXGx7zBXSmaO_OsYJztNRV289hgG8gvNSZ2wPo3nYpqigJ2ekHokn1g", desc: "Cacao puro, hecho en Cuba." },
    { id: "p8", name: "Miel de Abeja (500g)", category: "Alimentos", price: 850, priceUSD: 8.50, img: "https://lh3.googleusercontent.com/aida-public/AB6AXuAPS3evEdizQhscxHNVKWBNXRwGyWpFFwKpgKKEGZpxaZyrMpW3heMttlMN9IO61bBjT4yPcAsmgazRjT2NYeAuChcUqVWWrnW7qC6NejcyJaDevjBljSasy5Xw1mUbN0W2Qyni3zlp_t9FUS9y0GvbFB0I5HY3YLD10ZAksZ-_Bmo4SyUrYGhqk5dEHLTV-4d4QpdXQndkY2hqz7HL0XkQzcj4TBegHygB_5nvwsRT1iTDAY1MqK4DWU67YRlpzrBohG4FaT-hWbg", desc: "100% pura, cosecha local." }
];

function getProductById(id) {
    return PRODUCTS_CATALOG.find(p => p.id === id);
}

// Inicializar al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    loadCart();
});

// Escuchar cambios del carrito desde otras pestañas
window.addEventListener('storage', (e) => {
    if (e.key === 'resuelve_cart') {
        loadCart();
    }
});

// Estilos para el toast (inyectar automáticamente)
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
