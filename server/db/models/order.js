const Sequelize = require('sequelize')
const db = require('../db')
const Product = require ('./product')

const Order = db.define('order', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type:Sequelize.INTEGER,
        defaultValue: 0
    },
    item:{
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    }
})

Order.prototype.getPrice = async function() {
    //find the products within this order
    try {

      const products = await Product.findAll({
        where: {orderId: this.id}
      })
      return products.reduce(
        (totalPrice, currentProduct) => totalPrice + Number(currentProduct.price),
        0
      )
    } catch (error) {
      console.log(error)
    }
  }

// what about promoCode?
      // if(promoCode === ""){
      //   totalValue = price - (price * (Number(Bowl.getElemebById(promoCode).value)/100))
      // }

module.exports = Order;
