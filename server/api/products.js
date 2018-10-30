const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

<<<<<<< HEAD
router.get('/', async (req, res, next) => {
=======
// GET /products
router.get('/', async (req, res, next) => {

>>>>>>> 768449ed5aae616c81231f354280c021d66dcaec
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

// POST /products/admin
router.post('/admin', async (req, res, next) => {
    try {
        const newProduct = await Product.create({
            category: req.body.category,
            name: req.body.name,
            description: req.body.description,
            price: req.body.description,
            stock: req.body.stock,
            imageURL: req.body.imageURL
        })
        res.status(201).json(newProduct)
    }
    catch (err) {
        next(err)
    }
})

// PUT /products/admin/:productId
router.put('/:productId', async (req, res, next) => {
    try {
        const productToUpdate = await Product.findById(req.params.productId)
        if (productToUpdate) {
            const updatedProduct = await productToUpdate.update(req.body)
        }
        else {
            console.error(err)
            next(err)
        }
    }
    catch (err) {
        next(err)
    }
})

// DELETE /products/admin/:productId
router.delete('/:productId', async (req, res, mext) => {
    try {
        await Product.destroy({
            where: {
                id: productId
            }
        })
        res.sendStatus(204)
    }
    catch (err) {
        next(err)
    }
})