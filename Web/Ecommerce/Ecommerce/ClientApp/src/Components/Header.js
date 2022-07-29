import React from 'react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from 'react-icons/ai'
import '../Css/Header.css'

const Header = () => {
    return <header className='header row'>
        <div className='header-logo col-sm-3 col-4'>
            <Link to='/'>
                <p>ÂNCORA</p>
            </Link>
        </div>

        <div className='header-links col-sm-9 col-8'>
            <Link to='/login' className='header-link'>Login</Link>

            <span className='header-divider'></span>
            <Link className='header-link header-contato'>Fale conosco</Link>
        </div>

        <div className='header-responsive'>
            <AiOutlineMenu size={25} />
        </div>
    </header>
}

export default Header
