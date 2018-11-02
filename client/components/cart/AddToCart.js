import React, {Component} from 'react'

class AddToCart extends Component {

    addCart(product){
        let cart = [this.props]
        cart.push(product)
        localStorage.setItem('cart', JSON.stringify(cart))
        this.setState(cart)
    }

    render(){
        return (
            <button type='button' onClick={() => this.addCart(this.props.products)}>
            Add To Cart
            </button>
        )
    }

}

export default AddToCart;
