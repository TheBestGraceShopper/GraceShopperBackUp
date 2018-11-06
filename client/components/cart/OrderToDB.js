import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'
import { findUser } from '../../store/user'

const fillOrder = () => {

  //get orderId from db & add 1 for new orderId
  // async function getNextOrderId() {
  //   let id = await axios.get('/api/order/lastOrder');
  //   return id + 1;
  // }

  //const nextOrderId = getNextOrderId();

  //status is default

  //get userId from store
  // const getUserId = async() => {
  //   const userId = await findUser();
  //   console.log('==========userId', userId);
  // }

  //const userId = getUserId();

 let user  = JSON.parse(localStorage.getItem('lsid'));
 console.log('==========userId', user);

  //productsList comes from Local Storage & gets filtered to be productId & total
  let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  cartItems = itemWithAmount(cartItems);
  let cartItemNames = Object.keys(cartItems);

  cartItemNames.map(async productName => {

    const data = { totalPrice: cartItems[productName].price * cartItems[productName].count, userId, }

    const order = await axios.post(`/api/order/add`, data);

    const productData = {productId: cartItems[productName].id, productQuantity: cartItems[productName].count, orderId: order.id};

    await axios.post(`/api/order/add_product_order`, productData)

  });
}

function itemWithAmount(items) {
  const uniqueWithCount = {}
  items.forEach(item => {
    if (!uniqueWithCount[item.name]) {
      uniqueWithCount[item.name] = item;
      uniqueWithCount[item.name].count = 1
    } else {
      uniqueWithCount[item.name].count++
    }
  })
  return uniqueWithCount;
}

export default fillOrder;

//export to cartPage?
