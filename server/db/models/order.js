const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('orders', {
    orderId: {
      type: Sequelize.INTEGER
    },
    status: {
      type: Sequelize.ENUM('created', 'processing', 'cancelled', 'completed'),
      defaultValue: 'processing'
    },
    productQuantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    totalPrice: {
      type: Sequelize.INTEGER
    }
})


module.exports = Order;
