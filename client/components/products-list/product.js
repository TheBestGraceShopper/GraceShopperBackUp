import React from 'react'
import {Link} from 'react-router-dom'

const Product = ({product}) => {
  return (
    <div className="product-small">
      <img className="product-image" src={product.imageURL} />
      <Link to={`/products/${product.id}`}><h2 className="product-name">{product.name}</h2></Link>
      <p>${product.price}</p>
      {product.stock ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out Of Stock</p>}
    </div>
  )
}

export default Product


//category, name, description, price, stock, imageURL
