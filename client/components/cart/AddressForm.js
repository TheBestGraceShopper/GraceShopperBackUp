import React from 'react'

export default class AddressForm extends React.Component {
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
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <h1>Contact Information</h1>
                    <label htmlFor='email'>Email: </label>
                    <input
                        type='text'
                        name='email'
                        onChange={this.handleChange}
                        value={this.state.email}
                        placeholder='E-mail'
                    />

                    <h1>Shipping Information</h1>
                    <label htmlFor='firstName'>First Name: </label>
                    <input
                        type='text'
                        name='firstName'
                        onChange={this.handleChange}
                        value={this.state.firstName}
                        placeholder='First Name'
                    />

                    <label htmlFor='lastName'>Last Name: </label>
                    <input
                        type='text'
                        name='lastName'
                        onChange={this.handleChange}
                        value={this.state.lastName}
                        placeholder='Last Name'
                    />

                    <label htmlFor='address'>Address: </label>
                    <input
                        type='text'
                        name='address'
                        onChange={this.handleChange}
                        value={this.state.address}
                        placeholder='Address'
                    />

                    <label htmlFor='firstName'>City: </label>
                    <input
                        type='text'
                        name='city'
                        onChange={this.handleChange}
                        value={this.state.city}
                        placeholder='City'
                    />

                    <label htmlFor='country'>Country: </label>
                    <input
                        type='text'
                        name='country'
                        onChange={this.handleChange}
                        value={this.state.country}
                        placeholder='Country'
                    />

                    <label htmlFor='zipCode'>Zip Code: </label>
                    <input
                        type='text'
                        name='zipCode'
                        onChange={this.handleChange}
                        value={this.state.zipCode}
                        placeholder='Zip Code'
                    />

                    <label htmlFor='phoneNumber'>Phone Number: </label>
                    <input
                        type='text'
                        name='phoneNumber'
                        onChange={this.handleChange}
                        value={this.state.phoneNumber}
                        placeholder='Phone Number'
                    />

                    <button type='submit' disabled={!this.state}>Continue To Payment</button>
                </form>
            </div>
        )
    }
}

// firstname, lastname, address, city, country, zip code, phone number