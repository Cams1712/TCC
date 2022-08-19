import React from 'react'
import { Link } from 'react-router-dom'
import '../css/Home.css'
import Circle from './Circle'
import Head from './Head'

const Home = () => {
    return <>
    <Head title='Home' />
        <section className='home-container'>
            <div className="home-bg container-fluid">
                <div className='home-bg-txt'>
                    <h1>Sua segurança em boas mãos</h1>
                    <p>Garantindo a proteção de seus funcionários nos momentos de maior perigo</p>
                    <div className='home-contato'>
                        <Link to='/' className='home-contato-item'>Fale conosco</Link>
                    </div>
                </div>
            </div>

            <div className='home-circle-content'>
                <h1>Lorem ipsum dolor sit amet</h1>
                <div className='home-circle'>
                   <Circle estilo='home-circle-item' />
                   <Circle estilo='home-circle-item' />
                   <Circle estilo='home-circle-item' />
                </div>
            </div>
        </section>
    </>
}

export default Home