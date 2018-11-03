import React, {Component} from 'react'

class AddToCart extends Component {


    render(){
        return (
            <button type='button' onClick={() => this.props.addToCart(this.props.selectedProduct)}>
            Add To Cart
            </button>
        )
    }

}

export default AddToCart;
