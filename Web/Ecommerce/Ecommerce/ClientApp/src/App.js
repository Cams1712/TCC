import React from 'react'
import { Route } from 'react-router'
import Home from './Components/Home'
import Header from './Components/Header'
import './Css/Global.css'

const App = () => {
    return (
        <div>
            <Header />
            <Route exact path='/' component={Home} />
        </div>
    )
}

export default App
 
  
