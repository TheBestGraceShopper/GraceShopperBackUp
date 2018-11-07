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
      <div className="history-div">
        <div className="history-div-inner">
          <h2 className="status-title margin-left">ORDER HISTORY</h2>
          <div>
            {this.state.orderHistory.map(order => (
              <div className="each-order" key={order.id}>
                <h3 className="status margin-left">STATUS {order.status}</h3>
                <Order order={order} />
              </div>
            ))}
          </div>
        </div>
      </div>)
  }
}
const mapStateToProps = (state) => ({
  userId: state.user.id
});

export default connect(mapStateToProps)(OrderHistory);

