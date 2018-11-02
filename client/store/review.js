import axios from 'axios'

// ACTION TYPES
const GET_REVIEWS = "GET_REVIEWS";
const ADD_REVIEW = "ADD_REVIEW";

// ACTION CREATORS
const getReviews = (reviews) => ({
  type: GET_REVIEWS,
  reviews
})
const addReview = (review) => ({
  type: ADD_REVIEW,
  review
})

//THUNKAROOOS
export const fetchReviews = (id) => {
  return async (dispatch) =>  {
    try {
      const {data} = await axios.get(`/api/reviews/${id}`)
      dispatch(getReviews(data));
    }
    catch (err) {
      console.error(err);
    }
  }
}

export const postReview = (review) => {
  return async (dispatch) => {
    try {
    const {data} = await axios.post(`/api/reviews/`, review);
    dispatch(addReview(data));
    }
    catch (err) {
    console.error(err);
    }
  }
}

// INITIAL STATE
const initialState = {reviews: []}

//reducer
const reviewsReducer = (state=initialState, action) => {
  switch (action.type){
    case GET_REVIEWS:
      return {...state, reviews: action.reviews}
    case ADD_REVIEW:
      return {...state, reviews: [...state.reviews, action.review]}
    default:
      return state;
  }
}

export default reviewsReducer;
