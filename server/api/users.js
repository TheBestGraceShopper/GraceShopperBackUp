const router = require('express').Router()
const {User, Order, Product} = require('../db/models')
module.exports = router


// GET /api/users

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send('Login required')
    }
    if (req.user.userType !== 'admin') {
      res.status(401).send('User does not have privileges to access admin page')
    }
    const users = await User.findAll({
      // explicitly select only the id and email fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'email', 'userType']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

// GET /api/users/pastOrders/:userId
router.get('/pastOrders/:userId', async(req, res, next) => {
  try {
    const userId = req.params.userId;
    const pastOrders = await Order.findAll({include: [{model: Product}], where: {userId}});
    res.send(pastOrders);
  } catch(err) {
    next(err);
  }
})

router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send('Login required')
    }
    if (req.user.userType !== 'admin') {
      res.status(401).send('User does not have privileges to access admin page')
    }
    const user = await User.findOne({
      where: {
        id: +req.params.userId
      },
      attributes: ['id', 'email', 'userType']
    })
    const updatedUser = await user.update(req.body)
    res.status(201).json(updatedUser)

  } catch (err) {
    next(err)
  }
})

// POST /api/users
router.post('/', async (req, res, next) => {
  try {
      const newUser = await User.create({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        address: req.body.address,
        city: req.body.city,
        country: req.body.country,
        zipCode: req.body.zipCode,
        phoneNumber: req.body.phoneNumber
      })
      res.status(201).send(newUser)
  }
  catch (err) {
    next(err)
  }
})

// PUT /api/users/checkout/:userId
router.put('/checkout/:userId', async (req, res, next) => {
  try {
    const user = await User.findById(req.params.userId)
    const updatedUser = await user.update(req.body)
    res.status(200).send(updatedUser)
  }
  catch (err) {
    next(err)
  }
})
