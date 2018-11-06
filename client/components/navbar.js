import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'
import CartButton from './CartButton'

const Navbar = ({ handleClick, isLoggedIn, user }) => {
  return (

    <div id="banner">
      <div className="banner-div">
        <div className="logo-and-title-div">
          <img className="group-logo" src="https://preview.ibb.co/bUndOL/abcs-logo.png/" alt="ABCS logo" />
          <h1 className="main-title">Let it Brie</h1>
        </div>
        <div className="cart-link">
        <CartButton />
      </div>
      </div>

      <div id="nav-text">
        <div id="navbar">
          <div className="nav-links">
            {user.userType === 'admin' ? <Link to="/admin/products/">Products</Link> : <Link to="/products/" className="nav-text">Shop</Link>}
            <br />
            <Link to="/our-story" className="nav-text">Our Story</Link>
            <br />
            <Link to="/contact-us" className="nav-text">Contact Us!</Link>
          </div>

        </div>
        <nav className='login-nav'>
          {isLoggedIn ? (
            <div>
              <Link to="/home" className="nav-text">Home</Link>
              <Link to="/account" className="nav-text">Account</Link>
              <a href="#" onClick={handleClick} className="nav-text">
                Logout
          </a>
            </div>
          ) : (
              <div className="login-signup-div">
                {/* The navbar will show these links before you log in */}

                <Link to="/login" className="nav-text">Login</Link>
                <p id="nav-text-line">|</p>
                <Link to="/signup" className="nav-text">Sign Up</Link>
              </div>
            )}

        </nav>
      </div>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}


