import React from 'react'
import Form from './Form'
import {connect} from 'react-redux'
import {fetchAProduct} from '../store'

class EditProduct extends React.Component {
    constructor () {
      super();
      this.state = {
        currentProduct: {}
      }
    }
    componentDidMount() {
      this.props.getAProduct(this.props.match.params.productId);
    }
    render () {
      const currentProduct = this.props.selectedProduct;
        return (
            <div>
                <h1>Update Product: </h1>
                <Form state={this.state.currentProduct} />
            </div>
        )
    }
}

const mapStateToProps = state => {
  return ({
  selectedProduct: state.productsReducer.selectedProduct
})
}

const mapDispatchToProps = dispatch => ({
  getAProduct: (id) => dispatch(fetchAProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(EditProduct);
