const products = [
  {
    id: 0,
    image: "./assets/img/p1.png",
    title: "VS Pace Mens Trainers",
    price: 120,
    discount: 50,
  },
  {
    id: 1,
    image: "./assets/img/p2.png",
    title: "Infernus V3",
    price: 100,
    discount: 0,
  },
  {
    id: 2,
    image: "./assets/img/p3.png",
    title: "Alpha All-Purpose Gen Z",
    price: 20,
    discount: 30,
  },
  {
    id: 3,
    image: "./assets/img/p4.png",
    title: "A11 Sky",
    price: 20,
    discount: 15,
  },
  {
    id: 4,
    image: "./assets/img/p5.png",
    title: "Urban Tracks ",
    price: 100,
    discount: 0,
  },
  {
    id: 5,
    image: "./assets/img/p6.png",
    title: "Court Vision",
    price: 20,
    discount: 0,
  },
  {
    id: 6,
    image: "./assets/img/p7.png",
    title: "Classic Core 99",
    price: 20,
    discount: 15,
  },
  {
    id: 7,
    image: "./assets/img/p8.png",
    title: "Quick Pace V2",
    price: 100,
    discount: 10,
  },
  {
    id: 8,
    image: "./assets/img/p9.png",
    title: "Air Max T6 Waterproof ",
    price: 20,
    discount: 0,
  },
  {
    id: 9,
    image: "./assets/img/p10.png",
    title: "High Breed F2",
    price: 20,
    discount: 40,
  },
];

const productContainer = document.querySelector("#all-products");
const searchInput = document.querySelector("#search");
const cartIcon = document.querySelector("#cartIcon");
const cartOverlay = document.querySelector("#overlay");
const cartPopup = document.querySelector("#cart");
const cartItemContainer = document.querySelector("#cartItem");
const totalElement = document.querySelector("#total");
const itemCount = document.querySelector("#count");
let cart = [];
let total = 0;

function displayProducts(productList) {
  productContainer.innerHTML = "";
  productList.forEach((product) => {
    const productBox = document.createElement("div");
    productBox.classList.add("box");
    productBox.innerHTML = `
      ${
        product.discount
          ? `<span class="discount">${product.discount}% OFF</span>`
          : ""
      }
      <div class="img-box">
        <img class="images" src="${product.image}" alt="${product.title}" />
      </div>
      <div class="bottom">
        <p>${product.title}</p>
        <div><span>$${product.price}</span>${
      product.discount
        ? `<del>${(product.price / (1 - product.discount / 100)).toFixed(
            2
          )}</del>`
        : ""
    }</div>
        <button onclick="addToCart(${product.id})">Add to cart</button>
      </div>`;
    productContainer.appendChild(productBox);
  });
}

searchInput.addEventListener("input", (element) => {
  const query = element.target.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(query)
  );
  displayProducts(filteredProducts);
});

cartIcon.addEventListener("click", () => {
  cartOverlay.style.display = "block";
  cartPopup.style.display = "block";
});

cartOverlay.addEventListener("click", () => {
  cartOverlay.style.display = "none";
  cartPopup.style.display = "none";
});

function updateCart() {
  cartItemContainer.innerHTML = "";
  if (cart.length == 0) {
    cartItemContainer.innerHTML = "Your cart is empty";
  } else {
    cart.forEach((item) => {
      const cartRow = document.createElement("div");
      cartRow.classList.add("cart-item");
      cartRow.innerHTML = `
        <img class="rowImg" src="${item.image}" alt="${item.title}" />
        <p>${item.title}</p>
        <p>$${item.price} x ${item.quantity}</p>
         <div>
         <i class="fa fa-plus-circle" onclick="incrementQuantity(${item.id})"></i>
         <i class="fa fa-minus-circle" onclick="decrementQuantity(${item.id})"></i>
         <i class="fa fa-trash" onclick="removeFromCart(${item.id})"></i>
  </div>`;
      cartItemContainer.appendChild(cartRow);
    });
  }

  totalElement.innerText = `$${cart
    .reduce((sum, item) => sum + item.price * item.quantity, 0)
    .toFixed(2)}`;
  itemCount.innerText = cart.reduce((count, item) => count + item.quantity, 0);
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }
  updateCart();
}

function removeFromCart(productId) {
  cart = cart.filter((item) => item.id !== productId);
  updateCart();
}

function incrementQuantity(productId) {
  const cartItem = cart.find((item) => item.id == productId);
  if (cartItem) {
    cartItem.quantity += 1;
  }
  updateCart();
}

function decrementQuantity(productId) {
  const cartItem = cart.find((item) => item.id == productId);
  if (cartItem && cartItem.quantity > 1) {
    cartItem.quantity -= 1;
  } else {
    removeFromCart(productId);
  }
  updateCart();
}

displayProducts(products);
