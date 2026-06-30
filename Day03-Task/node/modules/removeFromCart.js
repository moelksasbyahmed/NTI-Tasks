const { cart, products } = require('../data');

function findProduct(identifier) {
    return products.find(product => product.id === identifier || product.name === identifier);
}

function removeFromCart(identifier, quantity = 1) {
    const product = findProduct(identifier);

    if (!product) {
        throw new Error(`Product ${identifier} not found`);
    }

    if (quantity <= 0) {
        throw new Error('Quantity must be greater than zero');
    }

    const itemIndex = cart.items.findIndex(item => item.productId === product.id);

    if (itemIndex === -1) {
        throw new Error(`Item ${product.name} not found in cart`);
    }

    const cartItem = cart.items[itemIndex];

    if (quantity > cartItem.quantity) {
        throw new Error(`Cannot remove ${quantity} of ${product.name}. Only ${cartItem.quantity} available.`);
    }

    if (quantity === cartItem.quantity) {
        cart.items.splice(itemIndex, 1);
    } else {
        cartItem.quantity -= quantity;
    }

    product.quantity += quantity;
    cart.total -= product.price * quantity;
    return cart;
}

module.exports = removeFromCart;