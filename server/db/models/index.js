const User = require('./user')
const Review = require('./review')
const Product = require('./product')
const Order = require('./order')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/model
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */

// User.belongsToMany(Product, {through: Order});
// Product.belongsToMany(User, {through: Order});

User.hasMany(Review);
Review.belongsTo(User);
Review.belongsTo(Product);
Product.hasMany(Review);

User.hasMany(Order);
Order.belongsTo(User);
Product.hasMany(Order);
Order.belongsTo(Product);


module.exports = {
  User,
  Review,
  Product,
  Order
}
