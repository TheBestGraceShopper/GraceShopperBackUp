const router = require('express').Router()
const {Product} = require('../db/models')
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

//I think we need to take another look here
//need to return update so store can be updated?
//need a res.send or something?
router.put('admin/:productId', async (req, res, next) => {
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
router.delete('admin/:productId', async (req, res, next) => {
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
