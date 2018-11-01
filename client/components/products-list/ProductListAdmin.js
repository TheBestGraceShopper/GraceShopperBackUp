import React from 'react'
import ProductsList from '../products-list/products-list'

const ProductListAdmin = ({history, admin}) => {
  return (
    <div>
      <button type="button" onClick={() => history.push('/admin/products/add')}>Add New Product</button>
      <ProductsList admin={admin} />
    </div>
  )
}

export default ProductListAdmin;
