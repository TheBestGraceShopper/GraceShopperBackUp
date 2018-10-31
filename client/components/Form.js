import React from 'react'

export default class Form extends React.Component {
    constructor () {
        super()
        this.state = {
            category: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            imageURL: ''
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange (e) {
        [e.target.name] = e.target.value
    }

    handleSubmit (e) {
        e.preventDefault();
        this.setState({
            category: '',
            name: '',
            description: '',
            price: '',
            stock: '',
            imageURL: ''
        })
    }

    render () {
        return (
            <div>
                <form id="form" onSubmit={this.handleSubmit}>
                    <div>
                        <label htmlFor="category">Category:</label>
                        <input
                            type="text"
                            name="category"
                            onChange={this.handleChange}
                            value={this.state.category}
                        />
                    </div>

                    <div>
                        <label htmlFor="name">Name:</label>
                        <input
                            type="text"
                            name="name"
                            onChange={this.handleChange}
                            value={this.state.name}
                        />
                    </div>

                    <div>
                        <label htmlFor="description">Description:</label>
                        <input
                            type="text"
                            name="description"
                            onChange={this.handleChange}
                            value={this.state.description}
                        />
                    </div>

                    <div>
                        <label htmlFor="price">Price:</label>
                        <input
                            type="text"
                            name="price"
                            onChange={this.handleChange}
                            value={this.state.price}
                        />
                    </div>

                    <div>
                        <label htmlFor="stock">Stock:</label>
                        <input
                            type="text"
                            name="stock"
                            onChange={this.handleChange}
                            value={this.state.stock}
                        />
                    </div>

                    <div>
                        <label htmlFor="imageURL">ImageURL:</label>
                        <input
                            type="text"
                            name="imageURL"
                            onChange={this.handleChange}
                            value={this.state.imageURL}
                        />
                    </div>
                </form>
            </div>
        )
    }
}