import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import SearchBar from './search-bar'
import { connect } from 'react-redux'
import { fetchProducts, removeAProduct } from '../../store/product'

class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      // filterTitle: 'All Products',
      products: [],
      searchProducts: [],
      filteredProducts: 'all'
    }
    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    await this.props.fetchProducts();
    this.setState({
      products: this.props.products
    })
  }

  handleChange(whatToFilter) {
    this.setState({filteredProducts: whatToFilter })
  }
  searchTitle(searchVal) {
    this.setState({filteredProducts: `Search Results For: ${searchVal}` })
  }


  render() {

      let filteredProducts = this.state.products;
      switch (this.state.filteredProducts) {
        case 'all':
          filteredProducts = this.state.products
          break;
        default:
        filteredProducts = this.state.products.filter(product => product.category === this.state.filteredProducts)
      }


      const searchOnChange = (searchVal) => {
        filteredProducts = searchFilter(searchVal, this.state.products);
        this.setState({searchProducts: filteredProducts})
        this.searchTitle(searchVal);
      }

    return (

      <div>
        <FilterBar handleChange={this.handleChange} products={this.state.products}/>
        <SearchBar searchOnChange={searchOnChange} />
        <h2>{this.state.filteredProducts}</h2>
        <div id="outer-products-div">
          <div className="products">
    {this.state.searchProducts.length ? this.state.searchProducts.map(product => <Product key={product.id} product={product} />) : filteredProducts.map(product => <Product key={product.id} product={product} admin={this.props.admin} removeProduct={this.props.removeProduct}/> )}
          </div>
        </div>
      </div>
    )
  }
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
  const whatIsThis = [...products].filter(product => productSearchMatch(searchVal, product))
  return whatIsThis ;
}


const mapStateToProps = (state) => {
  return {products: state.productsReducer.products}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  removeProduct: (id) => dispatch(removeAProduct(id))
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
