const { cart } = require('../data');

function calculateTotal() {
    return cart.total;
}

module.exports = calculateTotal;