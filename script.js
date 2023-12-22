let mensBtn = document.querySelector("#mens-btn");
let womensBtn = document.querySelector("#womens-btn");
let kidsBtn = document.querySelector("#kids-btn");
let productContainer = document.querySelector("#product-container");

let fetchedData = null; 

function fetchData() {
    const jsonUrl = 'https://cdn.shopify.com/s/files/1/0564/3685/0790/files/multiProduct.json';

    return fetch(jsonUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Network response was not ok, status code: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            fetchedData = data.categories;
            return data.categories; 
        })
        .catch(error => {
            console.error('Error fetching data:', error.message);
            throw error; 
        });
}

function createProductCard(product) {
  const percentOff = Math.round(((product.compare_at_price - product.price) / product.compare_at_price) * 100);

  return `
      <div class="product-card">
          <img class = "dispaly-img" src="${product.image}" alt="Product Image">
          <div  class = "inline2">
            <h2 class="product-title">${product.title}</h2>
            <p class="vendor">• ${product.vendor}</p>
          <div/>
          <div class = "inline2">
            <p class="price">Rs. ${product.price}</p>
            <p class="compare-at-price">Rs. ${product.compare_at_price}</p>
            <p class="percent-off">${percentOff}% Off</p>
          <div/>
          <button class="selected-button">Add to Cart</button>
      </div>
  `;
}



function displayProducts(categoryData) {
    productContainer.innerHTML = '';

    categoryData.forEach(product => {
        const productCardHTML = createProductCard(product);
        productContainer.innerHTML += productCardHTML;
    });
}


mensBtn.addEventListener("click", function() {
    fetchData()
        .then(mensData => {
            mensBtn.classList.add("selected-button");
            womensBtn.classList.remove("selected-button");
            kidsBtn.classList.remove("selected-button");
            console.log(mensData[0].category_products)
            displayProducts(mensData[0].category_products);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});

womensBtn.addEventListener("click", function() {
    fetchData()
        .then(womensData => {
            womensBtn.classList.add("selected-button");
            mensBtn.classList.remove("selected-button");
            kidsBtn.classList.remove("selected-button");
            displayProducts(womensData[1].category_products);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});

kidsBtn.addEventListener("click", function() {
    fetchData()
        .then(kidsData => {
            kidsBtn.classList.add("selected-button");
            womensBtn.classList.remove("selected-button");
            mensBtn.classList.remove("selected-button");
            displayProducts(kidsData[2].category_products);
        })
        .catch(error => {
            console.error('Error:', error.message);
        });
});
