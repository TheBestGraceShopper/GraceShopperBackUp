import axios from 'axios'

const initialState = {
    cart: [
        { id: '',
          quantity: ''
        }
    ],
    prevOrder: [],
    totalQ: 0
}

// ACTION TYPES

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const INCREASE_QUANTITY = 'INCREASE_QUANTITY'
const DECREASE_QUANTITY = 'DECREASE_QUANTITY'
const GET_QUANTITY = 'GET_QUANTITY'
const GET_PREV_ORDER = 'GET_PREV_ORDER'

// ACTION CREATORS

const getCart = cart => ({
    type: GET_CART,
    cart
})

const getQuantity = (quantity) => ({
  type: GET_QUANTITY,
  quantity
})

const addProductToCart = productId => ({
    type: ADD_PRODUCT,
    productId
})

const removeProductToCart = productId => ({
    type: REMOVE_PRODUCT,
    productId
})

const increaseQuantity = () => ({
    type: INCREASE_QUANTITY
})

const decreaseQuantity = (id, val) => ({
    type: DECREASE_QUANTITY,
    id,
    down: val,
})

const getPrevOrder = (orders) => ({
    type: GET_PREV_ORDER,
    orders
})

// THUNKAROOS

export const fetchCart = userId => async dispatch => {
    try {
        const {data} = await axios.get(`/api/order/${userId}`)
        dispatch(getCart(data))

    } catch(err){
        console.log(err)
    }
}

export const addProduct = (product, userId, orderId) => async dispatch => {
    try {
        const response = await axios.post(`/api/order/${userId}`, product, orderId)
        const newProduct = response.data
        const action = addProductToCart(newProduct)
        dispatch(action)
    }
    catch (err) {
        console.error(err)
    }
}

export const deleteProduct = productId => async dispatch => {
    try {
        await axios.post(`/api/order/delete/${productId}`)
        const action = removeProductToCart(productId)
        dispatch(action)
    }
    catch (err) {
        console.error(err)
    }
}

export const addQuantity = (userId, productId) => async dispatch =>{
    try{
        const response = await axios.put(`/api/order/${userId}`, productId)
        const updatedCart = response.data
        const action = increaseQuantity(updatedCart)
        dispatch(action)
    }
    catch (err) {
        console.err(err)
    }
}

export const removeQuantity = (userId, productId) => async dispatch =>{
    try{
        const response = await axios.put(`/api/order/${userId}`, productId)
        const updatedCart = response.data
        const action = decreaseQuantity(updatedCart)
        dispatch(action)
    }
    catch (err) {
        console.err(err)
    }
}

export const fetchOrderHistory = (id) => async dispatch => {
    try {
      const res = await axios.get(`/api/orders/history/${id}`)
      dispatch(getPrevOrder(res.data))
    } catch (err) {
      console.error(err)
    }
  }

export const fetchQuantity = () => dispatch => {
    const count = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0;
    dispatch(getQuantity(count))
}

export const addOne = () => dispatch => {
  console.log("adding");
  dispatch(increaseQuantity());
}




// REDUCER
 const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_CART:
        return {...state, cart: action.cart}
      case ADD_PRODUCT:
        return {...state, cart: [...state.cart, action.product]}
      case REMOVE_PRODUCT:
        return {...state, cart: [...state.cart.filter(product => product.id !== action.productId)]}
      case INCREASE_QUANTITY:
        return {...state, totalQ: state.totalQ + 1}
      case DECREASE_QUANTITY:
        return {...state, cart:[...state.cart.map(item =>{
            if(item.id === action.id){item.quantity -= action.down}
            return item;
        })]}
      case GET_PREV_ORDER:
      return {...state, prevOrders: action.orders}
      case GET_QUANTITY:
        return {...state, totalQ: action.quantity}
      default:
        return state
    }

}

export default ordersReducer;
