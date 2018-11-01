import React, {Component} from 'react'

class AddToCart extends Component {

    addToCart(product){
        let cart = this.props.cart
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState(cart)
    }

    render(){
        return (
            <button type='button' onClick={() => this.addToCart(this.props.prodcuts)}>
            Add To Cart
            </button>
        )
    }

}

export default AddToCart;