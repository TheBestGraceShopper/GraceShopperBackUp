import React from 'react'
import {connect} from 'react-redux'
import {fetchAProduct} from '../../store'
import Review from './Review'

class SingleProduct extends React.Component {
    componentDidMount() {
      this.props.getAProduct(this.props.match.params.productId)
    }

    render() {
        const {selectedProduct} = this.props

        if (!selectedProduct.id) {
           return 'Loading the product...'
        }

        return (
            selectedProduct.id &&
        <div>
            <div className="single-product">
                <h1>Name: {selectedProduct.name}</h1>
                <img src={selectedProduct.imageURL} />
                <p>Description: {selectedProduct.description}</p>
                <h2>Price: {selectedProduct.price}</h2>
            </div>
            <div>
              <Review productId={selectedProduct.id}/>
            </div>
        </div>
        )
    }
}

const mapStateToProps = state => ({
    selectedProduct: state.productsReducer.selectedProduct
})

const mapDispatchToProps = dispatch => ({
    getAProduct: (id) => dispatch(fetchAProduct(id))
})

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)
