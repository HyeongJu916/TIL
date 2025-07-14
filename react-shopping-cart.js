const { useState, useEffect } = React;

// Initial products data
const initialProducts = [
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

// Format price to Korean won
const formatPrice = (price) => {
    return price.toLocaleString('ko-KR') + '원';
};

// ProductCard Component
const ProductCard = ({ product, onToggleFavorite, onAddToCart }) => {
    return (
        <div className="product-card">
            <button 
                className={`favorite-btn ${product.isFavorite ? 'active' : ''}`}
                onClick={() => onToggleFavorite(product.id)}
            >
                ⭐
            </button>
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-name">{product.name}</div>
            <div className="product-price">{formatPrice(product.price)}</div>
            <button 
                className="add-to-cart-btn" 
                onClick={() => onAddToCart(product.id)}
            >
                담기
            </button>
        </div>
    );
};

// CartItem Component
const CartItem = ({ item, onUpdateQuantity, onRemoveFromCart }) => {
    return (
        <div className="cart-item">
            <div className="cart-item-info">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-price">{formatPrice(item.price)}</div>
            </div>
            <div className="cart-item-controls">
                <button 
                    className="quantity-btn" 
                    onClick={() => onUpdateQuantity(item.id, -1)}
                >
                    -
                </button>
                <span className="quantity-display">{item.quantity}</span>
                <button 
                    className="quantity-btn" 
                    onClick={() => onUpdateQuantity(item.id, 1)}
                >
                    +
                </button>
                <button 
                    className="quantity-btn" 
                    onClick={() => onRemoveFromCart(item.id)}
                    style={{ marginLeft: '5px', color: '#ff4444' }}
                >
                    🗑
                </button>
            </div>
        </div>
    );
};

// Header Component
const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                <button className="close-btn">✕</button>
                <h1>상품 목록</h1>
                <div className="header-icons">
                    <button className="time-btn">🕐</button>
                    <button className="share-btn">↗</button>
                </div>
            </div>
        </header>
    );
};

// Main App Component
const App = () => {
    const [products, setProducts] = useState(initialProducts);
    const [cart, setCart] = useState([]);
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

    // Initialize cart with some items (as shown in the screenshot)
    useEffect(() => {
        setCart([
            { id: 2, name: '청바지', price: 42000, quantity: 4 },
            { id: 5, name: '후드', price: 53000, quantity: 1 }
        ]);
    }, []);

    // Toggle favorite status
    const toggleFavorite = (productId) => {
        setProducts(prevProducts =>
            prevProducts.map(product =>
                product.id === productId
                    ? { ...product, isFavorite: !product.isFavorite }
                    : product
            )
        );
    };

    // Add item to cart
    const addToCart = (productId) => {
        const product = products.find(p => p.id === productId);
        if (!product) return;

        setCart(prevCart => {
            const existingItem = prevCart.find(item => item.id === productId);
            if (existingItem) {
                return prevCart.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevCart, {
                    id: productId,
                    name: product.name,
                    price: product.price,
                    quantity: 1
                }];
            }
        });
    };

    // Update cart item quantity
    const updateQuantity = (productId, change) => {
        setCart(prevCart => {
            return prevCart.map(item => {
                if (item.id === productId) {
                    const newQuantity = item.quantity + change;
                    return newQuantity > 0 ? { ...item, quantity: newQuantity } : null;
                }
                return item;
            }).filter(Boolean);
        });
    };

    // Remove item from cart
    const removeFromCart = (productId) => {
        setCart(prevCart => prevCart.filter(item => item.id !== productId));
    };

    // Clear entire cart
    const clearCart = () => {
        setCart([]);
    };

    // Calculate total price
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    };

    // Filter products based on favorites toggle
    const filteredProducts = showFavoritesOnly 
        ? products.filter(product => product.isFavorite)
        : products;

    return (
        <div>
            <Header />
            <main className="main-content">
                <div className="content-wrapper">
                    <div className="products-section">
                        <div className="products-header">
                            <h2>상품 목록</h2>
                            <label className="favorites-toggle">
                                <input 
                                    type="checkbox" 
                                    checked={showFavoritesOnly}
                                    onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                                />
                                즐겨찾기만 보기
                            </label>
                        </div>
                        
                        <div className="products-grid">
                            {filteredProducts.map(product => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onToggleFavorite={toggleFavorite}
                                    onAddToCart={addToCart}
                                />
                            ))}
                        </div>
                    </div>

                    <div className="cart-sidebar">
                        <div className="cart-header">
                            <h3>장바구니</h3>
                        </div>
                        <div className="cart-items">
                            {cart.length === 0 ? (
                                <div className="empty-cart">장바구니가 비어있습니다</div>
                            ) : (
                                cart.map(item => (
                                    <CartItem
                                        key={item.id}
                                        item={item}
                                        onUpdateQuantity={updateQuantity}
                                        onRemoveFromCart={removeFromCart}
                                    />
                                ))
                            )}
                        </div>
                        <div className="cart-total">
                            <div className="total-price">
                                합계: {formatPrice(calculateTotal())}
                            </div>
                            <button className="clear-cart-btn" onClick={clearCart}>
                                모두 비우기
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

// Render the App
ReactDOM.render(<App />, document.getElementById('root'));