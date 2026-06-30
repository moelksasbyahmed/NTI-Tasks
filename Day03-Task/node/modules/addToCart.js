const { cart, products } = require('../data');

function findProduct(identifier) {
    return products.find(product => product.id === identifier || product.name === identifier);
}

function addToCart(identifier, quantity = 1) {
    const product = findProduct(identifier);

    if (!product) {
        throw new Error(`Product ${identifier} not found`);
    }

    if (quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
    }

    if (product.quantity < quantity) {
        throw new Error(`Not enough quantity for product ${product.name}`);
    }

    const existingItem = cart.items.find(item => item.productId === product.id);

    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId: product.id,
            name: product.name,
            quantity,
            price: product.price
        });
    }

    product.quantity -= quantity;
    cart.total += product.price * quantity;
    return cart;
}

module.exports = addToCart;