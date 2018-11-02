const router = require('express').Router()
const {Product, Review} = require('../db/models')

module.exports = router

router.get('/:productId', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      where : {productId : req.params.productId}
    })
    res.status(200).send(reviews);
  }
  catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    const review = await Review.create(req.body)
    res.status(201).send(review);
  }
  catch (err) {
    next(err)
  }
})
