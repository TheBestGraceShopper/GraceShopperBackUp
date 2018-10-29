const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    totalPrice: {
        type:Sequelize.DECIMAL(0,100),
        defaultValue: 0
    },
    item:{
        type: Sequelize.ARRAY(Sequelize.TEXT),
        allowNull: false
    }
})


module.exports = Order;
