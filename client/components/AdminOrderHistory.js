import React from 'react'
import Order from './Order'
import {connect} from 'react-redux'
import {fetchOrders, updateStatus } from '../store'

class AdminOrderHistory extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this)
  }
  componentDidMount() {
    this.props.getOrders();
  }
  handleChange(val, id) {
    this.props.sendStatus(val, id);
  }
  render() {
    return (
      <div>
        <h2>ORDERS</h2>
        {
          this.props.orders.map(order => {
            return (
              <div key={order.id}>
                <p>Order Status:</p>
                <select onChange={(e) => this.handleChange(e.target.value, order.id)}>
                  <option disabled selected value={null}>{order.status}</option>
                  <option value="processing">processing</option>
                  <option value="created">created</option>
                  <option value="completed">completed</option>
                  <option value="cancelled">cancelled</option>
                </select>
                <Order order={order}/>
              </div>
            )
          })
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  orders: state.ordersReducer.orders
})

const mapDispatchToProps = dispatch => ({
  getOrders: () => dispatch(fetchOrders()),
  sendStatus: (val,id) => dispatch(updateStatus(val, id))
})

export default connect(mapStateToProps, mapDispatchToProps)(AdminOrderHistory);
