import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import SearchBar from './search-bar'
import { connect } from 'react-redux'
import { fetchProducts, filterProducts } from '../../store/product'


class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      filterTitle: 'All Products',
      products: [],
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this);
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
      // this.setState({products: filteredProducts});

    return (
      <div>
        <FilterBar handleChange={this.handleChange} />
        <SearchBar searchOnChange={this.searchOnChange} />
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
  searchOnChange(searchVal) {
    const products = this.state.products;
    this.setState({products: searchFilter(searchVal, products), filterTitle: searchTitle(searchVal)});
  }
}

function filterTitle(whatToFilter) {
  if (whatToFilter === 'all') return 'All Products'
  else if (whatToFilter === 'charcuterie boards') return 'All Charcuterie Boards'
  else if (whatToFilter === 'cheeses') return 'All Cheeses'
  else if (whatToFilter === 'meats') return 'All Meats'
  else return 'All Extras'
}

function searchFilter(searchVal,products) {
  const productSearchMatch = (searchVal, product) => {
    const searchLowerCase = searchVal.toLowerCase();
    const productArr = product.description.toLowerCase().split(' ').concat(product.name.toLowerCase().split(" ")).concat(product.category.split(" "));
    if (productArr.includes(searchLowerCase)) return true;
    for (let i=0; i<productArr.length; i++) {
      if (productArr[i].toLowerCase().indexOf(searchLowerCase) > -1) return true;
    }
    return false;
  }
  return products.slice().filter(product => productSearchMatch(searchVal, product));
}

function searchTitle(searchVal) {
  return `Search Results For: ${searchVal}`
}
const mapStateToProps = (state) => {
  return {products: state.productsReducer.products}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts())
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
