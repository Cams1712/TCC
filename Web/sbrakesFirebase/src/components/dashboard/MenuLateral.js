import React from 'react';
import MLs from './MenuLateral.module.css';
import { BsGear, BsFillPersonFill } from 'react-icons/bs';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IoMdExit } from 'react-icons/io';
import { LoginContext } from '../../hooks/useLoginContext';

const LinksField = [
  {
    to: 'cad-funcionario',
    text: 'Cadastrar Funcionários',
  },
  {
    to: 'cad-caminhao',
    text: 'Cadastrar Caminhões',
  },
  {
    to: 'lis-funcionario',
    text: 'Lista de Funcionários',
  },

  {
    to: 'lis-caminhao',
    text: 'Lista de Caminhões',
  },
];

export const MenuLateral = ({ usuarioConectado }) => {
  const { Logout } = React.useContext(LoginContext);

  React.useEffect(() => {
    console.log(usuarioConectado);
  });

  return (
    <Col md={2} className={MLs.MenuContainer}>
      <div className={MLs.Menu}>
        <Row>
          <div className={MLs.Logo}>
            <Link to="/">SBRAKES</Link>
          </div>
        </Row>
        <div className={MLs.Search}>
          <input type="text" placeholder="Pesquisar" />
        </div>
        <Row>
          <div className={MLs.Actions}>
            <Row>
              <p>Menu</p>
            </Row>
            <Row className={MLs.LinksContainer}>
              {LinksField.map(({ to, text, icon }, index) => (
                <div key={index} className={MLs.Links}>
                  <Link to={to}>
                    {icon}
                    {text}
                  </Link>
                </div>
              ))}
            </Row>
          </div>
        </Row>
        <Row>
          <div className={MLs.Profile}>
            <Row>
              <p>Perfil</p>
            </Row>
            <Row>
              <div
                className={MLs.LinksContainer}
                style={{ flexDirection: 'column' }}
              >
                <div className={MLs.Links}>
                  <Link
                    to={`perfil/${usuarioConectado}`}
                    style={{ display: 'flex', gap: '1rem' }}
                  >
                    <BsFillPersonFill size={20} />
                    Seu Perfil
                  </Link>
                </div>
                <div className={MLs.Links}>
                  <Link
                    style={{
                      display: 'flex',
                      gap: '1rem',
                      cursor: 'not-allowed',
                    }}
                    title="Função indisponível"
                  >
                    <BsGear size={20} />
                    Configurações
                  </Link>
                </div>
              </div>
            </Row>
          </div>
        </Row>
        <Row className={MLs.Sair}>
          <div className={MLs.LinksSair} onClick={Logout}>
            <Row>
              <p className={MLs.Logout}>
                {<IoMdExit size={20} />}
                Sair
              </p>
            </Row>
          </div>
        </Row>
      </div>
    </Col>
  );
};
