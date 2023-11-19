// Function to create a product card element
function createProductCard(product) {
    const card = document.createElement("div");
    card.classList.add("w-full", "lg:w-1/3", "px-4", "mb-4");

    const cardContent = `
        <div class="bg-white p-4 border rounded-lg shadow-md">
            <img src="${product.picture}" alt="${product.name}" class="mb-2 object-cover h-80 w-80">
            <h2 class="text-lg font-semibold">${product.name}</h2>
            <p class="text-gray-600">$${product.price}</p>
        </div>
    `;

    card.innerHTML = cardContent;
    return card;
}

// Function to filter and render products based on search query and category
function filterAndRenderProducts(searchQuery, selectedCategory) {
    // Clear existing product cards
    productCardsContainer.innerHTML = "";

    // Fetch product data from data.json
    fetch("data.json")
        .then(response => response.json())
        .then(data => {
            const products = data.products;

            // Filter products based on the selected category
            if (selectedCategory === "all") {
                // Render all products
                products.forEach(product => {
                    if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        const productCard = createProductCard(product);
                        productCardsContainer.appendChild(productCard);
                    }
                });
            } else {
                const filteredProducts = products.filter(product => product.category === selectedCategory);

                // Loop through the filtered products data and create product cards
                filteredProducts.forEach(product => {
                    if (product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
                        const productCard = createProductCard(product);
                        productCardsContainer.appendChild(productCard);
                    }
                });
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

// Function to display search recommendations
function displayRecommendations(recommendations) {
    const recommendationList = document.getElementById("recommendation-list");
    recommendationList.innerHTML = ""; // Clear previous recommendations

    if (recommendations.length > 0) {
        recommendations.forEach(recommendation => {
            const recommendationItem = document.createElement("div");
            recommendationItem.textContent = recommendation;
            recommendationList.appendChild(recommendationItem);
        });
        recommendationList.style.display = "block";
    } else {
        recommendationList.style.display = "none";
    }
}

// Get the product cards container
const productCardsContainer = document.getElementById("product-cards");

// Get the search bar and add an event listener for input changes
const searchInput = document.getElementById("search-bar");
searchInput.addEventListener("input", function () {
    const searchQuery = searchInput.value;
    const selectedCategory = categoryDropdown.value;
    filterAndRenderProducts(searchQuery, selectedCategory);
});

// Get the category dropdown
const categoryDropdown = document.getElementById("category-dropdown");

// Add an event listener to the category dropdown
categoryDropdown.addEventListener("change", function () {
    const selectedCategory = categoryDropdown.value;
    const searchQuery = searchInput.value;
    filterAndRenderProducts(searchQuery, selectedCategory);
});

// Initially, render all products
filterAndRenderProducts("", "all");