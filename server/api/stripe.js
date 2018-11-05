const router = require('express').Router()
module.exports = router;

const stripe = require("stripe")(process.env.SECRET_KEY);

router.get('/', (req, res) => {
    res.send({ message: 'Hello Stripe checkout server!', timestamp: new Date().toISOString() })
})

router.post('/', async (req, res, next) => {
    try {
        const response = await stripe.charges.create({
            description: req.body.description,
            source: req.body.source,
            currency: req.body.currency,
            amount: req.body.amount
        })
        res.json(response.status)
    }
    catch (err) {
        next(err)
    }
})
