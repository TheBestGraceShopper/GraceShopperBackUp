import React from 'react'

import {NavigationBar} from './components'
import {NavBar} from './components'
import {Footer }from './components'
import Routes from './routes'

const App = () => {
  return (
    <div>
      {/* <NavigationBar /> */}
      <NavBar />
      <Routes />
      <Footer />
    </div>
  )
}

export default App
