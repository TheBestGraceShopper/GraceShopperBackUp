import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import SlideShow from 'react-image-show';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome, {email}</h1>
      {/* <img className="home-image" src="https://image.ibb.co/ftLjLA/Charcuterie-Board.png" /> */}
      <div id="slideshow">
      <SlideShow
      images = {['https://static.vinepair.com/wp-content/uploads/2017/02/board-garlicbread.jpg','https://static.vinepair.com/wp-content/uploads/2017/02/board-eggplant.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-glutenfree.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-sepearte.jpg', 'https://static.vinepair.com/wp-content/uploads/2017/02/board-bloodorange.jpg']}
      width = "100%"
      imagesWidth = "75%"
      imagesHeight= "90%"
      imagesHeightMobile="56vw"
      infinite indicators
    />
    </div>

    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
