import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';


class CartButton extends Component {
  render() {
    // const cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')).length : 0;
    const cartItems = this.props.state.order.cart.length
    console.log('What are you?', this.props.state)
    return (
      <div id="shopping-cart" >
        <Link to="/cart">
          <img id="shopping-cart-image" src="https://image.ibb.co/e0KLJL/shopping-cart.png" alt="shopping-cart" />
          <p className="cart-number">{cartItems}</p>
        </Link> {/* currently directs to home, but will change to direct to cart*/}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  state
})

export default connect(mapStateToProps)(CartButton);
