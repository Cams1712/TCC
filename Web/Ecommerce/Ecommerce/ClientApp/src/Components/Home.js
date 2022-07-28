import React from 'react'
import { Link } from 'react-router-dom'
import '../Css/Home.css'
import Card from './Card'

const Home = () => {
    return <div className='home-container'>
        <div className='home-img-container row'>
            <div className='home-img-frase'>
                Frase impactante vai ficar exatamente aqui
            </div>

            <div className='home-saiba-mais'>
                <Link>Saiba Mais</Link>
            </div>
        </div>

        <div className='home-text-container row'>
            <p className='home-text-title col-sm-12 col-12'>Confiabilidade e Segurança</p>
            <p className='home-text col-sm-12 col-12'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reprehenderit expedita at, necessitatibus error ipsum nam ipsam repudiandae perferendis quae facilis, laborum possimus soluta sequi quisquam ut ducimus dolorem aut beatae quia iusto harum! Nostrum quasi dolorem quaerat ab assumenda repudiandae obcaecati, alias vel id itaque dolores voluptates impedit repellat. Dicta?
            </p>
        </div>

        <div className='home-card-container row d-flex justify-content-center'>
            <div className='col-lg-6 col-12  d-flex justify-content-center' style={{ margin: '1em 0px !important' }}>
                <Card />
            </div>

            <div className='col-lg-6 col-12  d-flex justify-content-center' style={{ margin: '1em 0px !important' }}>
                <Card />
            </div>
        </div>
    </div>
}

export default Home