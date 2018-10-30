import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'


// INITIAL STATE
const productsState = {
    products: [],
    selectedProduct: {name: '', price: '', description: '', imageURL: ''}
}

// ACTION CREATORS
const getProducts = (products) => ({
    type: GET_PRODUCTS,
    products
})

const getOneProduct = (product) => ({
    type: GET_ONE_PRODUCT,
    product
})

//THUNKAROOOS
export const fetchProducts = () => {
    return async (dispatch) => {
        const {data} = await axios.get('./api/products')
        dispatch(getProducts(data))
    }
}


export const fetchAProduct = (category) => {
    return async (dispatch) => {
        const {data} = await axios.get(`./api/products/${category}`)
        dispatch(getOneProduct(data))
    }
}

// REDUCERS
const productsReducer = (state = productsState, action) => {
    switch (action.type){
        case GET_PRODUCTS:
          return {...state, products: action.products}

        case GET_ONE_PRODUCT:
          return{...state, selectedProduct: action.product}

        default:
          return state
    }
}

export default productsReducer
