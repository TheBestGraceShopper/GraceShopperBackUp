import React from 'react'
import {connect} from 'react-redux'
import { fetchAProduct, fetchReviews, postReview} from '../../store'
import Review from './Review'
import AddToCart from '../cart/AddToCart'


class SingleProduct extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      rating: '',
      productId: '',
      userId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
    async componentDidMount() {
      const productId = this.props.match.params.productId
      await this.props.getAProduct(productId)
      await this.props.getReviews(productId);
      this.setState({userId: this.props.userId, productId: productId});
    }
    handleSubmit (e) {
      e.preventDefault(e);
      const review = {text: this.state.text, rating: Number(this.state.rating), userId: this.state.userId, productId: this.state.productId}
      console.log(review)
      this.props.addReview(review);
    }
    handleChange (e) {
      this.setState({[e.target.name] : e.target.value})
    }

    render() {
        const {selectedProduct} = this.props
        if (!selectedProduct.id) {
           return 'Loading the product...'
        }

        return (
            selectedProduct.id &&
        <div>
            <div className="single-product">
                <h1>Name: {selectedProduct.name}</h1>
                <img src={selectedProduct.imageURL} />
                <p>Description: {selectedProduct.description}</p>
                <h2>Price: {selectedProduct.price}</h2>
                <AddToCart selectedProduct={selectedProduct} />
            </div>
            <div>
              <Review state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} reviews={this.props.reviews} productId={selectedProduct.id}/>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedProduct: state.productsReducer.selectedProduct,
    reviews: state.review.reviews,
    userId: state.user.id
})

const mapDispatchToProps = dispatch => ({
    getAProduct: (id) => dispatch(fetchAProduct(id)),
    getReviews: (productId) => dispatch(fetchReviews(productId)),
    addReview: (review) => dispatch(postReview(review))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
