import axios from 'axios'

// ACTION TYPES
const GET_PRODUCTS = 'GET_PRODUCTS'
const GET_ONE_PRODUCT = 'GET_ONE_PRODUCT'
const FILTER_PRODUCT = 'FILTER_PRODUCT'

// INITIAL STATE
const productsState = {
    products: [],
    filteredProducts: [],
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

const filterProducts = (filteredProducts) => ({
    type: FILTER_PRODUCT,
    filteredProducts
})

//THUNKAROOOS
export const fetchProducts = () => {
    return async (dispatch) => {
        const {data} = await axios.get('/api/products')
        dispatch(getProducts(data))
    }
}


export const filterProduct = (category) => {
    return async (dispatch) => {
        const {data} = await axios.get(`./api/products/${category}`)
        dispatch(filterProducts(data))
    }
}

export const fetchAProduct = (id) => {
    return async (dispatch) => {
        const {data} = await axios.get(`./api/products/${id}`)
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

        case FILTER_PRODUCT:
          return {...state, filteredProducts: action.filteredProducts}

        default:
          return state
    }
}

export default productsReducer
