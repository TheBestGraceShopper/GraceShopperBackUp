import React from 'react'

const Form = props => {
    return (
        <div>
            <form id="form" onSubmit={props.handleSubmit}>
                <div>
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        name="category"
                        onChange={props.handleChange}
                        value={props.state.category}
                    />
                </div>

                <div>
                    <label htmlFor="name">Name:</label>
                    <input
                        type="text"
                        name="name"
                        onChange={props.handleChange}
                        value={props.state.name}
                    />
                </div>

                <div>
                    <label htmlFor="description">Description:</label>
                    <input
                        type="text"
                        name="description"
                        onChange={props.handleChange}
                        value={props.state.description}
                    />
                </div>

                <div>
                    <label htmlFor="price">Price:</label>
                    <input
                        type="text"
                        name="price"
                        onChange={props.handleChange}
                        value={props.state.price}
                    />
                </div>

                <div>
                    <label htmlFor="stock">Stock:</label>
                    <input
                        type="text"
                        name="stock"
                        onChange={props.handleChange}
                        value={props.state.stock}
                    />
                </div>

                <div>
                    <label htmlFor="imageURL">ImageURL:</label>
                    <input
                        type="text"
                        name="imageURL"
                        onChange={props.handleChange}
                        value={props.state.imageURL}
                    />
                </div>

                <div>
                    <button type="submit" className="submitButton">Submit</button>
                </div>
            </form>
        </div>
    )
}

export default Form;
