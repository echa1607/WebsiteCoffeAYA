document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const checkoutButton = document.getElementById("checkout");

  let cart = [];

  addToCartButtons.forEach((button) => {
    button.addEventListener("click", addToCart);
  });

  checkoutButton.addEventListener("click", checkout);

  function addToCart(event) {
    const product = event.target.parentElement;
    const productId = product.getAttribute("data-id");
    const productName = product.querySelector("h3").innerText;
    const productPrice = parseFloat(product.querySelector(".price").innerText.slice(1));

    const itemExists = cart.find((item) => item.id === productId);

    if (itemExists) {
      itemExists.quantity++;
    } else {
      cart.push({ id: productId, name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
  }

  function updateCart() {
    cartItemsContainer.innerHTML = "";
    let total = 0;

    cart.forEach((item) => {
      const li = document.createElement("li");
      li.className = "cart-item";
      li.innerHTML = `
          <span>${item.name} x${item.quantity}</span>
          <span>$${(item.price * item.quantity).toFixed(2)}</span>
        `;
      cartItemsContainer.appendChild(li);

      total += item.price * item.quantity;
    });

    cartTotal.innerText = total.toFixed(2);
  }

  function checkout() {
    alert("Terima kasih atas pembelian Anda!");
    cart = [];
    updateCart();
  }
});
