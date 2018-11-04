import React from 'react'
import {connect} from 'react-redux'

class EditUserForm extends React.Component {
    constructor () {
        super()
        this.state = {
            showForm: false
        }

        this.handleClick = this.handleClick.bind(this)
    }

    handleClick () {
        console.log('hello')
        this.setState({
            showForm: true
        })
    }

    render () {
        const {user} = this.props

        return (
            <div> 
                 <button type="submit" onClick={() => this.handleClick()}>Edit Account Information</button>
                {
                    this.state.showForm
                    ? <AddressForm />
                    : <ul>
                        <h4>Email: {user.email}</h4>
                        <h4>Name: {user.firstName} {user.lastName}</h4>
                        <h4>Address: {user.address} {user.city} {user.country} {user.zipCode}</h4>
                        <h4>Phone Number: {user.phoneNumber}</h4>
                    </ul>
                }
            </div>
        )
    }
}

const mapStateToProps = state => ({
    user: state.user
})

export default connect(mapStateToProps)(EditUserForm)