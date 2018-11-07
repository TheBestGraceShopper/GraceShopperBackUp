import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
// import ImageCarousel from './ImageCarousel';

/**
 * COMPONENT
 */
export const UserHome = props => {
  const {email} = props

  return (
    <div className="home-page">
      <h1 className="home-page-title">Welcome, {email}</h1>
      <img className="home-image" src="https://image.ibb.co/ftLjLA/Charcuterie-Board.png" />
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
