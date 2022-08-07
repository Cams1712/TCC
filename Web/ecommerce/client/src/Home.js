import React from 'react'
import { Col, Row } from 'react-bootstrap'
import { Container, Desc, Title, Card } from './components/home/HomeStyle'

const DadosCard = [
  {
    titulo: 'Olá Mundo',
    img: '',
  },

  {
    titulo: 'Olá Selva',
    img: ''
  }
]

const Home = () => {
  return <Container>
    <div className='imgBackground'></div>
    <Row>
      <Col md={12} sm={12} className='home-container'>
        <Col md={6} sm={12} className='home-text'>
          <Title>Confiabilidade e Segurança</Title>
          <Desc>Desenvolvimento de um sistema capaz de promover maior segurança a todos. Proteção completa para veículos e seus proprietários nos momentos cruciais de desempenho.</Desc>
        </Col>
      </Col>
    </Row>

    <Row className='card-container'>
      {DadosCard.map(({ titulo, img }, index) => (
        <Col md={6} sm={12} className='col-card' key={index}>
          <Card className='card-item'>
            {titulo}
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
}

export default Home