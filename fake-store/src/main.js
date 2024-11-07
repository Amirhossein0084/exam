// DOM NODES   const cart = [];
const mobileMenu = document.getElementById("mobile-menu");
let productsRoot;
const root = document.getElementById("root");
const cart = [];
async function renderMenuCategories() {
  const cats = await fetch("https://fakestoreapi.com/products/categories")
    .then((res) => res.json())
    .then((json) => json);

  const temp = cats
    .map((item) => {
      return `
    <li>
    <a href="/categories/${item}" onclick="handleAClick(event)">
    ${item}
    </a>
    </li>
    `;
    })
    .join("");

  const catsMenu = document.getElementById("cats-menu");

  catsMenu.innerHTML = temp;
}

renderMenuCategories();



async function getAllProductsByFilter(limit = "") {
  const result = await fetch(
    `https://fakestoreapi.com/products${limit ? `?limit=${limit}` : ""}`
  )
    .then((res) => res.json())
    .then((json) => {
      return json;
    });

  return result;
}

function renderProducts(list) {
  const template = list
    .map((product) => {
      return `
        <div
          onclick="handleProductClick(${product.id})"
          class="shadow-[0px_4px_10px_4px_#00000024] w-full rounded-md overflow-hidden"
        >
          <img
            src="${product.image}"
            class="w-full aspect-square object-cover"
            alt=""
          />
          <!-- description -->
          <div class="flex flex-col items-center gap-4 py-4">
            <h4>${product.title}</h4>
            <div>
              <span>${product.price}</span>
              <span>تومان</span>
            </div>
          </div>
        </div>
      </div>
        `;
    })
    .join("");

  productsRoot.innerHTML = template;
}

function handleProductClick(productId) {
  history.pushState({}, "", `/products/${productId}`);
  checkState();
}

async function renderAllProducts() {
  const data = await getAllProductsByFilter();

  renderProducts(data);
}

async function renderMainPage() {
  const mainTemplate = `




 <div class="mtop">
<!-- Slideshow container -->
<div class="slideshow-container">

  <!-- Full-width images with number and caption text -->
  <div class="mySlides fade">
    <img src="./images/images2.jpg" style="width:100%">
    
  </div>

  <div class="mySlides fade">
    <img src="./images/images3.jpg" style="width:100%">
    
  </div>

  <div class="mySlides fade">
    <img src="./images/medium.jpg" style="width:100%">
    
  </div>

  <!-- Next and previous buttons -->
  <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
  <a class="next" onclick="plusSlides(1)">&#10095;</a>
</div>
<br>

<!-- The dots/circles -->
<div style="text-align:center">
  <span class="dot" onclick="currentSlide(1)"></span>
  <span class="dot" onclick="currentSlide(2)"></span>
  <span class="dot" onclick="currentSlide(3)"></span>
</div>
</div>




      <section class="my-8 md:mt-12">
        <h2 class="text-center text-2xl">محصولات</h2>

        <div
          class="my-12 md:my-16 w-11/12 md:w-full md:max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
          id="products-root"
        ></div>

        <a
          href="/products"
          onclick="handleAClick(event)"
          class="w-max px-8 py-2 rounded-md !block mx-auto bg-mft-500 text-white"
        >
          مشاهده بیشتر
        </a>
      </section>
    `;

  root.innerHTML = mainTemplate;
  productsRoot = document.getElementById("products-root");

  const limitedProducts = await getAllProductsByFilter("4");

  renderProducts(limitedProducts);
}

renderMainPage();

function handleAClick(event) {
  event.preventDefault();
  const href = event.target.getAttribute("href");
  history.pushState({}, "", href);
  checkState();
}

function toggleMobileMenu(action) {
  if (action === "open") {
    mobileMenu.classList.remove("scale-x-0");
  } else if (action === "close") {
    mobileMenu.classList.add("scale-x-0");
  }
}

async function getSingleProduct(productId) {
  const result = await fetch(`https://fakestoreapi.com/products/${productId}`)
    .then((res) => res.json())
    .then((json) => json);

  return result;
}

function renderSingleProduct({
  category: cat,
  description: desc,
  image,
  price,
  title,
}) {
  

  const template = `
  <div
  class="w-11/12 mx-auto pt-16 flex flex-col gap-2 md:gap-4 md:max-w-[1280px] md:flex-row md:items-start"
>
  <img
    src="${image}"
    class="rounded-md w-1/2 max-w-md hidden md:block"
    alt=""
  />
  <div class="order-1 w-full">
    <span class="text-white bg-black rounded-full px-4 py-1"
      >${cat}</span
    >
    <div class="mt-4">
      <a href="/src/index.html">صفحه اصلی</a>
      /
      <a onclick="handleAClick(event)" href="/products">همه محصولات</a>
    </div>
    <h1 class="text-slate-700 mt-4 text-2xl font-bold">
      ${title}
    </h1>

    <img
      src="${image}"
      class="rounded-md w-full md:hidden block my-4"
      alt=""
    />

    <div class="block text-center md:mt-4 md:text-start font-extrabold">
      <span>${price}</span>
      تومان
    </div>

    <button
      class="w-full md:w-auto px-4 py-2 my-5 bg-green-400 text-white rounded-md text-center"
    >
      اضافه به سبد خرید
    </button>

    <p>
      ${desc}
    </p>
  </div>
</div>
  `;

  root.innerHTML = template;
}


async function getSingleCategory(cat) {
  const result = await fetch(
    `https://fakestoreapi.com/products/category/${cat}`
  )
    .then((res) => res.json())
    .then((json) => json);

  return result;
}

function renderSingleProduct(productData) {
    const { id, category: cat, description: desc, image, price, title } = productData;

    const template = `
        <div class="w-11/12 mx-auto pt-16 flex flex-col gap-2 md:gap-4 md:max-w-[1280px] md:flex-row md:items-start">
            <img src="${image}" class="rounded-md w-1/2 max-w-md hidden md:block" alt="${title}" />
            <div class="order-1 w-full">
                <span class="text-white bg-black rounded-full px-4 py-1">${cat}</span>
                <div class="mt-4">
                    <a href="/src/index.html">صفحه اصلی</a> / <a onclick="handleAClick(event)" href="/products">همه محصولات</a>
                </div>
                <h1 class="text-slate-700 mt-4 text-2xl font-bold">${title}</h1>
                <img src="${image}" class="rounded-md w-full md:hidden" alt="${title}" />
                <h2 class="mt-4 text-lg text-gray-800">قیمت: ${price} تومان</h2>
                <p class="mt-2">${desc}</p>
                <button class="w-full md:w-auto px-4 py-2 my-5 bg-green-400 text-white rounded-md text-center add-to-cart-btn" data-product-id="${id}">اضافه به سبد خرید</button>
            </div>
        </div>
    `;

    root.innerHTML = template;
}

function renderSingleCategory(list) {
  const template = list
    .map((product) => {
      return `
        <div
          onclick="handleProductClick(${product.id})"
          class="shadow-[0px_4px_10px_4px_#00000024] w-full rounded-md overflow-hidden"
        >
          <img
            src="${product.image}"
            class="w-full aspect-square object-cover"
            alt=""
          />
          <!-- description -->
          <div class="flex flex-col items-center gap-4 py-4">
            <h4>${product.title}</h4>
            <div>
              <span>${product.price}</span>
              <span>تومان</span>
            </div>
          </div>
        </div>
   
        `;
    })
    .join("");

  const result = `
      <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mt-12">
        ${template}
      </div>
    `;

  root.innerHTML = result;
}


async function checkState() {
  const pathName = location.pathname;
  

  switch (true) {
    case pathName === "/products":
      renderAllProducts();
      break;
    case pathName === "/src/index.html":
      renderMainPage();
      break;
    case pathName.includes("/categories/"):
      let cat = pathName.split("/");
      cat = cat[cat.length - 1];
      const catProducts = await getSingleCategory(cat);
      renderSingleCategory(catProducts);
      break;
    case pathName.includes("/products/"):
      let pId = pathName.split("/");
      pId = pId[pId.length - 1];
      const singlePData = await getSingleProduct(pId);
      renderSingleProduct(singlePData);
      break;
    default:
      renderMainPage();
      break;
  }
}

window.addEventListener("popstate", checkState);



document.addEventListener("click", async event => {
    if (event.target.classList.contains("add-to-cart-btn")) {
        const productId = event.target.dataset.productId;
        const productData = await getSingleProduct(productId);
        addToCart(productData);
    }
});


function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartIcon();
    renderCart();
}


function updateCartIcon() {
    const cartCount = document.getElementById('cart-item-count');
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = totalItems ? totalItems : '';
}

function renderCart() {
  const cartContainer = document.getElementById("cart-contents");
  const totalContainer = document.getElementById("cart-total");

  cartContainer.innerHTML = cart.map(item => `
      <div class="cart-item flex gap-4 items-center">
          <img src="${item.image}" class="w-12 h-12 rounded" alt="${item.title}" />
          <div class="inbox">
              <span>${item.title}</span>
              <div class="flex items-center">
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                  <span>Quantity: ${item.quantity}</span>
                  <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
              </div>
              <p>Price: ${(item.price * item.quantity).toFixed(2)} تومان</p>
              <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
          </div>
      </div>
  `).join("");

  const totalAmount = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  totalContainer.textContent = `جمع کل: ${totalAmount.toFixed(2)} تومان`;
}

function updateQuantity(productId, change) {
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
      existingProduct.quantity += change;

      
      if (existingProduct.quantity <= 0) {
          removeFromCart(productId);
      } else {
          renderCart(); 
      }
  }
}


function removeFromCart(productId) {
  const index = cart.findIndex(item => item.id === productId);
  if (index !== -1) {
      cart.splice(index, 1); 
      renderCart(); 
      updateCartIcon(); 
  }
}


function toggleCart() {
    const cartContainer = document.getElementById("cart-items");
    cartContainer.classList.toggle("hidden");
}

function toggleSearch() {
  const searchInput = document.getElementById("search-input");
  searchInput.classList.toggle("hidden");
  searchInput.focus();
}
async function handleSearch(event) {
  const query = event.target.value.trim().toLowerCase();
  const suggestionsBox = document.getElementById("suggestions");

  if (query.length < 2) {
      suggestionsBox.classList.add("hidden"); 
      renderAllProducts();
      return;
  }

  const allProducts = await getAllProductsByFilter(); 

 
  const filteredProducts = allProducts.filter(product => {
      const titleMatch = product.title.toLowerCase().includes(query);
      const categoryMatch = product.category.toLowerCase().includes(query);

      return titleMatch || categoryMatch;
  });

  renderProducts(filteredProducts); 

 
  showSuggestions(filteredProducts, query);
}


function showSuggestions(products, query) {
  const suggestionsBox = document.getElementById("suggestions");
  suggestionsBox.innerHTML = ""; 

  if (products.length === 0) {
      suggestionsBox.classList.add("hidden");
      return;
  }

  products.slice(0, 5).forEach(product => {
      const suggestionItem = document.createElement("div");
      suggestionItem.classList.add("suggestion-item");
      suggestionItem.textContent = product.title;
      
     
      suggestionItem.onclick = () => {
          document.getElementById("searchInput").value = product.title; 
          handleSearch({ target: { value: product.title } });
          suggestionsBox.classList.add("hidden"); 
      };

      suggestionsBox.appendChild(suggestionItem);
  });

  suggestionsBox.classList.remove("hidden"); 
}

document.getElementById("searchInput").addEventListener("blur", () => {
  setTimeout(() => document.getElementById("suggestions").classList.add("hidden"), 200);
});
let suggestionClicked = false; 

function showSuggestions(products, query) {
    const suggestionsBox = document.getElementById("suggestions");
    suggestionsBox.innerHTML = ""; 

   
    if (suggestionClicked || products.length === 0) {
        suggestionsBox.classList.add("hidden");
        return;
    }

    products.slice(0, 5).forEach(product => {
        const suggestionItem = document.createElement("div");
        suggestionItem.classList.add("suggestion-item");
        suggestionItem.textContent = product.title;
        
       
        suggestionItem.onclick = () => {
            document.getElementById("searchInput").value = product.title; 
            handleSearch({ target: { value: product.title } });
            suggestionClicked = true; 
            suggestionsBox.classList.add("hidden"); 
        };

        suggestionsBox.appendChild(suggestionItem);
    });

    suggestionsBox.classList.remove("hidden"); 
}


document.getElementById("searchInput").addEventListener("input", () => {
    suggestionClicked = false; 
});




document.getElementById("searchInput").addEventListener("blur", () => {
    setTimeout(() => document.getElementById("suggestions").classList.add("hidden"), 200);
});



let slideIndex = 1;
let slideTimer;


showSlides(slideIndex);
startSlideTimer();


function showSlides(n) {
    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    
    if (n > slides.length) { slideIndex = 1; }
    if (n < 1) { slideIndex = slides.length; }

   
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

   
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}


function plusSlides(n) {
    stopSlideTimer(); 
    showSlides(slideIndex += n);
    startSlideTimer(); 
}


function currentSlide(n) {
    stopSlideTimer();  
    showSlides(slideIndex = n);
    startSlideTimer(); 
}


function startSlideTimer() {
    slideTimer = setInterval(() => {
        showSlides(slideIndex += 1); 
    }, 10000);
}


function stopSlideTimer() {
    clearInterval(slideTimer);
}


const sliderContainer = document.querySelector(".slideshow-container");
sliderContainer.addEventListener("mouseenter", stopSlideTimer);
sliderContainer.addEventListener("mouseleave", startSlideTimer);


document.querySelectorAll('.dot').forEach(dot => {
    dot.addEventListener('mouseenter', stopSlideTimer);
    dot.addEventListener('mouseleave', startSlideTimer);
});

document.querySelectorAll('.prev, .next').forEach(control => {
    control.addEventListener('mouseenter', stopSlideTimer);
    control.addEventListener('mouseleave', startSlideTimer);
});

