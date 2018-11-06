import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'



class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      cart: []
    }
    this.getLocalStorage = this.getLocalStorage.bind(this)
    this.addToCart = this.addToCart.bind(this)
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

  addToCart(product) {
    let cart = [...this.state.cart]
    cart.push(product)
    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({cart: [...cart], cartObj})
  }

removeFromCart(product){
  let cartArr = JSON.parse(localStorage.getItem('cart'))
  let newCartArr = cartArr.filter(item => (
    item.id!==product.id
  ))
  this.setState({cart: [...newCartArr]})
  localStorage.setItem('cart', JSON.stringify(newCartArr))
}

  render() {
    console.log("LOCAL STORAGE", JSON.parse(localStorage.getItem('cart')))
    console.log("CARRRRT", this.state.cart)

    let cartItems = JSON.parse(localStorage.getItem('cart'))
      ? JSON.parse(localStorage.getItem('cart'))
      : []
    cartItems = itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)

    return (
      <div>
        <h3>Your Shopping Cart</h3>
        <ol>
          {cartItemNames.map(productName => (
            <div key={cartItems[productName].id}>
              <li>
                <Link to={`/products/${cartItems[productName].id}`}>
                  {' '}
                  {`${cartItems[productName].name}`}
                </Link>
                <br />
                <p>
                  Price:{' '}
                  {`$${cartItems[productName].price *
                    cartItems[productName].count}`}
                </p>
                <br />
                <p>Amount: {cartItems[productName].count}</p>
                <button
                  className="QuantityButton"
                  type="button"
                  onClick={() => this.addToCart(cartItems[productName])}
                  disabled={cartItems.stock <= 0}
                >
                  {' '}
                  Want another one?
                </button>
                <button
                  className="QuantityButton"
                  type="button"
                  onClick={() => this.removeFromCart(cartItems[productName])}
                >
                  {' '}
                  Remove From Cart
                </button>
                <img src={cartItems[productName].imageURL} />
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

export default CartPage

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
