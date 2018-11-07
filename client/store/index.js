import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import productsReducer from './product'
import ordersReducer from './order'
import review from './review'

const reducer = combineReducers({user, productsReducer, ordersReducer, review})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware)
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './product'
export * from './order'
export * from './review'
