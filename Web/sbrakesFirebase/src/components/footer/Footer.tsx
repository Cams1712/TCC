import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { ComponentContext } from '../../hooks/useComponentContext';
import Fs from './Footer.module.css';

export default function Footer() {
  const { display } = React.useContext(ComponentContext);

  if (display) return <></>;
  else
    return (
      <footer className={Fs.Container}>
        <Row className={Fs.Footer}>
          <Col md={4}>
            <div className={Fs.FooterLogo}>
              <Link to="/">SBRAKES</Link>
            </div>
          </Col>
          <Col md={8}>
            <div className={Fs.FooterLinks}>
              <Link to="/">Contato</Link>
              <Link to="/">Dúvidas</Link>
              <Link to="/login">Login</Link>
            </div>
          </Col>
        </Row>
      </footer>
    );
}
