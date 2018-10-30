import React, { Component } from 'react'
import Product from './product'
import FilterBar from './filter-bar'
import SearchBar from './search-bar'

const theProducts = [
  { id: 1, category: "charcuterie board", name: "large charcuterie board", description: "this board includes 10 cheeses and 10 meats, and will feed up to 20 people.", price: 150, imageURL: 'https://image.ibb.co/jyrCNf/no-image-avaliable.png', stock: 5340 },
  { id: 2, category: "charcuterie board", name: "small charcuterie board", description: "this board includes 3 cheeses and 3 meats, and will feed up to 6 people.", price: 50, imageURL: 'https://image.ibb.co/cK0E2f/small-charcuterie.png', stock: 324 },
  { id: 3, category: "cheese", name: "smoked gouda", description: "this is 1lb. of smoke gouda cheese", price: 100, imageURL: 'https://image.ibb.co/ecJv8L/smoked-gouda.png', stock: 0 },
  { id: 4, category: "cheese", name: "gouda", description: "this is 1lb. of gouda cheese", price: 100, imageURL: 'https://image.ibb.co/mEmMhf/gouda.png', stock: 234 },
  { id: 5, category: "meat", name: "pepperoni", description: "this is 1lb. of pepperoni", price: 100, imageURL: 'https://image.ibb.co/jyrCNf/no-image-avaliable.png', stock: 2543 }
]

export default class ProductsList extends Component {
  constructor() {
    super()
    this.state = {
      filterTitle: 'All Products',
      products: []
    }
    this.handleChange = this.handleChange.bind(this);
    this.searchOnChange = this.searchOnChange.bind(this)
  }

  componentDidMount() {
    console.log("PRODCTS", theProducts)
    this.setState({ products: theProducts })
  }

  render() {
    console.log("STATE", this.state)
    return (
      <div>
        <FilterBar handleChange={this.handleChange} />
        <SearchBar searchOnChange={this.searchOnChange} />
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
    console.log('whatToFilter', whatToFilter)
    this.setState({ products: filter(whatToFilter), filterTitle: filterTitle(whatToFilter) })
  }
  searchOnChange(searchVal) {
    console.log("searchVal:", searchVal);
    searchFilter(searchVal);
    //this.setState({products: searchFilter(searchVal), filterTitle: searchTitle(searchVal)})
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

function searchFilter(searchVal) {
  const productSearchMatch = (searchVal, product) => {
    const productArr = product.description.toLowerCase().split(' ').concat(product.name.toLowerCase().split(" ")).concat(product.category.split(" "));
    console.log(searchVal.toLowerCase());
    //return searchVal.toLowerCase() ? true : false;
  }
  theProducts.map(product => productSearchMatch(searchVal, product))
}

function searchTitle(searchVal) {
  return `Search Results For: ${searchVal}`
}

