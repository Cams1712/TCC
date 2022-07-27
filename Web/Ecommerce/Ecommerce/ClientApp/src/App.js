import React from 'react'
import { Route } from 'react-router'
import Contato from './Components/Contato'
import Home from './Components/Home'
import NavBar from './Components/NavBar'
import Responsivo from './Components/Responsivo'
import './Css/App.css'

const App = () => {
    const [active, setActive] = React.useState(false)

    function handleClick() {
        setActive(!active)
    }

    return (
        <>
            <Route exact path='/' element={App} />
            <Route path='/contato' element={Contato} />
            <NavBar event={handleClick} />
            {active && <Responsivo />}
            {/* <Home /> */}
        </>
    )
}

export default App