import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'

import '../Css/NavBar.css'

const NavBar = ({ event }) => {
    return <header className='header-container row'>
        <div className='header-logo col-sm-3 col-4'>
            <Link to='/'>AIR BRAKES</Link>
        </div>

        <div className='header-link col-sm-9 col-8'>
            <div className='link'>
                <Link to='/contato'>TESTE APENAS</Link>
            </div>

            <div className='header-responsivo'>
                <AiOutlineMenu size={25} onClick={event} />
            </div>
        </div>
    </header>
}

export default NavBar