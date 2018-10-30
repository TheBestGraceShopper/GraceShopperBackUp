import React from 'react'

const Product = ({product}) => {
  return (
    <div className="product-small">
      <img className="product-image" src={product.imageURL} />
      <h2 className="product-name">{product.name}</h2>
      <p>${product.price}</p>
      {product.stock ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out Of Stock</p>}
    </div>
  )
}

export default Product


//category, name, description, price, stock, imageURL
