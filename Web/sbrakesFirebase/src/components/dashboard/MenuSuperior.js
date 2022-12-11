import React from 'react';
import SMenuSuperior from './MenuSuperior.module.css';
import { Col, Row } from 'react-bootstrap';
import { AiOutlineMail } from 'react-icons/ai';

export const MenuSuperior = ({ dados }) => {
  const [data, setData] = React.useState(null);

  React.useEffect(() => {
    setData(JSON.parse(localStorage.getItem('dadosUsuario')));
  }, []);

  return (
    <Row className={SMenuSuperior.Menu}>
      <Col md={6}>
        <h1 className={SMenuSuperior.Title}>Dashboard</h1>
        <p>{data !== null ? data.nome : ''}</p>
      </Col>

      <Col
        md={6}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          gap: '1.7rem',
        }}
      >
        <div className={SMenuSuperior.Profile}>
          <div
            className={SMenuSuperior.Messages}
            style={{ cursor: 'not-allowed' }}
            title="Função indisponível"
          >
            <AiOutlineMail size={22} color="black" />
            <p style={{ fontSize: '13px' }}>Comunidade</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            {dados.foto.trim() !== '' ? (
              <img
                src={dados.foto}
                className={SMenuSuperior.Picture}
                alt="foto de perfil"
              />
            ) : (
              <p
                className={SMenuSuperior.Picture}
                style={{ background: '#1c1c1c', color: 'white' }}
              >
                {dados.nome.substring(0, 1)}{' '}
              </p>
            )}
          </div>
        </div>
      </Col>
    </Row>
  );
};
