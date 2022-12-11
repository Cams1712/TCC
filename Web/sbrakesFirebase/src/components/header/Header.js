import React from 'react';
import Hs from './Header.module.css';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ComponentContext } from '../../hooks/useComponentContext';

// Menu principal do site
export default function Header() {
  const [hamburguer, setHamburguer] = React.useState(false);
  const { display } = React.useContext(ComponentContext);

  // Setar classe Active no Menu Responsivo
  function handleClick() {
    setHamburguer(!hamburguer);
  }

  if (display) return <></>;
  else
    return (
      <header className={Hs.Container}>
        <Row className={Hs.Header}>
          <Col md={1} className={Hs.Menu}>
            <div
              className={`${Hs.MenuHamburguer} ${hamburguer ? Hs.Active : ''}`}
              onClick={handleClick}
            >
              <span className={Hs.Hamburguer}></span>
            </div>
          </Col>
          <Col md={10} className={Hs.Logo}>
            <Link to="/">SBRAKES</Link>
          </Col>
          <Col md={1} className={Hs.Login}>
            <Link to="/login">LOGIN</Link>
          </Col>
        </Row>
        {hamburguer && (
          <ResponsiveMenu
            classe={hamburguer ? Hs.Active : Hs.Disabled}
            setHamburguer={setHamburguer}
          />
        )}
        {hamburguer && <ResponsiveOpacity setHamburguer={setHamburguer} />}
      </header>
    );
}

function ResponsiveMenu({ classe, setHamburguer }) {
  function hideMenu() {
    setHamburguer(false);
  }

  return (
    <div className={`${Hs.MenuResponsivo} ${classe}`}>
      <Link
        to="/contato"
        className={Hs.ResponsiveLinksContainer}
        onClick={hideMenu}
      >
        Contato
      </Link>
      <Link
        to="/duvidas"
        className={Hs.ResponsiveLinksContainer}
        onClick={hideMenu}
      >
        Dúvidas
      </Link>
      <Link
        to="/saiba-mais"
        className={Hs.ResponsiveLinksContainer}
        onClick={hideMenu}
      >
        Saiba mais
      </Link>
      <Link
        to="/login"
        className={Hs.ResponsiveLinksContainer}
        onClick={hideMenu}
      >
        Login
      </Link>
    </div>
  );
}

function ResponsiveOpacity({ setHamburguer }) {
  function hideMenu() {
    setHamburguer(false);
  }
  return <div className={Hs.Opacity} onClick={hideMenu}></div>;
}
