import React from 'react'
import EditUserForm from '../components/cart/EditUserForm'
import { Link } from 'react-redux'
import OrderHistory from './OrderHistory'

const Account = (props) => {
  return (
    <div className="form-page">
      <div className="form-square2">
        <h1  className="account" > Account Information </h1>
        < EditUserForm />
        <button className="black-button" type="button" onClick={() => { props.history.push('/account/order-history') }}>History</button>
      </div>
    </div>
  )
}

export default Account;
