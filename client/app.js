import React from 'react'

import {NavigationBar, NavBar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div className="main-container">
      {/* <NavigationBar /> */}
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
