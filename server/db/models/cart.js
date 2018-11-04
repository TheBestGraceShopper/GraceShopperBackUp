const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
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

module.exports = Order;
