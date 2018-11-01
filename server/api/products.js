const router = require('express').Router()
const {Product, User} = require('../db/models')
const authorize = require ('./authorize')

module.exports = router

router.get('/', async (req, res, next) => {

  try {
    const products = await Product.findAll()
    res.status(200).json(products)
  } catch (err) {
    next(err)
  }
})

// GET /products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.productId)
    res.status(200).json(product)
  }
  catch (err) {
    next(err)
  }
})

// ADMIN ROUTES

// POST api/products/admin
router.post('/admin', authorize, async (req, res, next) => {
    try {
        const newProduct = await Product.create({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: Number(req.body.price),
            stock: Number(req.body.stock),
            imageURL: req.body.imageURL
        })
        res.status(201).json(newProduct)

    }
    catch (err) {
        next(err)
    }
})

// PUT /products/admin/:productId

router.put('/admin/:productId', authorize, async (req, res, next) => {
    try {
        const productToUpdate = await Product.findById(req.params.productId)

        const updatedProduct = await productToUpdate.update(req.body)
        res.status(200).json(updatedProduct);

    }
    catch (err) {
        next(err)
    }
})

// DELETE /products/admin/:productId

router.delete('/admin/:productId', authorize, async (req, res, next) => {
    try {
        await Product.destroy({
            where: {
                id: req.params.productId
            }
        })
        res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})
