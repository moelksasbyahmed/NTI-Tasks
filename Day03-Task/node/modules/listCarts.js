const { cart } = require('../data');

function listCarts() {
  console.log(`Cart ID: ${cart.id}`);

  if (cart.items.length === 0) {
    console.log('  Cart is empty');
  } else {
    cart.items.forEach(item => {
      console.log(`  Item: ${item.name} (Product ID: ${item.productId}), Quantity: ${item.quantity}`);
    });
  }

  console.log(`Total: ${cart.total}`);
  return cart;
}

module.exports = listCarts;