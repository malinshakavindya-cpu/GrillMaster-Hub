

    // Initialize cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

const cartItemsContainer = document.getElementById('cartItems');
const totalElement = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCartBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// Add to cart buttons
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.dataset.name;
    const price = parseInt(button.dataset.price);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    renderCart();
  });
});

// Render cart
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">Cart is empty</p>';
    totalElement.textContent = 'Rs. 0.00';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemRow = document.createElement('div');
    itemRow.classList.add('cart-row');
    itemRow.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>Rs. ${item.price * item.quantity}</span>
      <div>
        <button onclick="updateQuantity(${index}, -1)">-</button>
        <button onclick="updateQuantity(${index}, 1)">+</button>
        <button onclick="removeItem(${index})">✖</button>
      </div>
    `;
    cartItemsContainer.appendChild(itemRow);
  });

  totalElement.textContent = `Rs. ${total.toFixed(2)}`;
}

// Update quantity
function updateQuantity(index, change) {
  cart[index].quantity += change;
  if (cart[index].quantity <= 0) {
    cart.splice(index, 1);
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Remove item
function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

// Clear cart
clearCartBtn.addEventListener('click', () => {
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

// Place order
placeOrderBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const name = document.getElementById('customerName').value.trim();
  const phone = document.getElementById('customerPhone').value.trim();
  const pickupTime = document.getElementById('pickupTime').value;

  if (!name || !phone || !pickupTime) {
    alert('Please fill in all customer details.');
    return;
  }

  if (cart.length === 0) {
    alert('Your cart is empty.');
    return;
  }

  alert(`Order placed!\nCustomer: ${name}\nPhone: ${phone}\nPickup: ${pickupTime}\nItems: ${cart.length}`);
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
});

// Initial render
renderCart();