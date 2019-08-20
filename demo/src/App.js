
import React, { Component } from 'react'
import Preloader from '../../src/components/Preloader'

class App extends Component {
  render () {
    return (
      <div>
        <Preloader className='loader'/>
      </div>
    )
  }
}

export default App