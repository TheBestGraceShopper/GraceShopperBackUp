import React from 'react'
import axios from 'axios'
import StripeCheckout from 'react-stripe-checkout'
import history from '../../history'
import {connect} from 'react-redux'
import { me } from '../../store/user'
import { updateQuantity } from '../../store/'

const StripeForm = (props) => {

    const name = props.name;
    const description = props.description;
    const amount = props.amount;
    const STRIPE_PUBLISHABLE =
    process.env.NODE_ENV === 'production'
      ? 'pk_test_a41tEZdwchhwkDi9HhH0pc9D'
      : 'pk_test_a41tEZdwchhwkDi9HhH0pc9D'

    const currency = 'USD'
    const monetize = num => Number(num) * 100

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

    const successfulPayment = async () => {
        //cart from store
        let cartItems = JSON.parse(localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
        cartItems = itemWithAmount(cartItems);
        let cartItemNames = Object.keys(cartItems);
        //finding total products
        let total = 0
        cartItemNames.map( (productName) =>  {
          total += (cartItems[productName].price * cartItems[productName].count)
        });
        //posting to order table for all
        const data = { totalPrice: total, userId: props.user.id }
        const order = await axios.post(`/api/order/add`, data);
        //posting to order-product table for each product
        cartItemNames.map(async productName => {
        const productData = {productId: cartItems[productName].id, productQuantity: cartItems[productName].count, orderId: order.data.id};
        await axios.post(`/api/order/add_product_order`, productData);
        });
        //Decrementing Product Quantity in db
        cartItemNames.map(async (item) => {
          let newStock = cartItems[item].stock - cartItems[item].count
          const productId = cartItems[item].id
          if (newStock < 0) {
              console.log(`${cartItems[item].name} under stock ${newStock}`)
              newStock = 0;
          }
          await props.updateProduct(productId, {stock: newStock});
        });

    }

    // const failedPayment = data => {
    //     alert('You cannot enjoy your meats and cheeses just yet. Do you have enough money? Maybe check out www.monster.com')
    // }

    const withToken = (amount, description) => token =>
      axios.post('/api/stripe', {
        description,
        source: token.id,
        currency,
        amount: monetize(amount)
      })
      .then(successfulPayment())
      .then(window.localStorage.clear())
      .then(history.push('/confirmation'))
      .catch(failedPayment)

      return (
        <StripeCheckout
          name={name}
          description={description}
          amount={monetize(amount)}
          token={withToken(amount, description)}
          currency={currency}
          stripeKey={STRIPE_PUBLISHABLE}
        />
      );
  }

const mapState = state => ({
  user: state.user
})

const mapDispatch = dispatch => ({
  getUser: () => dispatch(me()),
  updateProduct: (id, updates) => dispatch(updateQuantity(id, updates))
})

export default connect(mapState, mapDispatch)(StripeForm);

