import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter} from 'react-router-dom'
import {fetchOrder} from '../../store/order'
import axios from 'axios'

class Cart extends Component {
    constructor(){
        super()
        this.state = {
            products: []
        }
    }



    componentDidMount(){
        this.props.fetchOrder()
    }
}



const mapStateToProps = state => ({
    cart: state.cart
})

const mapDispatchToProps = dispatch => ({
    fetchOrder: () => dispatch(fetchOrder())
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Cart))
