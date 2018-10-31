import React from 'react'
import Form from './Form'

const CreateProduct = () => {
  const initialState = {
    currentProduct : {category: '',
    name: '',
    description: '',
    price: '',
    stock: '',
    imageURL: ''}
  }

  return (
      <div>
          <h1>Add a New Product</h1>
          <Form initialState={initialState}/>
      </div>
  )
}
export default CreateProduct;
