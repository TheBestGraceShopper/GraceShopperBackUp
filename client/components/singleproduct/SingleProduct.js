import React from 'react'
import {connect} from 'react-redux'
import {addProductToCart, removeProductToCart} from '../../store/order'
import {fetchAProduct, fetchReviews, postReview} from '../../store'

import Review from './Review'
import AddToCart from '../cart/AddToCart'
import CartPage from '../cart/CartPage'

class SingleProduct extends React.Component {
  constructor() {
    super()
    this.state = {
      text: '',
      rating: '',
      productId: '',
      userId: '',
      cart: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.getLocalStorage = this.getLocalStorage.bind(this)
    this.addToCart = this.addToCart.bind(this)
  }
  async componentDidMount() {
    // this.props.getAProduct(this.props.match.params.productId);
    const productId = this.props.match.params.productId
    await this.props.getAProduct(productId)
    await this.props.getReviews(productId)
    this.setState({userId: this.props.userId, productId: productId})
    this.getLocalStorage()
    localStorage.getItem('cart') &&
      this.setState({
        cart: JSON.parse(localStorage.getItem('cart'))
      })
    // this.addToCart(this.props.selectedProduct)
  }

  handleSubmit(e) {
    e.preventDefault(e)
    const review = {
      text: this.state.text,
      rating: Number(this.state.rating),
      userId: this.state.userId,
      productId: this.state.productId
    }
    // console.log(review)
    this.props.addReview(review)
  }
  handleChange(e) {
    this.setState({[e.target.name]: e.target.value})
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
    // localStorage.getItem('cart', JSON.parse(cart))
    localStorage.setItem('cart', JSON.stringify(cart))
    var cartValue = localStorage.getItem('cart')
    var cartObj = JSON.parse(cartValue)
    this.setState({cart: [...cart], cartObj})
  }

  render() {
    //  console.log("localStorage", JSON.parse(localStorage.getItem('cart')))
    console.log('CART', this.state.cart)
    const {selectedProduct} = this.props
    if (!selectedProduct.id) {
      return 'Loading the product...'
    }

    return (
      selectedProduct.id && (
        <div>
          <div className="single-product">
            <h1>Name: {selectedProduct.name}</h1>
            <img src={selectedProduct.imageURL} />
            <p>Description: {selectedProduct.description}</p>
            <h2>Price: {selectedProduct.price}</h2>
            <AddToCart
              selectedProduct={selectedProduct}
              cart={this.state.cart}
              addToCart={this.addToCart}
            />
          </div>
          <div>
            <Review
              state={this.state}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              reviews={this.props.reviews}
              productId={selectedProduct.id}
            />
          </div>
        </div>
      )
    )
  }
}

const mapStateToProps = state => ({
  selectedProduct: state.productsReducer.selectedProduct,
  reviews: state.review.reviews,
  userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
  getAProduct: id => dispatch(fetchAProduct(id)),
  getReviews: productId => dispatch(fetchReviews(productId)),
  addReview: review => dispatch(postReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
