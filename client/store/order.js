import axios from 'axios'
import { ToastMessage } from "react-toastr";

const initialState = {
    cart: [],
    orders: [{
      status: ''
    }]
}

// ACTION TYPES

const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'
const GET_ORDERS = 'GET_ORDERS'
const UPDATE_STATUS = 'UPDATE_STATUS'

// ACTION CREATORS

const addProductToCart = productId => ({
    type: ADD_PRODUCT,
    productId
})

const removeProductToCart = productId => ({
    type: REMOVE_PRODUCT,
    productId
})

const getOrders = (orders) => ({
    type: GET_ORDERS,
    orders
})

const editStatus = (status, orderId) => ({
  type: UPDATE_STATUS,
  status,
  orderId
})

// THUNKAROOS

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

export const updateStatus = (orderStatus, orderId) => async dispatch => {
  try {
    await axios.put(`/api/order/${orderId}`, {status: orderStatus})
    const action = editStatus(orderStatus, orderId)
    dispatch(action)
  }
  catch (err) {
    console.error(err)
  }
}

export const fetchOrders = () => async dispatch => {
    try {
      const res = await axios.get('/api/order/pastOrders')
      dispatch(getOrders(res.data))
    }
    catch (err) {
      console.error(err)
    }
}

// REDUCER
 const ordersReducer = (state = initialState, action) => {
    switch (action.type) {
      case ADD_PRODUCT:
        return {...state, cart: [...state.cart, action.product]}
      case REMOVE_PRODUCT:
        return {...state, cart: [...state.cart.filter(product => product.id !== action.productId)]}
      case GET_ORDERS:
        return {...state, orders: action.orders}
      case UPDATE_STATUS:
        const orders = [...state.order].map(order => {
          if (order.id === action.orderId) {
            order.status = action.status
          }
        });
        return {...state, orders: orders}
      default:
        return state
    }

}

export default ordersReducer;
