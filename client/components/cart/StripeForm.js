import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import history from '../../history'

const STRIPE_PUBLISHABLE =
	process.env.NODE_ENV === 'production'
		? 'pk_test_a41tEZdwchhwkDi9HhH0pc9D'
		: 'pk_test_a41tEZdwchhwkDi9HhH0pc9D'

const currency = 'USD'
const monetize = amount => Number(amount) * 100

const successfullPayment = data => {
    alert('Thanks for the purchase! Have a gouda day!')
}

const failedPayment = data => {
    alert('You cannnot enjoy your meats and cheeses just yet. Do you have enough money? Maybe check out www.monster.com')
}

const withToken = (amount, description) => token =>
  axios.post('/api/stripe', {
      description,
      source: token.id,
      currency,
      amount: monetize(amount)
  })
  .then(successfullPayment())
  .then(window.localStorage.clear())
  .then(history.push('/home'))
  .catch(failedPayment)

const StripeForm = ({name, description, amount}) => (
	<StripeCheckout
		name={name}
		description={description}
		amount={monetize(amount)}
		token={withToken(amount, description)}
		currency={currency}
		stripeKey={STRIPE_PUBLISHABLE}
	/>
)

export default StripeForm;
