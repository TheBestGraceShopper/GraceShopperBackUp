import React from 'react'
import { Link } from 'react-router-dom'
console.log('test')

const Product = ({ product, admin, removeProduct, addProductToCart, userId, history }) => {
  return (
    <div className="product-small">
      <Link to={admin ? `/admin/products/${product.id}` : `/products/${product.id}`}>
        <img className="product-image" src={product.imageURL} />
        <h2 className="product-name">{product.name}</h2>
        <p>${product.price}</p>
        {product.stock ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out Of Stock</p>}
      </Link>
      <button type="button" onClick={() => {
        removeProduct(product.id)
      }}>Delete</button>
      <button type="button" onClick={() => addProductToCart(product, userId)}>Add To Cart</button>
    </div>

  )
}
//
export default Product


//category, name, description, price, stock, imageURL
