import React from 'react'
import { Route } from 'react-router'
import Home from './Components/Home'
import Header from './Components/Header'
import './Css/Global.css'
import Footer from './Components/Footer'
import Login from './Components/Login'

const App = () => {
    return (
        <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Footer />
        </div>
    )
}

export default App
 
  
