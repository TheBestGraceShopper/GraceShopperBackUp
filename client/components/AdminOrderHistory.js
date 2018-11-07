import React from 'react'
import Order from './Order'
import {connect} from 'react-redux'
import {fetchOrders} from '../store'

class AdminOrderHistory extends React.Component {

  componentDidMount() {
    this.props.getOrders();
  }

  render() {
    return (
      <div>
        <h2>PAST ORDERS</h2>
        {
          this.props.orders.map(order => <Order key={order.id} order={order}/>)
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchOrders())
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory);
