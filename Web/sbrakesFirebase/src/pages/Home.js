import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Hos from '../assets/css/Home.module.css';
import Button from '../components/forms/Button';
import { ComponentContext } from '../hooks/useComponentContext';

const cardField = [
  {
    title: 'Responsável',
    text: 'Responsabilidade para atuar na segurança dos veículos e de seus funcionários na empresa. Atuando no setor automobilístico para facilitar a administração da sua corporação.',
  },
  {
    title: 'Seguro',
    text: 'Sistema que permite o monitoramento da frota de veículos e dos funcionários de sua empresa. Nosso objetivo é previnir acidentes e fazer o trânsito brasileiro mais seguro.',
  },
  {
    title: 'Confiável',
    text: 'Garantimos às empresas que nosso sistema é confiável. Estamos sempre realizando revisões periódicas para o aperfeiçoamento do nosso sistema.',
  },
];

export default function Home() {
  const { setDisplay } = React.useContext(ComponentContext);

  React.useEffect(() => {
    setDisplay(false);
  }, []);

  return (
    <div className={Hos.Container}>
      <Row className={Hos.Content}>
        <Col md={6}>
          <Row className={Hos.Title}>
            <h1>Garantindo uma viagem mais segura</h1>
          </Row>
          <Row className={Hos.SubTitle}>
            <p>
              <span className={Hos.Color}>Sistemas inteligentes</span> para{' '}
              <span className={Hos.Color}>proteção</span> dos seus funcionários
              e veículos. <span className={Hos.Color}>Resultados</span>{' '}
              positivos em um curto período.
            </p>
          </Row>
          <Row className={Hos.Buttons}>
            <Col md={6}>
              <Button
                path="/login"
                value="Começar"
                bool
                classe={Hos.ButtonFi}
              />
            </Col>

            <Col md={6}>
              <Button
                path="/saiba-mais"
                value="Saiba mais"
                bool
                classe={Hos.ButtonSe}
              />
            </Col>
          </Row>
        </Col>
        <Col md={6} className={Hos.BackgroundContent}>
          <Row className={Hos.Background}></Row>
        </Col>
      </Row>

      <Row className={Hos.CardContainer}>
        {cardField.map((card, index) => (
          <Col key={index}>
            <div className={Hos.Card}>
              <div className={Hos.CardTitle}>
                <h3>{card.title}</h3>
              </div>
              <div className={Hos.CardBody}>
                <p>{card.text}</p>
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
}
