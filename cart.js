const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if(isNaN(discountRate)){
    console.log("The discount is not a number. Returning default total");
    return total;
  }
  return total - total * discountRate; // Bug: Missing validation for discountRate
}

function generateReceipt(cartItems, total) {
  let receipt = "Items:\n";
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price}\n`;
  });

  if(!isNaN(total)){
    receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number
  } else {
    receipt += `Total not a valid number`
  }
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, 0.2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);
// const receipt = generateReceipt(cart, "discountedTotal");

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").innerHTML = "<pre>" + receipt + "</pre>"; // This was changed so the new lines would work
