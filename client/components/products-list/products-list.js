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
      products: []
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
    return (
      <div>
        <FilterBar handleChange={this.handleChange} />
        <h1>{this.state.filterTitle}</h1>
        <div id="outer-products-div">
          <div className="products">
            {this.state.products.map(product => {
              return <Product key={product.id} product={product} />
            })}
          </div>
        </div>
      </div>
    )
  }
  handleChange(whatToFilter) {
    this.setState({ products: this.filterProducts(whatToFilter), filterTitle: filterTitle(whatToFilter) })
  }

  filterProducts(whatToFilter) {
    if (whatToFilter === 'all') return this.state.products;
    else if (whatToFilter === 'charcuterie boards') return (
      this.state.products.filter(product => product.category === 'charcuterie board')
    )
    else if (whatToFilter === 'cheeses') return (
      this.state.products.filter(product => product.category === 'cheese')
    )
    else if (whatToFilter === 'meats') return (
      this.state.products.filter(product => product.category === 'meat')
    )
    else return (
      this.state.products.filter(product => product.category === 'extras')
    )
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
  console.log("STATE!!!!!:", state)
  return {products: state.productsReducer.products}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
