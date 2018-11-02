import React from 'react'
import {connect} from 'react-redux'
import { fetchReviews, postReview} from '../../store'

class Review extends React.Component {
  constructor() {
    super();
    this.state = {
      text: '',
      rating: '',
      reviews: [],
      productId: '',
      userId: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentDidMount() {
    this.props.getReviews(this.props.productId);
    this.setState({userId: this.props.userId, productId: this.props.productId})
  }
  handleSubmit (e) {
    e.preventDefault(e);
    const review = {text: this.state.text, rating: Number(this.state.rating), userId: this.state.userId, productId: this.state.userId}
    this.props.addReview(review);
  }
  handleChange (e) {
    this.setState({[e.target.name] : e.target.value})
  }
  render() {
    console.log(this.props.reviews)
    return (
    <div>
      <h3> Reviews: </h3>
      <button> Add Review </button>
      <form onSubmit={this.handleSubmit}>

      <label htmlFor='rating'> Rating:  </label>
          <input type ='text' name='rating' onChange={this.handleChange} value={this.state.rating}/>
          <label htmlFor='text'> Review:  </label>
          <input type ='text' name='text' onChange={this.handleChange} value={this.state.text}/>

          <button type="submit"> Submit Review</button>
      </form>
      {this.props.reviews.map(review => (
          <div key={review.id}>
            <p> {review.rating}</p>
            <p> {review.text}</p>
          </div>
      ))}
    </div>
    )
  }
}

const mapState = state => {
  return ({
    reviews: state.review.reviews,
    userId: state.user.id
  })
}
const mapDispatch = dispatch => {
  return ({
    getReviews: (productId) => dispatch(fetchReviews(productId)),
    addReview: (review) => dispatch(postReview(review)),
  })
}

export default connect(mapState, mapDispatch)(Review);
