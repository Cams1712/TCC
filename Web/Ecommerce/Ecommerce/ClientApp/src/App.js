import React from 'react'
import { Route } from 'react-router'
import Home from './Components/Home'
import Header from './Components/Header'
import './Css/Global.css'
import Footer from './Components/Footer'
import Login from './Components/Login'

let pathname = window.location.pathname

document.addEventListener('click', (e) => {
    pathname = window.location.pathname
    console.log(pathname)
})

const App = () => {
    const [footer, setFooter] = React.useState(false)

    return (
        <div>
            <Header />
            <Route exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            {footer ? ' ': <Footer />}
        </div>
    )
}

export default App
 
  
