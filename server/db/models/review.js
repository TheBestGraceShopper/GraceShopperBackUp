const Sequelize = require('sequelize')
const db = require('../db')

const Review = db.define('review', {
    text: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    rating:{
        type: Sequelize.INTEGER,
<<<<<<< HEAD
        validate: { min: 1, max: 5 },
=======
>>>>>>> fee1e737eb4051a648c89de47068084a4c3d355f
        allowNull: false
    },
})

module.exports = Review;

