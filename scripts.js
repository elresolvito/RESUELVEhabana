// ================= CONFIGURACIÓN IA =================
const OPENROUTER_API_KEY = "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";
const AI_MODEL = "meta-llama/llama-3-8b-instruct:free";

// ================= DATOS =================
const products = [
{ id: 1, name: "Atún", category: "Alimentos y conservas", price: 500, image: "https://i.postimg.cc/76xHK6zt/atun_precio_500.png", description: "Lata estándar 200g" },
{ id: 2, name: "Pasta de tomate", category: "Alimentos y conservas", price: 380, image: "https://i.postimg.cc/gjjYPTNv/pasta_tomate_precio_350.png", description: "400 g" },
{ id: 3, name: "Aceitunas Verdes", category: "Alimentos y conservas", price: 750, image: "https://i.postimg.cc/4yyJTSBj/pimiento_presio_750.png", description: "Rodajas con Pimiento" },
{ id: 4, name: "Café Dualis", category: "Alimentos y conservas", price: 1450, image: "https://i.postimg.cc/WbZBX2hN/cafe_dualis_250_g_precio_1450.png", description: "Paquete 250 g" },
{ id: 5, name: "Café Dufiltro", category: "Alimentos y conservas", price: 1450, image: "https://i.postimg.cc/hG26fv31/cafe_Dufiltro_250_g_precio_1450.png", description: "Paquete 250 g" },
{ id: 6, name: "Pan rallado Enepa", category: "Alimentos y conservas", price: 450, image: "https://i.postimg.cc/qvQwHpNJ/pan-rallado.webp", description: "Paquete para empanar" },
{ id: 7, name: "Cartón de huevo", category: "Alimentos y conservas", price: 3000, image: "https://i.postimg.cc/sDWkwVvv/carton_de_huevo_30_u_precio_3100.png", description: "30 unidades" },
{ id: 8, name: "Leche condensada", category: "Alimentos y conservas", price: 520, image: "https://i.postimg.cc/tT2XwjtT/leche_condensada.png", description: "397 g" },
{ id: 9, name: "Harina blanca", category: "Alimentos y conservas", price: 600, image: "https://i.postimg.cc/3xc2NHFB/harina_blanca1_kg.png", description: "Paquete 1 Kg" },
{ id: 10, name: "Chicoticos Pelly", category: "Snacks y golosinas", price: 400, image: "https://i.postimg.cc/1zv2fXjZ/chicoticos_pelly_90_g_precio_400.png", description: "Paquete 90 g" },
{ id: 11, name: "Papitas Campesinas", category: "Snacks y golosinas", price: 690, image: "https://i.postimg.cc/cLgrDtf9/papitas_campesinas_precio_690.png", description: "Paquete papas fritas" },
{ id: 12, name: "Pelly de Jamón", category: "Snacks y golosinas", price: 580, image: "https://i.postimg.cc/pdQV7frX/pelly_jamon_precio_580.png", description: "Snack de maíz" },
{ id: 13, name: "Mayonesa Mediana", category: "Salsas", price: 850, image: "https://i.postimg.cc/KzJZw2rR/mayonesa_precio_850.png", description: "Frasco mediano" },
{ id: 14, name: "Mayonesa Grande", category: "Salsas", price: 1100, image: "https://i.postimg.cc/Px2t9jzz/mayonesa_precio1100.png", description: "Frasco grande" },
{ id: 15, name: "Cuchilla de Afeitar", category: "Higiene personal", price: 100, image: "https://i.postimg.cc/8CdkdW7x/cuchilla_de_afeitar_precio_100.png", description: "Unidad desechable" },
{ id: 16, name: "Jabón Marwa", category: "Higiene personal", price: 150, image: "https://i.postimg.cc/3RK8tRpR/jabon_marwa_precio_150.png", description: "Pastilla de tocador" },
{ id: 17, name: "Papel Sanitario", category: "Higiene personal", price: 490, image: "https://i.postimg.cc/bwW289qD/papel_sanitario_precio_490i.png", description: "Paquete suave" },
{ id: 18, name: "Toallas Sanitarias", category: "Higiene personal", price: 450, image: "https://i.postimg.cc/KjjZyH0b/toallas_sanitarias_precio_450.png", description: "Paquete con alas" },
{ id: 19, name: "Toallas Húmedas", category: "Higiene personal", price: 690, image: "https://i.postimg.cc/W4ZSP3cw/toallas_humedas_precio_690.png", description: "Paquete limpieza" },
{ id: 20, name: "Jabón de Lavar", category: "Aseo del hogar", price: 250, image: "https://i.postimg.cc/V6YfK6Mz/jabon_de_lavar_precio_250.png", description: "Pastilla de lavar" },
{ id: 21, name: "Perfume Candy", category: "Perfumes y desodorantes", price: 3100, image: "https://i.postimg.cc/vTgJRyhp/perfume_candy_precio_3100.png", description: "Frasco 50 ml" },
{ id: 22, name: "Perfume Genérico", category: "Perfumes y desodorantes", price: 3100, image: "https://i.postimg.cc/ZKrT0PPG/perfume_precio_3100.png", description: "50 ml surtido" },
{ id: 23, name: "Perfume Q", category: "Perfumes y desodorantes", price: 3100, image: "https://i.postimg.cc/CL03P3Dn/perfume_q_precio_3100.png", description: "Frasco 50 ml" },
{ id: 24, name: "Desodorante Obao", category: "Perfumes y desodorantes", price: 1100, image: "https://i.postimg.cc/PxtXSxD2/desodorante_obao_precio_1100.png", description: "Roll-on" },
{ id: 25, name: "Desodorante Rush Blanco", category: "Perfumes y desodorantes", price: 650, image: "https://i.postimg.cc/FR9rTRS8/desodorante_rush_blanco_precio_1000.png", description: "Roll-on" },
{ id: 26, name: "Desodorante Rush", category: "Perfumes y desodorantes", price: 650, image: "https://i.postimg.cc/sXVjTXSF/desodorante_rush_precio_1000.png", description: "Roll-on surtido" },
{ id: 27, name: "Colonia Niña", category: "Perfumes y desodorantes", price: 1100, image: "https://i.postimg.cc/G3v04rsM/colonia_nina.png", description: "100 ml infantil" },
{ id: 28, name: "Macarrones", category: "Pastas y fideos", price: 300, image: "https://i.postimg.cc/Hsmz1H69/macarrones_precio_300.png", description: "Bolsa 460 g" },
{ id: 29, name: "Sopas instantáneas", category: "Pastas y fideos", price: 160, image: "https://i.postimg.cc/FzNTpQqK/sopas_instantaneas_precio_160.png", description: "Paquete individual" },
{ id: 30, name: "Licor de fresa", category: "Bebidas", price: 2500, image: "https://i.postimg.cc/59YT2x5p/licor_de_fresa_precio_2500.png", description: "Botella crema fresa" },
{ id: 31, name: "Licor Cocobay", category: "Bebidas", price: 2500, image: "https://i.postimg.cc/7ZDW90Fz/locor_cocobay_precio_2500.png", description: "Botella licor coco" },
{ id: 32, name: "Whisky Spirit 200 ml", category: "Bebidas", price: 320, image: "https://i.postimg.cc/4N8W6q1t/tea_precio_320.png", description: "Botella pequeña" },
{ id: 33, name: "Whisky Sir Albin 1L", category: "Bebidas", price: 1350, image: "https://i.postimg.cc/cLyrb4T0/whisky_1L_precio_1350.png", description: "Botella grande" },
{ id: 34, name: "Whisky Sir Albin 500ml", category: "Bebidas", price: 550, image: "https://i.postimg.cc/y84kbYnC/whisky_sir_albin_precio_550.png", description: "Botella mediana" },
{ id: 35, name: "Vino Pluvium", category: "Bebidas", price: 1200, image: "https://i.postimg.cc/XNLLWmmx/vino_pluvium_precio_1200.png", description: "Botella vino tinto" },
{ id: 36, name: "Baterías Triple A", category: "Electrónicos y accesorios", price: 300, image: "https://i.postimg.cc/DZ2vxZsT/Gemini_Generated_Image_824rio824rio824r.png", description: "Pack 4 unidades" },
{ id: 37, name: "Cerveza Cristal", category: "Bebidas", price: 300, image: "https://i.postimg.cc/d1JxDCW3/cervaza-cristal-1.jpg", description: "Lata 355ml" },
{ id: 38, name: "Cerveza Holland Import", category: "Bebidas", price: 230, image: "https://i.postimg.cc/nLn8gryr/cerveza-holland-(1).png", description: "Lata cerveza importada" },
{ id: 39, name: "Refresco Pepsi", category: "Bebidas", price: 260, image: "https://i.postimg.cc/ZY7psrx7/pepsi.webp", description: "Lata refresco" },
{ id: 40, name: "Jugo YES 1L", category: "Bebidas", price: 620, image: "https://i.postimg.cc/fy2cxdBH/jugo_j.png", description: "Tetrapack mango/manzana" },
{ id: 41, name: "Agua Embotellada", category: "Bebidas", price: 650, image: "https://i.postimg.cc/m2gVtL8J/agua.png", description: "Botella 1.5L" },
{ id: 42, name: "Frijoles Negros", category: "Alimentos y conservas", price: 820, image: "https://i.postimg.cc/wvkcjZNf/frijol_negro.png", description: "Paquete granos" },
{ id: 43, name: "Avena en Hojuelas", category: "Alimentos y conservas", price: 600, image: "https://i.postimg.cc/sDHmWkNL/avena.png", description: "Paquete avena integral" },
{ id: 44, name: "Espaguetis", category: "Pastas y fideos", price: 270, image: "https://via.placeholder.com/300x300/0d3b33/ffffff?text=Espaguetis", description: "Paquete pasta larga" },
{ id: 45, name: "Patatas Fritas 1kg", category: "Congelados", price: 1200, image: "https://i.postimg.cc/rs76dmR8/patatas_fritas.png", description: "Bolsa congelada" },
{ id: 46, name: "Nuggets de Pollo", category: "Congelados", price: 550, image: "https://i.postimg.cc/KYSnrxDm/nuggets_de_pollo.webp", description: "Paquete empanado" },
{ id: 47, name: "Atole Sobre", category: "Alimentos y conservas", price: 400, image: "https://i.postimg.cc/fTqCdGPh/atole.png", description: "Mezcla en polvo" },
{ id: 48, name: "Croquetas sabor Jamón", category: "Congelados", price: 450, image: "https://i.postimg.cc/br4XGJSy/cdroquetas_sabor_jamon.png", description: "Bolsa de croquetas" },
{ id: 49, name: "Detergente Tid", category: "Aseo del hogar", price: 630, image: "https://i.postimg.cc/3RhF7YkZ/detergente.png", description: "Bolsa detergente polvo" },
{ id: 50, name: "Aceite", category: "Alimentos y conservas", price: 990, image: "https://i.postimg.cc/hPZsmk5N/aceite.png", description: "Botella de aceite vegetal" },
{ id: 51, name: "Bocaditos de Pollo", category: "Congelados", price: 550, image: "https://i.postimg.cc/GpGxZHmd/bocadito_de_pollo.png", description: "Bocaditos crujientes" },
{ id: 52, name: "Jabón de Carbón", category: "Higiene personal", price: 200, image: "https://i.postimg.cc/Y9xfCZgB/jabon_carbon.png", description: "Jabón artesanal" },
{ id: 53, name: "Ketchup", category: "Salsas", price: 450, image: "https://i.postimg.cc/15XcyWzm/ketchup.png", description: "Salsa de tomate" },
{ id: 54, name: "Mostaza", category: "Salsas", price: 450, image: "https://i.postimg.cc/L6Wk5zqs/mostaza.png", description: "Salsa de mostaza" },
{ id: 55, name: "Cerveza Parranda", category: "Bebidas", price: 250, image: "https://i.postimg.cc/d31dt1w9/parranda.webp", description: "Cerveza clara" },
{ id: 56, name: "Lomo de Res", category: "Congelados", price: 800, image: "https://i.postimg.cc/nh7mLNbw/res.webp", description: "Corte de res fresco 250g" },
{ id: 57, name: "Vinagreta", category: "Salsas", price: 350, image: "https://i.postimg.cc/g0WZL4m5/vinagret.webp", description: "Salsa para ensaladas" }
];

let cart = [];
const categories = ["Todos", ...new Set(products.map(p => p.category))];

// ================= INICIALIZACIÓN =================
document.addEventListener('DOMContentLoaded', () => {
  renderCategories();
  renderProducts('Todos');
  updateCartCount();
  initChatbot();

  // Header scroll effect
  window.addEventListener('scroll', () => {
    const header = document.getElementById('header');
    if (header) {
      header.classList.toggle('scrolled', window.scrollY > 50);
    }
  });
});

// ================= RENDERIZADO =================
function renderCategories() {
  const container = document.getElementById('filterTags');
  if (!container) return;
  container.innerHTML = '';
  categories.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = `filter-tag ${cat === 'Todos' ? 'active' : ''}`;
    btn.textContent = cat;
    btn.onclick = () => {
      document.querySelectorAll('.filter-tag').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderProducts(cat);
    };
    container.appendChild(btn);
  });
}

function renderProducts(category) {
  const grid = document.getElementById('productGrid');
  if (!grid) return;
  grid.innerHTML = '';
  const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

  if (filtered.length === 0) {
    grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:var(--text-light);padding:2rem;">No hay productos en esta categoría.</p>';
    return;
  }

  filtered.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/300x300/0d3b33/ffffff?text=Producto'">
      <div class="product-info">
        <div class="product-category">${product.category}</div>
        <h3 class="product-name">${product.name}</h3>
        <div class="product-price">$${product.price}</div>
        <button class="btn-add" onclick="addToCart(${product.id})">Agregar al carrito</button>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ================= CARRITO =================
function addToCart(id) {
  const product = products.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) existing.quantity++;
  else cart.push({ ...product, quantity: 1 });
  updateCartCount();
  showNotification(`${product.name} agregado`);
}

function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  const el = document.getElementById('cartCount');
  if (el) el.textContent = count;
}

function toggleCart() {
  const modal = document.getElementById('cartModal');
  if (modal) {
    modal.classList.toggle('active');
    if (modal.classList.contains('active')) renderCartItems();
  }
}

function renderCartItems() {
  const container = document.getElementById('cartItems');
  const totalEl = document.getElementById('cartTotal');
  if (!container || !totalEl) return;
  container.innerHTML = '';
  let total = 0;

  if (cart.length === 0) {
    container.innerHTML = '<p style="text-align:center;color:var(--text-light);padding:3rem 1rem;">Tu carrito está vacío</p>';
    totalEl.textContent = '0';
    return;
  }

  cart.forEach(item => {
    total += item.price * item.quantity;
    const div = document.createElement('div');
    div.className = 'cart-item';
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" onerror="this.style.display='none'">
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">$${item.price}</div>
        <div class="cart-item-quantity">
          <button class="qty-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
          <span>${item.quantity}</span>
          <button class="qty-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
        </div>
      </div>
    `;
    container.appendChild(div);
  });
  totalEl.textContent = total.toLocaleString();
}

function updateQuantity(id, change) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity += change;
    if (item.quantity <= 0) cart = cart.filter(i => i.id !== id);
    renderCartItems();
    updateCartCount();
  }
}

function sendToWhatsApp() {
  if (cart.length === 0) return alert('El carrito está vacío');
  let msg = '¡Hola! Quiero hacer un pedido de *El Resolvito*:\n\n';
  let total = 0;
  cart.forEach(i => {
    const sub = i.price * i.quantity;
    msg += `• ${i.name} x${i.quantity} = $${sub}\n`;
    total += sub;
  });
  msg += `\n*Total: $${total}*\n\nMi dirección: _[Escribe tu dirección aquí]_`;
  window.open(`https://wa.me/5356382909?text=${encodeURIComponent(msg)}`, '_blank');
}

// ================= NOTIFICACIÓN =================
function showNotification(msg) {
  const n = document.createElement('div');
  n.style.cssText = 'position:fixed;bottom:20px;right:20px;background:var(--primary);color:white;padding:1rem 1.5rem;border-radius:0.75rem;box-shadow:var(--shadow-lg);z-index:3000;font-weight:500;animation:slideUp 0.3s ease;';
  n.textContent = msg;
  document.body.appendChild(n);
  setTimeout(() => { n.style.opacity = '0'; n.style.transition = 'opacity 0.3s'; setTimeout(() => n.remove(), 300); }, 2500);
}

// ================= CHATBOT + IA =================
function initChatbot() {
  // Inyecta el HTML del chat si no existe
  if (!document.getElementById('chatbot-widget')) {
    const chatHTML = `
      <div id="chatbot-widget">
        <button id="chat-toggle" aria-label="Abrir chat">💬</button>
        <div id="chat-window" class="hidden">
          <div id="chat-header"><span>🤖 Asistente El Resolvito</span><button id="chat-close">×</button></div>
          <div id="chat-messages"></div>
          <div id="chat-quick-actions">
            <button data-action="catálogo">📦 Catálogo</button>
            <button data-action="precios">💰 Precios</button>
            <button data-action="envío">🚚 Envío</button>
            <button data-action="whatsapp">📱 WhatsApp</button>
          </div>
          <div id="chat-input-area">
            <input type="text" id="chat-input" placeholder="Escribe tu consulta...">
            <button id="chat-send">➤</button>
          </div>
        </div>
      </div>`;
    document.body.insertAdjacentHTML('beforeend', chatHTML);
    loadChatStyles();
  }

  const toggle = document.getElementById('chat-toggle');
  const windowEl = document.getElementById('chat-window');
  const close = document.getElementById('chat-close');
  const input = document.getElementById('chat-input');
  const send = document.getElementById('chat-send');
  const actions = document.querySelectorAll('#chat-quick-actions button');
  const messages = document.getElementById('chat-messages');

  let isOpen = false;

  toggle.addEventListener('click', () => {
    isOpen = !isOpen;
    windowEl.classList.toggle('hidden', !isOpen);
    if (isOpen && messages.children.length === 0) {
      addBotMsg("¡Hola! 👋 Soy el asistente de El Resolvito. ¿Qué producto o servicio buscas hoy?");
    }
    if (isOpen) input.focus();
  });

  close.addEventListener('click', () => {
    isOpen = false;
    windowEl.classList.add('hidden');
  });

  const handleSend = () => {
    const text = input.value.trim();
    if (!text) return;
    processUserMessage(text);
    input.value = '';
  };

  send.addEventListener('click', handleSend);
  input.addEventListener('keypress', e => e.key === 'Enter' && handleSend());

  actions.forEach(btn => {
    btn.addEventListener('click', () => {
      input.value = btn.dataset.action;
      handleSend();
    });
  });
}

async function processUserMessage(text) {
  addUserMsg(text);
  showTyping();

  const query = text.toLowerCase().replace(/[?¿.!]/g, '').trim();

  // 1. Búsqueda local instantánea
  const matches = products.filter(p =>
    p.name.toLowerCase().includes(query) ||
    p.category.toLowerCase().includes(query) ||
    p.description.toLowerCase().includes(query)
  ).slice(0, 3);

  if (matches.length > 0) {
    removeTyping();
    addBotMsg(`Encontré ${matches.length} producto(s) para ti:`);
    matches.forEach(p => addProductCard(p));
    return;
  }

  // 2. Reglas rápidas (sin gastar tokens)
  const rules = {
    'precio|costo|cuanto': '💰 Los precios varían según el producto. Dime qué buscas y te lo busco al instante.',
    'envío|delivery|domicilio': '🚚 Enviamos en La Habana Vieja por $200. ¿Deseas armar tu pedido?',
    'horario|abierto|hora': '🕒 Atención de lunes a sábado de 8:00 AM a 8:00 PM.',
    'pago|efectivo|mlc|transferencia': '💳 Aceptamos efectivo (CUP), transferencia y MLC.',
    'whatsapp|contacto|pedir|orden': '📱 Haz tu pedido directo aquí: <a href="https://wa.me/5356382909" target="_blank" style="color:var(--secondary);font-weight:600;">Abrir WhatsApp</a>',
    'catalogo|productos|todo|mercado': '📦 Tenemos Alimentos, Snacks, Bebidas, Higiene y más. Usa los filtros de abajo o pregunta por categoría.',
    'mayor|volumen|negocio|revender': '📦 Para compras al por mayor, contáctanos por WhatsApp para precios especiales.'
  };

  for (const [keys, reply] of Object.entries(rules)) {
    if (keys.split('|').some(k => query.includes(k))) {
      removeTyping();
      addBotMsg(reply, true);
      return;
    }
  }

  // 3. IA OpenRouter (Free Tier)
  if (OPENROUTER_API_KEY.trim()) {
    try {
      const aiReply = await fetchAI(query);
      removeTyping();
      addBotMsg(aiReply);
    } catch (err) {
      removeTyping();
      console.warn("AI fallback:", err);
      addBotMsg("⚡ En este momento el asistente está en modo rápido. Para consultas específicas, escríbenos por WhatsApp.");
    }
  } else {
    removeTyping();
    addBotMsg("🤔 No encontré esa referencia. Puedes preguntar por precios, envíos, categorías o escribir 'WhatsApp' para atención directa.");
  }
}

async function fetchAI(query) {
  const systemPrompt = `Eres un vendedor amable y directo de "El Resolvito", una tienda en La Habana, Cuba. 
  Responde en máximo 2 frases. Si no sabes algo o te piden información no disponible, recomienda contactar por WhatsApp: https://wa.me/5356382909. 
  Usa tono cercano, profesional y en español.`;

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": window.location.href,
      "X-Title": "El Resolvito Chat"
    },
    body: JSON.stringify({
      model: "meta-llama/llama-3-8b-instruct:free",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: query }
      ],
      max_tokens: 120,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    if (response.status === 429) throw new Error("Rate limit exceeded");
    throw new Error(`API Error: ${response.status}`);
  }

  const data = await response.json();
  return data.choices?.[0]?.message?.content || "No pude generar una respuesta en este momento.";
}

function addUserMsg(text) {
  const div = document.createElement('div');
  div.className = 'chat-msg user';
  div.textContent = text;
  document.getElementById('chat-messages').appendChild(div);
  scrollChat();
}

function addBotMsg(text, isHTML = false) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot';
  if (isHTML) div.innerHTML = text;
  else div.textContent = text;
  document.getElementById('chat-messages').appendChild(div);
  scrollChat();
}

function addProductCard(p) {
  const div = document.createElement('div');
  div.className = 'chat-msg bot product-card';
  div.innerHTML = `
    <div class="product-preview" style="display:flex;align-items:center;gap:0.6rem;">
      <img src="${p.image}" style="width:40px;height:40px;object-fit:cover;border-radius:0.4rem;background:white;" onerror="this.src='https://via.placeholder.com/40?text=📦'">
      <div>
        <strong style="display:block;font-size:0.9rem;">${p.name}</strong>
        <span style="color:var(--secondary);font-weight:600;font-size:0.85rem;">$${p.price}</span>
      </div>
    </div>
    <button class="btn-add" style="margin-top:0.4rem;padding:0.4rem;font-size:0.85rem;" onclick="addToCart(${p.id}); document.getElementById('chat-window').classList.add('hidden');">Agregar</button>
  `;
  document.getElementById('chat-messages').appendChild(div);
  scrollChat();
}

function showTyping() {
  let t = document.getElementById('typing-ind');
  if (!t) {
    t = document.createElement('div');
    t.id = 'typing-ind';
    t.className = 'chat-msg bot';
    t.textContent = '⏳ Escribiendo...';
    document.getElementById('chat-messages').appendChild(t);
  }
}

function removeTyping() {
  const t = document.getElementById('typing-ind');
  if (t) t.remove();
}

function scrollChat() {
  const msgBox = document.getElementById('chat-messages');
  if (msgBox) msgBox.scrollTop = msgBox.scrollHeight;
}

function loadChatStyles() {
  if (document.getElementById('chatbot-css')) return;
  const style = document.createElement('style');
  style.id = 'chatbot-css';
  style.textContent = `
    #chatbot-widget{position:fixed;bottom:1.5rem;right:1.5rem;z-index:2500;font-family:inherit;}
    #chat-toggle{width:55px;height:55px;border-radius:50%;background:var(--primary);color:white;border:none;font-size:1.4rem;cursor:pointer;box-shadow:var(--shadow-lg);transition:transform 0.2s;}
    #chat-toggle:hover{transform:scale(1.05);}
    #chat-window{position:absolute;bottom:65px;right:0;width:340px;max-height:480px;background:var(--white);border-radius:1rem;box-shadow:var(--shadow-lg);display:flex;flex-direction:column;overflow:hidden;transition:all 0.3s ease;}
    #chat-window.hidden{opacity:0;transform:translateY(10px);pointer-events:none;}
    #chat-header{background:var(--primary);color:var(--white);padding:0.8rem 1rem;display:flex;justify-content:space-between;align-items:center;font-weight:600;}
    #chat-close{background:none;border:none;color:white;font-size:1.5rem;padding:0.2rem;}
    #chat-messages{flex:1;overflow-y:auto;padding:0.8rem;background:#f8fafc;display:flex;flex-direction:column;gap:0.6rem;}
    .chat-msg{max-width:85%;padding:0.6rem 0.9rem;border-radius:0.8rem;font-size:0.88rem;line-height:1.4;}
    .chat-msg.bot{background:var(--white);border:1px solid #e2e8f0;align-self:flex-start;border-bottom-left-radius:0.2rem;}
    .chat-msg.user{background:var(--primary);color:var(--white);align-self:flex-end;border-bottom-right-radius:0.2rem;}
    .chat-msg.product-card{background:#f0fdf4;border:1px solid #bbf7d0;cursor:pointer;}
    .chat-msg.product-card:hover{background:#dcfce7;}
    #chat-quick-actions{display:flex;gap:0.4rem;padding:0.5rem;background:var(--white);border-top:1px solid #e5e7eb;overflow-x:auto;}
    #chat-quick-actions button{flex-shrink:0;padding:0.3rem 0.7rem;border:1px solid #e5e7eb;background:var(--white);border-radius:999px;font-size:0.78rem;transition:all 0.2s;}
    #chat-quick-actions button:hover{background:var(--primary);color:var(--white);border-color:var(--primary);}
    #chat-input-area{display:flex;padding:0.6rem;background:var(--white);border-top:1px solid #e5e7eb;}
    #chat-input{flex:1;padding:0.6rem;border:1px solid #e5e7eb;border-radius:0.4rem;outline:none;font-size:0.85rem;}
    #chat-input:focus{border-color:var(--primary);}
    #chat-send{margin-left:0.4rem;padding:0.6rem;background:var(--primary);color:white;border:none;border-radius:0.4rem;}
    @keyframes slideUp{from{transform:translateY(10px);opacity:0}to{transform:translateY(0);opacity:1}}
    @media(max-width:480px){#chat-window{width:calc(100vw - 2rem);right:-0.5rem;}}
  `;
  document.head.appendChild(style);
}
