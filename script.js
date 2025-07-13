// Product data
const products = [
    {
        id: 1,
        name: '티셔츠',
        price: 19000,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop',
        isFavorite: true
    },
    {
        id: 2,
        name: '청바지',
        price: 42000,
        image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=200&h=200&fit=crop',
        isFavorite: false
    },
    {
        id: 3,
        name: '모자',
        price: 14000,
        image: 'https://images.unsplash.com/photo-1521369909029-2afed882baee?w=200&h=200&fit=crop',
        isFavorite: false
    },
    {
        id: 4,
        name: '운동화',
        price: 68000,
        image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=200&h=200&fit=crop',
        isFavorite: false
    },
    {
        id: 5,
        name: '후드',
        price: 53000,
        image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=200&h=200&fit=crop',
        isFavorite: false
    },
    {
        id: 6,
        name: '가방',
        price: 48000,
        image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=200&h=200&fit=crop',
        isFavorite: true
    }
];

// Cart data
let cart = [];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const cartItems = document.getElementById('cartItems');
const totalPrice = document.getElementById('totalPrice');
const clearCartBtn = document.getElementById('clearCartBtn');
const favoritesOnly = document.getElementById('favoritesOnly');

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderProducts();
    renderCart();
    
    // Event listeners
    clearCartBtn.addEventListener('click', clearCart);
    favoritesOnly.addEventListener('change', renderProducts);
});

// Format price to Korean won
function formatPrice(price) {
    return price.toLocaleString('ko-KR') + '원';
}

// Render products
function renderProducts() {
    const showFavoritesOnly = favoritesOnly.checked;
    const filteredProducts = showFavoritesOnly ? products.filter(p => p.isFavorite) : products;
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card">
            <button class="favorite-btn ${product.isFavorite ? 'active' : ''}" 
                    onclick="toggleFavorite(${product.id})">
                ⭐
            </button>
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-name">${product.name}</div>
            <div class="product-price">${formatPrice(product.price)}</div>
            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">담기</button>
        </div>
    `).join('');
}

// Toggle favorite
function toggleFavorite(productId) {
    const product = products.find(p => p.id === productId);
    if (product) {
        product.isFavorite = !product.isFavorite;
        renderProducts();
    }
}

// Add to cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }
    
    renderCart();
}

// Update cart item quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (!item) return;
    
    item.quantity += change;
    
    if (item.quantity <= 0) {
        cart = cart.filter(item => item.id !== productId);
    }
    
    renderCart();
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Clear cart
function clearCart() {
    cart = [];
    renderCart();
}

// Calculate total
function calculateTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Render cart
function renderCart() {
    if (cart.length === 0) {
        cartItems.innerHTML = '<div class="empty-cart">장바구니가 비어있습니다</div>';
        totalPrice.textContent = '0원';
        return;
    }
    
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <div class="cart-item-info">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">${formatPrice(item.price)}</div>
            </div>
            <div class="cart-item-controls">
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                <span class="quantity-display">${item.quantity}</span>
                <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 5px; color: #ff4444;">🗑</button>
            </div>
        </div>
    `).join('');
    
    totalPrice.textContent = formatPrice(calculateTotal());
}

// Initialize cart with some items (as shown in the screenshot)
function initializeCart() {
    cart = [
        { id: 1, name: '청바지', price: 42000, quantity: 4 },
        { id: 5, name: '후드', price: 53000, quantity: 1 }
    ];
    renderCart();
}

// Call initialize cart to match the screenshot
initializeCart();