import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store/product'

const theProducts = [
  { id: 1, category: "charcuterie board", name: "large charcuterie board", description: "this board includes 10 cheeses and 10 meats, and will feed up to 20 people.", price: 150, imageURL: 'https://image.ibb.co/jyrCNf/no-image-avaliable.png', stock: 5340 },
  { id: 2, category: "charcuterie board", name: "small charcuterie board", description: "this board includes 3 cheeses and 3 meats, and will feed up to 6 people.", price: 50, imageURL: 'https://image.ibb.co/cK0E2f/small-charcuterie.png', stock: 324 },
  { id: 3, category: "cheese", name: "smoked gouda", description: "this is 1lb. of smoke gouda cheese", price: 100, imageURL: 'https://image.ibb.co/ecJv8L/smoked-gouda.png', stock: 0 },
  { id: 4, category: "cheese", name: "gouda", description: "this is 1lb. of gouda cheese", price: 100, imageURL: 'https://image.ibb.co/mEmMhf/gouda.png', stock: 234 },
  { id: 5, category: "meat", name: "pepperoni", description: "this is 1lb. of pepperoni", price: 100, imageURL: 'https://image.ibb.co/jyrCNf/no-image-avaliable.png', stock: 2543 }
]

class ProductsListComp extends Component {
  constructor() {
    super()
    this.state = {
      filterTitle: 'All Products',
      products: []
    }
    this.handleChange = this.handleChange.bind(this)
  }

  componentDidMount() {
    // this.setState({ products: theProducts })

    const products = this.props.fetchProducts()
    this.setState({
      products: this.props.products
    })
    console.log('this.props.products', this.props)
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
    this.setState({ products: filter(whatToFilter), filterTitle: filterTitle(whatToFilter) })
  }
}

function filter(whatToFilter) {
  if (whatToFilter === 'all') return theProducts
  else if (whatToFilter === 'charcuterie boards') return (
    theProducts.filter(product => product.category === 'charcuterie board')
  )
  else if (whatToFilter === 'cheeses') return (
    theProducts.filter(product => product.category === 'cheese')
  )
  else if (whatToFilter === 'meats') return (
    theProducts.filter(product => product.category === 'meat')
  )
  else return (
    theProducts.filter(product => product.category === 'extras')
  )
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
