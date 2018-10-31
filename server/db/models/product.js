const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
    category: {
        type: Sequelize.STRING,
        allowNull: false
      },
      name: {
          type: Sequelize.STRING,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      description: {
          type: Sequelize.TEXT,
      },
      price: {
          type: Sequelize.INTEGER,
          allowNull: false,
          validate: {
              notEmpty: true
          }
      },
      stock: {
          type: Sequelize.INTEGER,
          defaultValue: 0
      },
      imageURL: {
          type: Sequelize.STRING,
          defaultValue: 'https://ibb.co/fVU6Vq'
      }
})

//helper func to figure out stock to go here!



module.exports = Product