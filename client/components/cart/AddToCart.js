import React, {Component} from 'react'

class AddToCart extends Component {


    render(){
        return (
            <button type='button' onClick={() => this.props.addToCart(this.props.selectedProduct, this.props.quantity)}>
            Add To Cart
            </button>
        )
    }

}

export default AddToCart;
