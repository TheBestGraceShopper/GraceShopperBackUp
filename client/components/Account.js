import React from 'react'
import EditUserForm from '../components/cart/EditUserForm'
import {Link} from 'react-redux'
import OrderHistory from './OrderHistory'

const Account = (props) => {
    return (
      <div>
        <h1> Account Information </h1>
        <EditUserForm />
        <button type="button" onClick={() => {props.history.push('/account/order-history')}}>Order History</button>
      </div>
    )
}

export default Account;
