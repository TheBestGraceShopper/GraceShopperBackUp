import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import CheckoutPage from './CheckoutPage'

const CartPage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart'))
    console.log('localstorage', localStorage.getItem('cart'))
    console.log('cartitems', cartItems)
  return (
    <div>
         <ol>
            {cartItems.map((products, i) => (
              <div key={i}>
                <li key={products.id}>
                  <Link to={`/products/${products.id}`}> {`${ products.name}`}</Link>
                  <br />
                  Price: {`${products.price}`}
                  <br />
                  <img src={products.imageUrl} />
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



export default CartPage;