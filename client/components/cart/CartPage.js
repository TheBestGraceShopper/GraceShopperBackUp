import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import CheckoutPage from './CheckoutPage'



const CartPage = (props) => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  cartItems = itemWithAmount(cartItems);
  let cartItemNames = Object.keys(cartItems);

  console.log('WHAT ARE PROPS', props)

  return (

    <div>
      <h3>Your Shopping Cart</h3>
         <ol>
            {cartItemNames.map((productName) => (
              <div key={cartItems[productName].id}>
                <li >
                  <Link to={`/products/${cartItems[productName].id}`}> {`${ cartItems[productName].name}`}</Link>
                  <br />
                  <p>Price: {`$${cartItems[productName].price * cartItems[productName].count}`}</p>
                  <br />
                  <p>Amount: {cartItems[productName].count}</p>
                  <button className="QuantityButton" type="button" 
                    onClick={props.addQuantity}
                    disabled = {cartItems.stock > 0 ? '' : 'disabled'}> + Add Item
                   </button>
                   <button className="QuantityButton" type="button" 
                    onClick={props.removeQuantity}
                    disabled = {cartItems.stock > 0 ? '' : 'disabled'}> - Decrease Item
                   </button>
                  <br />
                  <img src={cartItems[productName].imageURL} />
                </li>
                <br />
              </div>
            ))}
          </ol>
          <Link to='/checkout'>
            <button onClick={() => <CheckoutPage />} type="button">Checkout</button>
          </Link>
    </div>
    )
  }


export default (CartPage);

function itemWithAmount(items) {
  const uniqueWithCount = {}
  items.forEach(item => {
    if (!uniqueWithCount[item.name]) {
      uniqueWithCount[item.name] = item;
      uniqueWithCount[item.name].count = 1
    } else {
      uniqueWithCount[item.name].count++
    }
  })
  return uniqueWithCount;
}
