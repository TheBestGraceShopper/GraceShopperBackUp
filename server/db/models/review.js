const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    title: {
      type: Sequelize.STRING
  },
    rating:{
        type: Sequelize.INTEGER,
        validate: {
          min: 0,
          max: 5
        },
        allowNull: false
    },
})

module.exports = Review;

