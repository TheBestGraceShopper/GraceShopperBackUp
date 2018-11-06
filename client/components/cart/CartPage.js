import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'

class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      quantity: 1
    }
    this.getLocalStorage = this.getLocalStorage.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  componentDidMount() {
    this.getLocalStorage()

    localStorage.getItem('cart') &&
      this.setState({
        cart: JSON.parse(localStorage.getItem('cart'))
      })
  }


  getLocalStorage() {
    for (let key in this.state) {
      if (localStorage.hasOwnProperty(key)) {
        let value = localStorage.getItem(key)
        try {
          value = JSON.parse(value)
          this.setState([{[key]: value}])
        } catch (e) {
          this.setState([{[key]: value}])
        }
      }
    }
  }

  increaseQuantity (product, quantity) {
    let cart = [...this.state.cart]

    for (let i = 1; i <= quantity; i++) {
      cart.push(product)
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({cart: [...cart], cartObj})
  }

  decreaseQuantity (product, quantity) {
    let cart = [...this.state.cart]

    for (let i = quantity; i > 0; i--) {
      cart.pop()
    }

    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({cart: [...cart], cartObj})
}

  removeFromCart(product){
    let cartArr = JSON.parse(localStorage.getItem('cart'))
    let newCartArr = cartArr.filter(item => (
      item.id !== product.id
    ))
    this.setState({cart: [...newCartArr]})
    localStorage.setItem('cart', JSON.stringify(newCartArr))
  }

  render() {

    function itemWithAmount(items) {
      const uniqueWithCount = {}
      items.forEach(item => {
        if (!uniqueWithCount[item.name]) {
          uniqueWithCount[item.name] = item
          uniqueWithCount[item.name].count = 1
        } else {
          uniqueWithCount[item.name].count++
        }
      })
      return uniqueWithCount
    }

    let cartItems = JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    cartItems = itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)

    return (
      <div>
        <h2>Your Shopping Cart</h2>
        <ol>
          {cartItemNames.map(productName => (
            <div key={cartItems[productName].id}>
              <li>
                <Link to={`/products/${cartItems[productName].id}`}>
                  {`${cartItems[productName].name}`}
                </Link>
                <br />
                <p>
                  Price:
                  {`$${cartItems[productName].price *
                    cartItems[productName].count}`}
                </p>
                <br />

                <b>Quantity:</b>
                <button
                  className="button"
                  type="button"
                  onClick={() => this.decreaseQuantity(cartItems[productName], this.state.quantity)}
                  disabled={cartItems.stock <= 0}
                >
                  -
                </button>

                {cartItems[productName].count}
                
                <button
                  className="button"
                  type="button"
                  onClick={() => this.increaseQuantity(cartItems[productName], this.state.quantity)}
                  disabled={cartItems.stock <= 0}
                >
                  +
                </button>
                <br />

                <img src={cartItems[productName].imageURL} />
                <br />

                <button
                  className="button"
                  type="button"
                  onClick={() => this.removeFromCart(cartItems[productName])}
                >
                  Delete
                </button>
              </li>
              <br />
            </div>
          ))}
        </ol>
        <Link to="/cart/checkout">
          <button type="button">Checkout</button>
        </Link>
      </div>
    )
  }
}

export default CartPage;