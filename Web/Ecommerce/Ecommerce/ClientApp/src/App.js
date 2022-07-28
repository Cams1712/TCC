import React from 'react'
import { Route } from 'react-router'
import Home from './Components/Home'
import Header from './Components/Header'
import './Css/Global.css'
import Footer from './Components/Footer'

const App = () => {
    return (
        <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Footer />
        </div>
    )
}

export default App
 
  
