import React from 'react'
import {connect} from 'react-redux'
import { fetchReviews, postReview} from '../../store'

class Review extends React.Component {

  render() {

    return (
    <div>
      <h3> Reviews: </h3>
      <button> Add Review </button>
      <form onSubmit={this.props.handleSubmit}>

      <label htmlFor='rating'> Rating:  </label>
          <input type ='text' name='rating' onChange={this.props.handleChange} value={this.props.state.rating}/>
          <label htmlFor='title'> Review Title:  </label>
          <input type ='text' name='title' onChange={this.props.handleChange} value={this.props.state.title}/>
          <label htmlFor='text'> Review:  </label>
          <input type ='text' name='text' onChange={this.props.handleChange} value={this.props.state.text}/>

          <button type="submit"> Submit Review</button>
      </form>
      {this.props.reviews.map(review => (
          <div key={review.id}>
            <p> {review.rating}</p>
            <p> {review.title}</p>
            <p> {review.text}</p>
          </div>
      ))}
    </div>
    )
  }
}


export default Review;
