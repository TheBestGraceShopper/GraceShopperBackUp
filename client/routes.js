import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import {me} from './store'
import ProductsList from './components/products-list/products-list'
import SingleProduct from './components/singleproduct/SingleProduct'
import SingleProductAdmin from './components/singleproduct/SingleProductAdmin'
import CreateProduct from './components/CreateProduct'
import EditProduct from './components/EditProduct'
import Cart from './components/cart'
import ProductsListAdmin from './components/products-list/ProductListAdmin'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route exact path='/admin/products/add' component={CreateProduct} />
        <Route path='/admin/products/:productId' component={EditProduct} />
        <Route exact path='/products/:productId' component={SingleProduct} />
        <Route path="/products" render={routeProps => <ProductsList {...routeProps} admin={false} />} />
        <Route path="/admin/products" render={routeProps => <ProductsListAdmin {...routeProps} admin={true} />} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route path="/home" component={UserHome} />
            <Route path='/admin/products/:productId' component={SingleProductAdmin} />
          </Switch>
        )}
        {/* Displays our Login component as a fallback */}
        {/* <Route component={Login} /> */}
        <Route exact path="/cart" component={Cart} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
