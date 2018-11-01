import React from 'react'

import {NavigationBar, NavBar, Footer} from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <NavigationBar />
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
