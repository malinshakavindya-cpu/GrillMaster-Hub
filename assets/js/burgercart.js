// Load cart from localStorage
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM elements
const cartItemsContainer = document.getElementById('cartItems');
const totalElement = document.getElementById('total');
const clearCartBtn = document.getElementById('clearCartBtn');
const placeOrderBtn = document.getElementById('placeOrderBtn');

// Render cart items
function renderCart() {
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="text-muted text-center py-4 small">Cart is empty</p>';
    totalElement.textContent = 'Rs. 0.00';
    return;
  }

  let total = 0;

  cart.forEach((item, index) => {
    total += item.price * item.quantity;

    const itemRow = document.createElement('div');
    itemRow.classList.add('d-flex', 'justify-content-between', 'align-items-center', 'mb-2');

    itemRow.innerHTML = `
      <span>${item.name} (x${item.quantity})</span>
      <span>Rs. ${item.price * item.quantity}</span>
      <div>
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, -1)">-</button>
        <button class="btn btn-sm btn-outline-secondary" onclick="updateQuantity(${index}, 1)">+</button>
        <button class="btn btn-sm btn-outline-danger" onclick="removeItem(${index})">✖</button>
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