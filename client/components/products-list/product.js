import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product }) => {
  return (
    <Link to={`/products/${product.id}`}>
      <div className="product-small">
        <img className="product-image" src={product.imageURL} />
        <h2 className="product-name">{product.name}</h2>
        <p>${product.price}</p>
        {product.stock ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out Of Stock</p>}
      </div>
    </Link>
  )
}

export default Product


//category, name, description, price, stock, imageURL
