import axios from 'axios'

// ACTION TYPES
const GET_ORDER = 'GET_ORDER'
// const REMOVE_ORDER = 'REMOVE_ORDER' 

// ACTION CREATORS
const getOrder = order => ({
    type: GET_ORDER,
    order
})

// THUNKAROOS
export const fetchOrder = () => async dispatch => {
    try {
        const {data} = await axios.get('SOME ROUTE STRING HERE')
        dispatch(getOrder(data))
    } catch(err){
        console.log(err)
    }
}


// REDUCER

export default (state = {}, action) => {
    switch (action.type) {
      case GET_ORDER:
        return action.order

      default:
        return state
    }
  }