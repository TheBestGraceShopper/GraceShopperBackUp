// import React, { Component } from 'react';
// import axios from 'axios';
// import { connect } from 'react-redux'
// import { me } from '../../store/user'
// import {mapCartItems} from '../../store/order'

// class OrderToDB extends React.Component {

// async componentDidMount () {
// await this.props.getUser();

//       let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
//       cartItems = itemWithAmount(cartItems);
//       let cartItemNames = Object.keys(cartItems);

//         cartItemNames.map(async productName => {

//         const data = { totalPrice: cartItems[productName].price * cartItems[productName].count, userId: this.props.user.id }

//         const order = await axios.post(`/api/order/add`, data);
//         console.log("order", order)
//         const productData = {productId: cartItems[productName].id, productQuantity: cartItems[productName].count, orderId: order.data.id};

//         await axios.post(`/api/order/add_product_order`, productData)

//       });
//   }

//   render () {
//     return (<p> Thankyou for your purchase </p>)
//   }

// }

// function itemWithAmount(items) {
//  const uniqueWithCount = {}
//  items.forEach(item => {
//    if (!uniqueWithCount[item.name]) {
//      uniqueWithCount[item.name] = item;
//      uniqueWithCount[item.name].count = 1
//    } else {
//      uniqueWithCount[item.name].count++
//    }
//  })
//  return uniqueWithCount;
// }


// const mapState = state => ({
//   user: state.user
// })
// const mapDispatch = dispatch => ({
//   getUser: () => dispatch(me())
// })

// export default connect(mapState, mapDispatch)(OrderToDB);
