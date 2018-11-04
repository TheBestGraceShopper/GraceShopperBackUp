import React from 'react'
import { connect } from 'react-redux';

class Account extends React.Component {
  render () {
    return (
    <h1> Account Information </h1>
  )
  }
}
export default connect(null)(Account)
