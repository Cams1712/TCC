import React from 'react';
import { Col, Row } from 'react-bootstrap';
import Ss from '../assets/css/Smais.module.css';
import { ComponentContext } from '../hooks/useComponentContext';

export default function Smais() {
  const { setDisplay } = React.useContext(ComponentContext);

  React.useEffect(() => {
    setDisplay(false);
  }, [setDisplay]);

  return (
    <div className={Ss.Container}>
      <h1 className={Ss.Title}>Empresa</h1>
      <Row className={Ss.Cards}>
        <Col sm={6} className={Ss.Card}>
          <Row className={Ss.CardTitle}>Quem somos?</Row>
          <Row className={Ss.CardDescription}>
            Recente empresa no ramo de tecnologia e automação que auxilia na
            segurança dos seus funcionários e veículos. Elaboramos um sistema
            que, ao ser implementado nos caminhões, será possível ter um maior
            controle em situações de perigo.
          </Row>
        </Col>

        <Col sm={6} className={Ss.Card}>
          <Row className={Ss.CardTitle}>Missão</Row>
          <Row className={Ss.CardDescription}>
            Desenvolver um sistema capaz de trazer maior segurança aos
            motoristas de caminhões no Brasil e no mundo, evitando acidentes que
            comprometam a integridade das pessoas. Garantindo sempre um bom
            desempenho de nossos sistemas para que você possa ter uma boa
            viagem.
          </Row>
        </Col>

        <Col sm={6} className={Ss.Card}>
          <Row className={Ss.CardTitle}>Visão</Row>
          <Row className={Ss.CardDescription}>
            Ser a maior empresa brasileira que atua no setor automobilístico
            garantindo a segurança dos cidadãos, qualidade de serviço e que
            nossos resultados sejam consequência da expansão de nossos negócios
            paras as mais regiões do planeta.
          </Row>
        </Col>

        <Col sm={6} className={Ss.Card}>
          <Row className={Ss.CardTitle}>Valores</Row>
          <Row className={Ss.CardDescription}>
            A energia que nos move está pautada em inovação, qualidade,
            responsabilidade e, principalmente, a paixão ao prestar serviços que
            colaboram com a sociedade.
          </Row>
        </Col>
      </Row>
    </div>
  );
}
