import React from 'react'
import EditUserForm from './EditUserForm'
import StripeForm from './StripeForm'

const PaymentCheckout = () => {
  return (
    <div>
      <EditUserForm />
      <StripeForm name='ABCS' description='Please enter payment details'/>
    </div>
  )
}

export default PaymentCheckout;
