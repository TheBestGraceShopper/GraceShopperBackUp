import React from 'react'
import {Link, Redirect} from 'react-router-dom'
import Checkout from './Checkout'

const CartPage = () => {
  const cartItems = JSON.parse(localStorage.cart)

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
            <button onClick={() => <Checkout />} type="button">Checkout</button>
          </Link>
    </div>
    )
  }



export default CartPage;