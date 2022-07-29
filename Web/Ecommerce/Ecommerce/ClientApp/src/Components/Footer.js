import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Footer.css'

const Footer = () => {
    return <footer className='footer row'>
        <div className='footer-container col-md-12'>
            <div className='footer-logo'>
                <Link to='/'>ÂNCORA</Link>
            </div>
            <div className='footer-links'>
                <Link>Dúvidas</Link>
                <Link to='/login'>Acessar sua conta</Link>
                <Link>Redes Sociais</Link>
            </div>
        </div>
    </footer>
}

export default Footer