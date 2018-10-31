import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/product'


class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      filterTitle: 'All Products',
      products: [],
    }
    this.handleChange = this.handleChange.bind(this)
  }

  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({
      products: this.props.products
    })
  }

  render() {
      let filteredProducts = this.state.products;
      if (this.state.filterTitle === 'All Products') filteredProducts = this.state.products
      else if (this.state.filterTitle === 'All Charcuterie Boards') filteredProducts = this.state.products.filter(product => product.category === 'charcuterie board')
      else if (this.state.filterTitle === 'All Cheeses') filteredProducts = this.state.products.filter(product => product.category === 'cheese')
      else if (this.state.filterTitle === 'All Meats') filteredProducts = this.state.products.filter(product => product.category === 'meat')
      else filteredProducts = this.state.products.filter(product => product.category === 'extras')

    return (
      <div>
        <FilterBar handleChange={this.handleChange} />
        <h1>{this.state.filterTitle}</h1>
        <div id="outer-products-div">
          <div className="products">
            {filteredProducts.map(product => {
              return <Product key={product.id} product={product} />
            })}
          </div>
        </div>
      </div>
    )
  }
  handleChange(whatToFilter) {
    this.setState({filterTitle: filterTitle(whatToFilter) })
  }
}


function filterTitle(whatToFilter) {
  if (whatToFilter === 'all') return 'All Products'
  else if (whatToFilter === 'charcuterie boards') return 'All Charcuterie Boards'
  else if (whatToFilter === 'cheeses') return 'All Cheeses'
  else if (whatToFilter === 'meats') return 'All Meats'
  else return 'All Extras'
}

const mapStateToProps = (state) => {
  return {products: state.productsReducer.products}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
