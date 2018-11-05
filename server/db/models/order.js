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
    productAmount: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
    totalItemPrice: {
      type: Sequelize.INTEGER
    }
})


module.exports = Order;
