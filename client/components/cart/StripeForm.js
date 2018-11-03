import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import history from '../../history'

const STRIPE_PUBLISHABLE =
	process.env.NODE_ENV === 'production'
		? 'pk_test_VXhU5UDBroNkMgpztFSS2AAu'
		: 'pk_test_VXhU5UDBroNkMgpztFSS2AAu'

const currency = 'USD'
const monetize = amount => Number(amount) * 1000

const successfullPayment = data => {
    alert('Thanks for the purchase! Enjoy your meats and cheeses.')
}

const failedPayment = data => {
    alert('You cannnot enjoy your meats and cheeses just yet. Do you have enough money?')
}

const withToken = (amount, description, clearCart) => token =>
  axios.post('/api/stripe', {
      description,
      source: token.id,
      currency,
      amount: monetize(amount)
  })
  .then(successfullPayment)
//   .then(clearCart()) going to need to pass down the props for clearing cart
  .then(history.push('/home'))
  .catch(failedPayment)

const CheckoutForm = ({name, description, amount, clearCart}) => (
	<StripeCheckout
		name={name}
		description={description}
		amount={monetize(amount)}
		token={withToken(amount, description, clearCart)}
		currency={currency}
		stripeKey={STRIPE_PUBLISHABLE}
	/>
)

export default CheckoutForm;