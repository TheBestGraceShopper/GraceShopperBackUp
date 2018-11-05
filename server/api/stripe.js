const router = require('express').Router()
module.exports = router;

const stripe = require("stripe")(process.env.SECRET_KEY);

router.post('/', async (req, res, next) => {
    try {
        await stripe.charges.create(req.body)
    }
    catch (err) {
        next(err)
    }
})