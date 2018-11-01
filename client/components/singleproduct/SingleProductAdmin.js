import React from 'react'
import SingleProduct from './SingleProduct'
import EditProduct from '../EditProduct'

export default class SingleProductAdmin extends React.Component {
    render() {
        return (
            <div>
                <button>Edit</button>
                <SingleProduct />
                <EditProduct />
            </div>
        )
    }
}
