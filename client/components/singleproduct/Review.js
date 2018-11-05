import React from 'react'
import {connect} from 'react-redux'
import { fetchReviews, postReview} from '../../store'

class Review extends React.Component {
 constructor() {
   super();
   this.state = {
     showForm: false
   }
   this.showForm = this.showForm.bind(this);
 }
 showForm() {
   const currentState = this.state.showForm;
   this.setState({showForm : !currentState});
 }
 render() {

   return (
   <div>
     <h3> Reviews: </h3>
     {this.state.showForm ? <button onClick={this.showForm}> Add Review </button> : null }
     { this.state.showForm ? <div>
       <form onSubmit={this.props.handleSubmit}>

       <label htmlFor='rating'> Rating:  </label>
           <input type ='text' name='rating' onChange={this.props.handleChange} value={this.props.state.rating}/>
           <label htmlFor='title'> Review Title:  </label>
           <input type ='text' name='title' onChange={this.props.handleChange} value={this.props.state.title}/>
           <label htmlFor='text'> Review:  </label>
           <input type ='text' name='text' onChange={this.props.handleChange} value={this.props.state.text}/>

           <button type="submit"> Submit Review</button>
       </form>
     </div>  : null }
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
