import React from 'react';
import SMenuSuperior from '../components/dashboard/MenuSuperior.module.css';
import { Outlet } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { MenuLateral } from '../components/dashboard/MenuLateral';
import { MenuSuperior } from '../components/dashboard/MenuSuperior';
import { Loading } from '../components/Loading';
import { ComponentContext } from '../hooks/useComponentContext';

export default function Dashboard() {
  const [localS, setLocalS] = React.useState(null);
  const { setDisplay } = React.useContext(ComponentContext);

  React.useEffect(() => {
    setLocalS(JSON.parse(localStorage.getItem('dadosUsuario')));
    setDisplay(true);
  }, [setDisplay]);

  if (localS === null) {
    return (
      <div className={SMenuSuperior.BackgroundLoading}>
        <Loading width="58px" height="58px" />
      </div>
    );
  }
  return (
    <div className="animate__animated  animate__fadeIn">
      <Row>
        <MenuLateral usuarioConectado={localS.credencial} />
        <Col md={10} className={SMenuSuperior.Outlet}>
          <MenuSuperior dados={localS} />
          <Outlet />
        </Col>
      </Row>
    </div>
  );
}
