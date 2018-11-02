import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import SearchBar from './search-bar'
import { connect } from 'react-redux'
import { fetchProducts, removeAProduct } from '../../store/product'
import { addProduct } from '../../store/order'
import { me } from '../../store/user'

class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      products: [],
      searchProducts: [],
      filteredProducts: 'all',
      filtered: []
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

      const searchOnChange = (searchVal) => {
        let filteredProducts = searchFilter(searchVal, this.state.products);
        this.setState({searchProducts: filteredProducts})
        this.searchTitle(searchVal);
      }

    return (

      <div>
        <button type="submit" form="test" value="Submit">Submit</button>
        <FilterBar handleChange={this.handleChange} products={this.state.products}/>
        <SearchBar searchOnChange={searchOnChange} />
        <h2>{this.state.filteredProducts}</h2>
        <div id="outer-products-div">
          <div className="products">
              {this.state.searchProducts.length ? this.state.searchProducts.map(product =>
              <Product key={product.id} history={this.props.history} product={product} admin={this.props.admin} removeProduct={this.props.removeProduct} addProductToCart={this.props.addProduct} userId={this.props.currentUser}/>)
              : (this.state.filteredProducts === 'all' ? this.props.products
              : this.props.products.filter(product => product.category === this.state.filteredProducts)).map(product =>
              <Product key={product.id} history={this.props.history} product={product} admin={this.props.admin} removeProduct={this.props.removeProduct} addProductToCart={this.props.addProduct} userId={this.props.currentUser}/> )}
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
  return {products: state.productsReducer.products,
          currentUser: state.user.id}
}

const mapDispatchToProps = (dispatch) => ({
  fetchProducts: () => dispatch(fetchProducts()),
  removeProduct: (id) => dispatch(removeAProduct(id)),
  addProduct: (product, userId) => dispatch(addProduct(product, userId))
});

const ProductsList = connect(mapStateToProps, mapDispatchToProps)(ProductsListComp)

export default ProductsList
