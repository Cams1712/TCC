import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Home.css'
import Card from './Card'

const Home = () => {
    const dadosHome = React.createRef()

    window.addEventListener('scroll', () => {
        if (window.scrollY > dadosHome.current.offsetHeight) {
            document.querySelector('.header').classList.add('header-scroll')
        } else {
            document.querySelector('.header').classList.remove('header-scroll')
        }
    })
  
    return <div className='home-container'>
        <div className='home-img-container row' ref={dadosHome}>
            <div className='home-img-frase'>
                Frase impactante vai ficar exatamente aqui
            </div>

            <div className='home-saiba-mais'>
                <Link>Saiba Mais</Link>
            </div>
        </div>

        <div className='home-text-container row'>
            <p className='home-text-title col-sm-12 col-12'>Confiabilidade e Segurança â </p>
            <p className='home-text col-sm-12 col-12'>
            </p>
        </div>

        <div className='home-card-container row d-flex justify-content-center'>
            <div className='col-sm-4 col-12  d-flex justify-content-center' style={{margin: '1em 0px !important'}}>
                <Card />
            </div>

            <div className='col-sm-4 col-12 d-flex justify-content-center' style={{ margin: '1em 0px !important' }}>
                <Card />
            </div>

            <div className='col-sm-4 col-12  d-flex justify-content-center' style={{ margin: '1em 0px !important' }}>
                <Card />
            </div>
        </div>
    </div>
}

export default Home