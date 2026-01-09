// Updated Product Data with Image URLs
const products = [
    {
        id: 1,
        name: "SkyMaster Pro X4",
        price: 899.99,
        rating: 4.5,
        description: "4K camera with 30-min flight time",
        category: "4K Drones",
        image: "https://images.unsplash.com/photo-1579829366248-204fe8413f31?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 2,
        name: "Raptor Racer Z1",
        price: 649.99,
        rating: 4.2,
        description: "High-speed racing drone",
        category: "Racing Drones",
        image: "https://images.unsplash.com/photo-1524143986875-3b098d78b363?w=400&h=300&fit=crop"
    },
    {
        id: 3,
        name: "NovaFly Beginner",
        price: 299.99,
        rating: 4.0,
        description: "Perfect for beginners",
        category: "Beginner Drones",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w-400&h=300&fit=crop"
    },
    {
        id: 4,
        name: "CinemaPro 8K",
        price: 2499.99,
        rating: 4.8,
        description: "Professional filmmaking drone",
        category: "Professional",
        image: "https://images.unsplash.com/photo-1506947411487-a56738267384?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 5,
        name: "Explorer Mini",
        price: 199.99,
        rating: 3.9,
        description: "Compact and portable",
        category: "Beginner Drones",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=300&fit=crop&auto=format"
    },
    {
        id: 6,
        name: "Storm Chaser Pro",
        price: 1299.99,
        rating: 4.6,
        description: "Weather-resistant professional drone",
        category: "Professional",
        image: "https://images.unsplash.com/photo-1508614589041-895b88991e3e?w=400&h=300&fit=crop&auto=format"
    }
];

// Alternative: If you want to use local images
const localProducts = [
    {
        id: 1,
        name: "SkyMaster Pro X4",
        price: 899.99,
        rating: 4.5,
        description: "4K camera with 30-min flight time",
        category: "4K Drones",
        image: "images/drone1.jpg"
    },
    {
        id: 2,
        name: "Raptor Racer Z1",
        price: 649.99,
        rating: 4.2,
        description: "High-speed racing drone",
        category: "Racing Drones",
        image: "images/drone2.jpg"
    },
    // ... continue for other products
];

// Cart Data
let cart = [];
let cartCount = 0;
let cartTotal = 0;

// DOM Elements
const productContainer = document.getElementById('productContainer');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartTotalElement = document.getElementById('cartTotal');
const cartCountElement = document.querySelector('.cart-count');
const cartBtn = document.querySelector('.cart-btn');
const closeCart = document.querySelector('.close-cart');
const contactForm = document.getElementById('contactForm');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Initialize the application
document.addEventListener('DOMContentLoaded', function () {
    renderProducts();
    setupEventListeners();
    updateCart();
});

function renderProducts() {
    productContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';

        // Generate star rating HTML
        let stars = '';
        for (let i = 1; i <= 5; i++) {
            if (i <= Math.floor(product.rating)) {
                stars += '<i class="fas fa-star"></i>';
            } else if (i === Math.ceil(product.rating) && !Number.isInteger(product.rating)) {
                stars += '<i class="fas fa-star-half-alt"></i>';
            } else {
                stars += '<i class="far fa-star"></i>';
            }
        }

        productCard.innerHTML = `
            <div class="product-img">
                <img src="${product.image}" 
                     alt="${product.name}" 
                     loading="lazy"
                     onerror="this.onerror=null; this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjFmMmY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIyMCIgZmlsbD0iIzM0OThkYiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkRyb25lIENhbWVyYTwvdGV4dD48L3N2Zz4='">
                <div class="icon-fallback">
                    <i class="fas fa-drone"></i>
                </div>
            </div>
            <div class="product-info">
                <h3>${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-rating">
                    ${stars} <span>${product.rating}</span>
                </div>
                <div class="product-price">$${product.price.toFixed(2)}</div>
                <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
            </div>
        `;

        productContainer.appendChild(productCard);
    });
}

// Setup Event Listeners
function setupEventListeners() {
    // Hamburger menu for mobile
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // Cart toggle
    cartBtn.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeCart.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    // Close cart when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    // Add to cart buttons (event delegation)
    productContainer.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const productId = parseInt(e.target.getAttribute('data-id'));
            addToCart(productId);
        }
    });

    // Contact form submission
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Cart Functions
function addToCart(productId) {
    const product = products.find(p => p.id === productId);

    if (!product) return;

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    updateCart();

    // Visual feedback
    const button = document.querySelector(`.add-to-cart[data-id="${productId}"]`);
    const originalText = button.textContent;
    button.textContent = 'Added!';
    button.style.background = '#2ecc71';

    setTimeout(() => {
        button.textContent = originalText;
        button.style.background = '';
    }, 1000);
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCart();
}

function updateCart() {
    // Update cart count
    cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    cartCountElement.textContent = cartCount;

    // Update cart total
    cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    cartTotalElement.textContent = cartTotal.toFixed(2);

    // Update cart items display
    renderCartItems();
}

function renderCartItems() {
    cartItems.innerHTML = '';

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        return;
    }

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';

        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} x ${item.quantity}</p>
            </div>
            <div>
                <span class="item-total">$${(item.price * item.quantity).toFixed(2)}</span>
                <button class="remove-item" data-id="${item.id}"><i class="fas fa-trash"></i></button>
            </div>
        `;

        cartItems.appendChild(cartItem);
    });

    // Add event listeners to remove buttons
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.closest('.remove-item').getAttribute('data-id'));
            removeFromCart(productId);
        });
    });
}

// Checkout functionality
document.querySelector('.checkout-btn')?.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }

    alert(`Order confirmed! Total: $${cartTotal.toFixed(2)}\nThank you for your purchase!`);
    cart = [];
    updateCart();
    cartModal.style.display = 'none';
});