import React from 'react'

const NavigationBar = function(props) {
  return (
    <div id='navbar' className='column'>
      <Link to="/products">Shop</Link> <br>
      </br>
      <Link to="/our-story">Our Story</Link> <br>
      </br>
      <Link to="/help">Contact Us!</Link>
    </div>
  )
}

export default NavigationBar;