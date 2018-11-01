const router = require('express').Router()
const {Product, User} = require('../db/models')

module.exports = router;

// GET for '/api/cart/:userId'
router.get('/:userId', async(req, res, next) => {
  const id = req.params.userId;
  try {
    // const cart = await Product.findAll({include: [{model: User}], where: {userId: id} })
    const user = await User.findById(id);
    const products = await user.getProducts();
    res.status(200).send(products);
  } catch(err) {
    next(err)
  }
})

//POST for '/api/cart/:userId'

router.post('/:userId', async(req, res, next) => {
  const id = req.params.userId;
  const productId = req.body.id;
  try {
    const user = await User.findById(id);
    const product = await Product.findById(productId);
    const cart = await user.addProduct(product)
    res.status(201).send(cart)
  } catch(err) {
    next(err)
  }
})

//POST for '/api/cart/delete/:userId'
router.post('/delete/:userId', async(req, res, next) => {
  const id = req.params.userId;
  const productId = req.body.id;
  try {
    const user = await User.findById(id)
    const product = await Product.findById(productId)
    await user.removeProduct(product)
    res.sendStatus(204)
  }
  catch (err) {
    next(err)
  }
})

// add to cart X
// remove from cart
// adjust get all for user ID
