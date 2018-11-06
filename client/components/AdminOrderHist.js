import React from 'react'
import axios from 'axios'
import Order from './Order'


class OrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }

  async componentDidMount() {
    let { data: orders } = await axios.get(`/api/orders/pastOrders/`);
    this.setState({ orderHistory: orders });
  }

  render() {
    return (
      <div>
        <h2>PAST ORDERS</h2>
        {this.state.orderHistory.map(order => <Order key={order.id} order={order}/>)}
      </div>
    )
  }
}

export default OrderHistory;
