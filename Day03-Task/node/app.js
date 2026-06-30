const {
	addToCart,
	removeFromCart,
	listCarts,
	calculateTotal,
	products,
	cart
} = require('./');

console.log('Initial products:');
products.forEach(product => {
	console.log(`- ${product.id}: ${product.name} ($${product.price}) qty=${product.quantity}`);
});

addToCart('chicken', 2);
addToCart(4, 3);
removeFromCart('beef', 1);

console.log('\nCart state:');
listCarts();

console.log(`\nTotal: ${calculateTotal()}`);
console.log(`Cart items: ${cart.items.length}`);