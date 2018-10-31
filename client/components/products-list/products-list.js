import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import SearchBar from './search-bar'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/product'


class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      filterTitle: 'All Products',
      products: [],
      searchProducts: []
    }
    this.handleChange = this.handleChange.bind(this);
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

      const searchOnChange = (searchVal) => {
        filteredProducts = searchFilter(searchVal, this.state.products);
        this.setState({searchProducts: filteredProducts})
        this.searchTitle(searchVal);
      }

    return (
      <div>
        <FilterBar handleChange={this.handleChange} />
        <SearchBar searchOnChange={searchOnChange} />
        <h2>{this.state.filterTitle}</h2>
        <div id="outer-products-div">
          <div className="products">
    {this.state.searchProducts.length ? this.state.searchProducts.map(product => <Product key={product.id} product={product} />) : filteredProducts.map(product => <Product key={product.id} product={product} /> )}
          </div>
        </div>
      </div>
    )
  }
  handleChange(whatToFilter) {
    this.setState({filterTitle: filterTitle(whatToFilter) })
  }
  searchTitle(searchVal) {
    this.setState({filterTitle: `Search Results For: ${searchVal}` })
  }
}

function filterTitle(whatToFilter) {
  if (whatToFilter === 'all') return 'All Products'
  else if (whatToFilter === 'charcuterie boards') return 'All Charcuterie Boards'
  else if (whatToFilter === 'cheeses') return 'All Cheeses'
  else if (whatToFilter === 'meats') return 'All Meats'
  else return 'All Extras'
}

function searchFilter(searchVal, products) {
  const productSearchMatch = (searchVal, product) => {
    const searchLowerCase = searchVal.toLowerCase();
    const productArr = product.description.toLowerCase().split(' ').concat(product.name.toLowerCase().split(" ")).concat(product.category.split(" "));
    if (productArr.includes(searchLowerCase)) return true;
    for (let i=0; i<productArr.length; i++) {
      if (productArr[i].toLowerCase().indexOf(searchLowerCase) > -1) {
        return true;
      }
    }
    return false;
  }
  return [...products].filter(product => productSearchMatch(searchVal, product));
}


const mapStateToProps = (state) => {
  return {products: state.productsReducer.products}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
