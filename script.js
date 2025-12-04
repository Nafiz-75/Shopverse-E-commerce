document.addEventListener('DOMContentLoaded', () => {
    const productGrid = document.getElementById('product-grid');
    const mainTitle = document.getElementById('main-title'); // Get the main title element
    const categoryLinks = document.querySelectorAll('.category-link');
    const logoLink = document.getElementById('logo-link');

    const cartNotification = document.getElementById('cart-notification');
    const cartCountElement = document.getElementById('cart-count');
    let cartCount = 0;

    // Product Data (Bangladesh context)
    // NOTE: Added 'category' property to each product
    const products = [
        // Fashion
        { id: 1, name: 'Premium Jamdani Saree', price: 6500, rating: 4.8, category: 'Fashion', imageUrl: 'https://placehold.co/400x500/EF4444/ffffff?text=Jamdani+Saree' },
        { id: 2, name: 'Men\'s Designer Panjabi', price: 1850, rating: 4.5, category: 'Fashion', imageUrl: 'https://placehold.co/400x500/F97316/ffffff?text=Mens+Panjabi' },
        { id: 6, name: 'Women\'s Cotton Kurti', price: 980, rating: 4.4, category: 'Fashion', imageUrl: 'https://placehold.co/400x500/EC4899/ffffff?text=Womens+Kurti' },
        
        // Groceries
        { id: 3, name: 'Organic Masoor Dal (1kg)', price: 130, rating: 4.9, category: 'Groceries', imageUrl: 'https://placehold.co/400x500/10B981/ffffff?text=Masoor+Dal' },
        { id: 5, name: 'Basmati Rice (5kg)', price: 550, rating: 4.7, category: 'Groceries', imageUrl: 'https://placehold.co/400x500/059669/ffffff?text=Basmati+Rice' },
        { id: 8, name: 'Salty Biscuits (Family Pack)', price: 85, rating: 4.0, category: 'Groceries', imageUrl: 'https://placehold.co/400x500/9CA3AF/ffffff?text=Biscuits' },

        // Electronics
        { id: 4, name: 'Smartwatch Series 9 (Local)', price: 2999, rating: 4.2, category: 'Electronics', imageUrl: 'https://placehold.co/400x500/3B82F6/ffffff?text=Smartwatch' },
        { id: 7, name: 'Noise Cancelling Headphone', price: 4200, rating: 4.6, category: 'Electronics', imageUrl: 'https://placehold.co/400x500/6366F1/ffffff?text=Headphone' },
        
        // Home
        { id: 9, name: 'Stainless Steel Water Bottle', price: 620, rating: 4.3, category: 'Home', imageUrl: 'https://placehold.co/400x500/06B6D4/ffffff?text=Water+Bottle' },
        { id: 10, name: 'Digital Weighing Scale', price: 1190, rating: 4.1, category: 'Home', imageUrl: 'https://placehold.co/400x500/7C3AED/ffffff?text=Digital+Scale' },
    ];

    // Function to generate the HTML for a single product card
    const createProductCard = (product) => {
        const imageUrl = product.imageUrl;
        // Corrected price formatting for Bangladeshi Taka (৳)
        const formattedPrice = product.price.toLocaleString('bn-BD'); 

        return `
            <div class="product-card rounded-xl overflow-hidden shadow-md hover:shadow-lg flex flex-col">
                <div class="aspect-h-1 aspect-w-1 w-full overflow-hidden">
                    <img src="${imageUrl}" alt="${product.name}" 
                         onerror="this.onerror=null; this.src='https://placehold.co/400x500/A0AEC0/ffffff?text=Image+Unavailable'"
                         class="h-full w-full object-cover object-center group-hover:opacity-75">
                </div>
                <div class="p-4 flex flex-col flex-grow">
                    <h3 class="text-sm font-medium text-gray-700 truncate mb-1">
                        <a href="#">${product.name}</a>
                    </h3>
                    <div class="flex items-center mb-2">
                        <span class="text-yellow-500 text-sm">★ ${product.rating}</span>
                        <span class="ml-2 text-xs text-gray-500">(${Math.floor(Math.random() * 500) + 50} Sold)</span>
                    </div>
                    <p class="text-xl font-bold text-gray-900 flex-grow">৳ ${formattedPrice}</p>
                    <button data-product-id="${product.id}"
                        class="mt-3 w-full py-2 px-4 rounded-lg text-white font-semibold btn-primary hover:scale-[1.02] transition duration-200"
                        onclick="addToCart(event)">
                        Add to Cart
                    </button>
                </div>
            </div>
        `;
    };

    /**
     * Filters and renders products based on the selected category.
     * @param {string} category - The category to filter by ('Fashion', 'Electronics', 'All', etc.)
     */
    const filterProducts = (category) => {
        let filteredProducts = [];
        let titleText = '';

        // Determine which products to show
        if (category === 'All' || category === 'Latest') {
            filteredProducts = products;
            titleText = 'Latest Products in Dhaka';
        } else if (category === 'Best Sellers') {
            // Logic for Best Sellers (e.g., sort by rating and take the top 5)
            filteredProducts = products
                .sort((a, b) => b.rating - a.rating)
                .slice(0, 5);
            titleText = 'Top 5 Best Sellers';
        } else {
            // Filter by selected category
            filteredProducts = products.filter(p => p.category === category);
            titleText = `${category} Products`;
        }
        
        // Update the main title
        mainTitle.textContent = titleText;

        // Render the filtered products
        productGrid.innerHTML = filteredProducts.map(createProductCard).join('');
        
        // Update active state on navigation links (visual feedback)
        categoryLinks.forEach(link => {
            // Reset link classes
            link.classList.remove('bg-red-600', 'text-white', 'font-bold', 'px-2', 'py-1', 'rounded', 'bg-primary');
            link.classList.add('text-gray-600', 'hover:text-red-600');
            
            // Apply active state
            if (link.dataset.category === category) {
                 link.classList.remove('text-gray-600', 'hover:text-red-600');
                 link.classList.add('bg-red-600', 'text-white', 'font-bold', 'px-2', 'py-1', 'rounded');
            }
            
            // Re-apply special style for the "Best Sellers" link if it's not the active one
            if (link.dataset.category === 'Best Sellers' && link.dataset.category !== category) {
                 link.classList.remove('text-gray-600', 'hover:text-red-600');
                 link.classList.add('bg-primary', 'text-white', 'font-bold', 'px-2', 'py-1', 'rounded');
            }
        });
    };
    
    // 1. Initial Load: Show all products
    filterProducts('Latest');

    // 2. Add Event Listeners to Category Links
    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.currentTarget.getAttribute('data-category');
            filterProducts(category);
        });
    });

    // 3. Add Event Listener to Logo (to reset filter to 'All' or 'Latest')
    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        filterProducts('Latest');
    });


    // Global function to handle "Add to Cart"
    window.addToCart = (event) => {
        const productId = event.currentTarget.getAttribute('data-product-id');
        const product = products.find(p => p.id === parseInt(productId));
        const productName = product?.name || 'Item';
        
        // 1. Update Cart Count
        cartCount++;
        cartCountElement.textContent = cartCount;

        // 2. Show Notification
        const notificationSpan = cartNotification.querySelector('span');
        notificationSpan.textContent = `${productName} added to cart!`;
        
        cartNotification.classList.add('show-notification');

        // 3. Hide Notification after 3 seconds
        setTimeout(() => {
            cartNotification.classList.remove('show-notification');
        }, 3000);

        console.log(`Product ID ${productId} added to cart. New count: ${cartCount}`);
    };
});
