import React from 'react'
import EditUserForm from './EditUserForm'
import StripeForm from './StripeForm'

const PaymentCheckout = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart'))
  const total = cartItems ? cartItems.reduce(((sum, currProduct) => sum + currProduct.price), 0) : 0
  return (
    <div>
      <EditUserForm />
      <StripeForm name='ABCS' description='Please enter payment details' amount={total}/>
    </div>
  )
}

export default PaymentCheckout;
