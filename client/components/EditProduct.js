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
    async componentDidMount() {
      await this.props.getAProduct(this.props.match.params.productId);
      this.setState({currentProduct: this.props.selectedProduct})
      console.log("state", this.state);
      console.log(this.props.selectedProduct);
    }
    render () {
        return (
            <div>
                <h1>Update Product: </h1>
                <Form />
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
