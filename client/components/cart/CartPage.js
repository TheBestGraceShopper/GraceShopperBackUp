import React from 'react'
import {connect} from 'react-redux'
import {Link, Redirect} from 'react-router-dom'
import CheckoutPage from './CheckoutPage'


const CartPage = () => {
  const cartItems = JSON.parse(localStorage.getItem('cart')).slice(1)
console.log('CART ITEMS', cartItems)
  return (
    
    <div>
         <ol>
            {cartItems.map((products) => (
              <div key={products.id}>
                <li >
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

  const mapStateToProps = (state) => ({
     state
  })

export default connect(mapStateToProps)(CartPage);
