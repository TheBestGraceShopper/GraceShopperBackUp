import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import CheckoutPage from './CheckoutPage'


const CartPage = () => {
  let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  cartItems = itemWithAmount(cartItems);
  let cartItemNames = Object.keys(cartItems);
  console.log('cartItems======', cartItems)

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

  const mapStateToProps = (state) => ({
     state
  })

export default connect(mapStateToProps)(CartPage);

function itemWithAmount(items) {
  const uniqueWtihCount = {}
  items.forEach(item => {
    if (!uniqueWtihCount[item.name]) {
      uniqueWtihCount[item.name] = item;
      uniqueWtihCount[item.name].count = 1
    } else {
      uniqueWtihCount[item.name].count++
    }
  })
  return uniqueWtihCount;
}
