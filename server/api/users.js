const router = require('express').Router()
const {User} = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send('Login required')
    }
    if (req.user.userType !== 'admin') {
      res.status(401).send('User does not have privelages to access admin page')
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

router.put('/:userId', async (req, res, next) => {
  try {
    if (!req.user) {
      res.status(401).send('Login required')
    }
    if (req.user.userType !== 'admin') {
      res.status(401).send('User does not have privelages to access admin page')
    }
    const user = await User.findOne({
      where: {
        id: +req.params.userId
      },
      attributes: ['id', 'email', 'userType']
    })
    if (user) {
      const updatedUser = await user.update(req.body)
      res.status(201).json(updatedUser)
    } else {
      res.status(404).send('User not found')
    }
  } catch (err) {
    next(err)
  }
})

