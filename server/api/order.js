const router = require('express').Router()
const { Product, User, Order, ProductOrder } = require('../db/models')

module.exports = router;

// GET for '/api/order/lastOrder'
router.get('/lastOrder', async (req, res, next) => {
  try {
    let product = await Order.max('orderId') || 0;
    res.status(202).send({ max: product });
  } catch (err) {
    next(err)
  }
})

// GET for '/api/order/:userId'
router.get('/:userId', async (req, res, next) => {
  const id = req.params.userId;
  try {
    // const cart = await Product.findAll({include: [{model: User}], where: {userId: id} })
    const user = await User.findById(id);
    const products = await user.getProducts();
    res.status(200).send(products);
  } catch (err) {
    next(err)
  }
})

// POST for '/api/order/:productId/:quantity'
// POST for '/api/order/add'
router.post('/add', async (req, res, next) => {
  try {
    const order = await Order.create({
      totalPrice: req.body.totalPrice,
      userId: req.body.userId
    })
    res.status(201).send(order)
  }
  catch (err) {
    next(err)
  }
})

// POST for '/api/order/add_product_order'
router.post('/add_product_order', async (req, res, next) => {
  try {
    console.log("add product req body", req.body);
    const productOrder = await ProductOrder.create({
      productId: req.body.productId,
      productQuantity: req.body.productQuantity,
      orderId: req.body.orderId
    })
    res.status(201).send(productOrder)
  }
  catch (err) {
    next(err)
  }
})

//POST for '/api/order/:userId'

// router.post('/:userId', async(req, res, next) => {
//   const id = req.params.userId;
//   const productId = req.body.id;
//   try {
//     const user = await User.findById(id);
//     const product = await Product.findById(productId);
//     const cart = await user.addProduct(product)
//     res.status(201).send(cart)
//   } catch(err) {
//     next(err)
//   }
// })

//POST for '/api/order/delete/:userId'
router.post('/delete/:userId', async (req, res, next) => {
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

//POST for '/api/order/lastOrder

//POST for '/api/cart/odered
// router.get('ordered', async(req, res, next) => {
//   try {
//     const products = await Order.findAll({
//       order: [Sequelize.fn('max', Sequelize.col('orderId'))]
//     })
//     res.send(products);
//   } catch (err) {
//     next(err)
//   }
// })

