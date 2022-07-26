import React from 'react'
import '../Css/Header.css'
import { AiOutlineMenu } from 'react-icons/ai'

const Header = () => {
   return <header className='header row'>
        <div className='logo col-sm-3 col-5'>
           <p>AIR BRAKES</p>
        </div>

       <div className='links col-sm-9 col-7'>
           <div className='router'>
               
            </div>

           <div className='responsive'>
               <AiOutlineMenu size={30} style={{ cursor: 'pointer', userSelect: 'none' }} />
            </div>
        </div>
    </header>
}

export default Header