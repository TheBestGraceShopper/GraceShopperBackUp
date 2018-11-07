import React, {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import CheckoutForm from './CheckoutForm'
import axios from 'axios'

class CartPage extends Component {
  constructor() {
    super()
    this.state = {
      cart: [],
      quantity: 1,
      cartItems: {},
      productNames: []
    }
    // this.getLocalStorage = this.getLocalStorage.bind(this)
    this.increaseQuantity = this.increaseQuantity.bind(this)
    this.decreaseQuantity = this.decreaseQuantity.bind(this)
    this.removeFromCart = this.removeFromCart.bind(this)
  }

  componentDidMount() {
    // this.getLocalStorage()

    // localStorage.getItem('cart') &&
    //   this.setState({
    //     cart: JSON.parse(localStorage.getItem('cart'))
    //   })

    let cartItems = JSON.parse(localStorage.getItem('cart'))
    ? JSON.parse(localStorage.getItem('cart'))
    : []
    cartItems = this.itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)
    cartItemNames.map( async(productName) => {
      let stock = await this.checkStock(cartItems[productName].id);
      cartItems[productName].stock = stock + 1;
    });

    this.setState({productNames: cartItemNames, cartItems})
  }

  // getLocalStorage() {
  //   for (let key in this.state) {
  //     if (localStorage.hasOwnProperty(key)) {
  //       let value = localStorage.getItem(key)
  //       try {
  //         value = JSON.parse(value)
  //         this.setState([{[key]: value}])
  //       } catch (e) {
  //         this.setState([{[key]: value}])
  //       }
  //     }
  //   }
  // }

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

  async checkStock(id) {
    const {data} = await axios.get(`/api/products/${id}`)
    return data.stock;
  }

  itemWithAmount(items) {
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

  render() {

    let cartItems = JSON.parse(localStorage.getItem('cart'))
    ? JSON.parse(localStorage.getItem('cart'))
    : []
    cartItems = this.itemWithAmount(cartItems)
    let cartItemNames = Object.keys(cartItems)

    return (
      <div>
        <h2>Your Shopping Cart</h2>
        <ol>
          {cartItemNames.map( (productName) => {
            console.log('Right?',this.state.cartItems.name)
            return (<div key={cartItems[productName].name} >
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

                <p><b>Quantity:</b></p>
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
                  onClick={async() => {
                    let stock = await this.checkStock(cartItems[productName].id)
                    if (stock >= cartItems[productName].count + 1) {
                      this.increaseQuantity(cartItems[productName], this.state.quantity)
                    } else {
                      alert(`Sorry, there ${stock === 1 ? 'is' : 'are'} only ${stock} left in stock.`)
                    }
                  }}
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
          )})}
        </ol>
        <Link to="/cart/checkout">
          <button type="button"
          // onClick={
          //     this.itemWithAmount(this.state.cart).map(item => {
          //       if(item.count > ------- ) {

          //       }
          //     })
          //   }
            >Checkout</button>
        </Link>
      </div>
    )
  }
}

export default CartPage;




// import React, {Component} from 'react'
// import {Link, Redirect} from 'react-router-dom'
// import {connect} from 'react-redux'
// import CheckoutForm from './CheckoutForm'
// import axios from 'axios'

// class CartPage extends Component {
//   constructor() {
//     super()
//     this.state = {
//       cart: [],
//       quantity: 1,
//       cartItems: {},
//       productNames: []
//     }
//     // this.getLocalStorage = this.getLocalStorage.bind(this)
//     this.increaseQuantity = this.increaseQuantity.bind(this)
//     this.decreaseQuantity = this.decreaseQuantity.bind(this)
//     this.removeFromCart = this.removeFromCart.bind(this)
//   }

//   componentDidMount() {
//     // this.getLocalStorage()

//     // localStorage.getItem('cart') &&
//     //   this.setState({
//     //     cart: JSON.parse(localStorage.getItem('cart'))
//     //   })

//     let cartItems = JSON.parse(localStorage.getItem('cart'))
//     ? JSON.parse(localStorage.getItem('cart'))
//     : []
//     cartItems = this.itemWithAmount(cartItems)
//     let cartItemNames = Object.keys(cartItems)
//     cartItemNames.map( async(productName) => {
//       let stock = await this.checkStock(cartItems[productName].id);
//       cartItems[productName].stock = stock + 1;
//     });

//     this.setState({productNames: cartItemNames, cartItems})
//   }

//   // getLocalStorage() {
//   //   for (let key in this.state) {
//   //     if (localStorage.hasOwnProperty(key)) {
//   //       let value = localStorage.getItem(key)
//   //       try {
//   //         value = JSON.parse(value)
//   //         this.setState([{[key]: value}])
//   //       } catch (e) {
//   //         this.setState([{[key]: value}])
//   //       }
//   //     }
//   //   }
//   // }

//   increaseQuantity (product, quantity) {
//     let cart = [...this.state.cart]

//     for (let i = 1; i <= quantity; i++) {
//       cart.push(product)
//     }

//     localStorage.setItem('cart', JSON.stringify(cart))
//     var cartValue = localStorage.getItem('cart')
//     var cartObj = JSON.parse(cartValue)
//     this.setState({cart: [...cart], cartObj})
//   }

//   decreaseQuantity (product, quantity) {
//     let cart = [...this.state.cart]

//     for (let i = quantity; i > 0; i--) {
//       cart.pop()
//     }

//     localStorage.setItem('cart', JSON.stringify(cart))
//     var cartValue = localStorage.getItem('cart')
//     var cartObj = JSON.parse(cartValue)
//     this.setState({cart: [...cart], cartObj})
// }

//   removeFromCart(product){
//     let cartArr = JSON.parse(localStorage.getItem('cart'))
//     let newCartArr = cartArr.filter(item => (
//       item.id !== product.id
//     ))
//     this.setState({cart: [...newCartArr]})
//     localStorage.setItem('cart', JSON.stringify(newCartArr))
//   }

//   async checkStock(id) {
//     const {data} = await axios.get(`/api/products/${id}`)
//     return data.stock;
//   }

//   itemWithAmount(items) {
//     const uniqueWithCount = {}
//     items.forEach(item => {
//       if (!uniqueWithCount[item.name]) {
//         uniqueWithCount[item.name] = item
//         uniqueWithCount[item.name].count = 1
//       } else {
//         uniqueWithCount[item.name].count++
//       }
//     })
//     return uniqueWithCount
//   }

//   render() {

//     let cartItems = JSON.parse(localStorage.getItem('cart'))
//     ? JSON.parse(localStorage.getItem('cart'))
//     : []
//     cartItems = this.itemWithAmount(cartItems)
//     let cartItemNames = Object.keys(cartItems)
