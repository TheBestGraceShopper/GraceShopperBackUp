import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux'

const FillOrder = (props) => {

  //get orderId from db & add 1 for new orderId
  // async function getNextOrderId() {
  //   let id = await axios.get('/api/order/lastOrder');
  //   return id + 1;
  // }

  const nextOrderId = getNextOrderId();

  //status is default

  //get userId from store
  console.log(props.userId);
  const userId = props.userId

  //productsList comes from Local Storage & gets filtered to be productId & total
  let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
  cartItems = itemWithAmount(cartItems);
  let cartItemNames = Object.keys(cartItems);

  cartItemNames.map(async productName => {

    const data = { totalPrice: cartItems[productName].price * cartItems[productName].count, userId, }

    //const productData = {productId: cartItems[productName].id, productQuantity: cartItems[productName].count};

    await axios.post(`/api/order/${cartItems[productName].id}/${cartItems[productName].count}`, data);

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


export default FillOrder;

//export to cartPage?
