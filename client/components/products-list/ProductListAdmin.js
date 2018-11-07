import React from 'react'
import ProductsList from '../products-list/products-list'

const ProductListAdmin = ({history, user}) => {
  return (
    user.userType === 'admin' ?
    <div>
      <button type="button" onClick={() => history.push('/admin/products/add')}>Add New Product</button>
      <ProductsList />
    </div> : 'Access denied.'
  )
}

export default ProductListAdmin;
