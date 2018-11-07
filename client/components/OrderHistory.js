import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Order from './Order'


class OrderHistory extends React.Component {
  constructor() {
    super()
    this.state = {
      orderHistory: []
    }
  }

  async componentDidMount() {
    const userId = this.props.userId;
    let { data: orders } = await axios.get(`/api/users/pastOrders/${userId}`);
    this.setState({ orderHistory: orders });
  }

  render() {
    return (
    <div>
        <h2>ORDER HISTORY</h2>
        {this.state.orderHistory.map(order => (
            <div key={order.id}>
              <h3>STATUS {order.status}</h3>
              <Order order={order}/>
            </div>
          ))}

    </div>)

}
}
const mapStateToProps = (state) => ({
  userId: state.user.id
});

export default connect(mapStateToProps)(OrderHistory);

