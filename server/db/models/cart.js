const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
    orderId: {
      type: Sequelize.INTEGER
    },
    price: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed')
    }
})

// Cart.prototype.findPrice = function () {
//     const calculatePrice =
//     return this.total.reduce((sum, currentVal) => sum + currentVal)
// }

module.exports = Cart;
