import React from 'react'
import AddressForm from './AddressForm'
import {me} from '../../store/user';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

class CheckoutForm extends React.Component {
    constructor () {
        super()
        this.state = {
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            zipCode: '',
            phoneNumber: ''
        }

        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    async componentDidMount () {
      if (this.props.user.id) {
        await this.props.getUser(this.props.user.id)
      }
      this.setState({
        email: this.props.user.email,
        firstName: this.props.user.firstName,
        lastName: this.props.user.lastName,
        address: this.props.user.address,
        city: this.props.user.city,
        country: this.props.user.country,
        zipCode: this.props.user.zipCode,
        phoneNumber: this.props.user.phoneNumber
      })
    }

    handleChange (e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit (e) {
        e.preventDefault();
        this.setState({
            email: '',
            firstName: '',
            lastName: '',
            address: '',
            city: '',
            country: '',
            zipCode: '',
            phoneNumber: ''
        })
    }

    render () {
      console.log('state', this.state)
      console.log('user', this.props.user)
      return (
        <div>
          <Link to='/signup'>Create An Account</Link>
          <h3>Already have an account?</h3>
          <Link to='/login'>Login</Link>
          <AddressForm state={this.state} handleChange={this.handleChange} handleSubmit={this.handleSubmit} />
        </div>
      )
    }
  }

const mapStateToProps = state => ({
  user: state.user
})

const mapDispatchToProps = dispatch => ({
  getUser: (userId) => dispatch(me(userId))
})

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutForm)
