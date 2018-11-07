import React from 'react'
import { Link } from 'react-router-dom'


const Product = ({ user, product, admin, removeProduct }) => {
  return (
    <div className="product-small">
      <Link to={admin ? `/admin/products/${product.id}` : `/products/${product.id}`}>
        <img className="product-image" src={product.imageURL} />
        <h2 className="product-name">{product.name}</h2>
        <p className="product-price">${product.price}</p>
        {product.stock ? <p className="in-stock">In Stock</p> : <p className="out-of-stock">Out Of Stock</p>}
      </Link>
      {admin || user.userType === "admin" ? <button type="button" onClick={() => {
        removeProduct(product.id)
      }}>Delete</button> : null}

    </div>

  )
}
//
export default Product


//category, name, description, price, stock, imageURL
