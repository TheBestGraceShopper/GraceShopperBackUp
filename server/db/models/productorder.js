const Sequelize = require('sequelize')
const db = require('../db')

const ProductOrder = db.define('product_order', {
    productQuantity: {
      type: Sequelize.INTEGER,
      defaultValue: 0
    }
})

module.exports = ProductOrder;
