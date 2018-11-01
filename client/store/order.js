import axios from 'axios'

const initialState = {
    cart: []
}

// ACTION TYPES

const GET_CART = 'GET_CART'
const ADD_PRODUCT = 'ADD_PRODUCT'
const REMOVE_PRODUCT = 'REMOVE_PRODUCT'

// ACTION CREATORS

const getCart = cart => ({
    type: GET_CART,
    cart
})

const addProductToCart = productId => ({
    type: ADD_PRODUCT,
    productId
})

const removeProductToCart = productId => ({
    type: REMOVE_PRODUCT,
    productId
})

// THUNKAROOS

export const fetchCart = userId => async dispatch => {
    try {
        const {data} = await axios.get(`/api/cart/${userId}`)
        dispatch(getCart(data))

    } catch(err){
        console.log(err)
    }
}

export const addProduct = (product,userId) => async dispatch => {
    try {
        const response = await axios.post(`/api/cart/${userId}`, product)
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
        await axios.post(`/api/cart/delete/${productId}`)
        const action = removeProductToCart(productId)
        dispatch(action)
    }
    catch (err) {
        console.error(err)
    }
}


// REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
      case GET_CART:
        return {...state, cart: action.cart}
      case ADD_PRODUCT:
        return {...state, cart: [...state.cart, action.product]}
      case REMOVE_PRODUCT:
        return {...state, cart: [...state.cart.filter(product => product.id !== action.productId)]}
      default:
        return state
    }

}

