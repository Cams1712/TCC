import React from "react"
import './css/App.css'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom'
import { CreateGlobalStyle, Logo, Menu, Responsivo } from "./components/header/HeaderStyle";
import { Col } from 'react-bootstrap'
import { AiOutlineMenu } from 'react-icons/ai'
import Home from "./Home"


function App() {
  const [ativo, setAtivo] = React.useState(false)

  function handleClick(e) {
    if (e.target.classList.contains('app-link-res')) {
      setAtivo(false)
    } else {
      setAtivo(!ativo)
    }
  }

  return <BrowserRouter>
    <CreateGlobalStyle />

    <Menu className="row">
      <Col sm={3} xs={3}>
        <Logo>
          <Link to='/' className="app-logo">ÂNCORA</Link>
        </Logo>
      </Col>

      <Col sm={9} xs={9} className='d-flex justify-content-end align-items-center' id='app-links-container' style={{ gap: '1rem' }}>
        <Link to='/' className="app-link">Empresa</Link>
        <Link to='/' className="app-link">Contato</Link>
        <Link to='/' className="app-link">Dúvidas</Link>
        <Link to='/' className='app-login app-link'>Login</Link>

        <AiOutlineMenu size={25} onClick={handleClick} className='app-responsive' style={{ cursor: 'pointer' }} />
      </Col>
    </Menu>

    {ativo &&
          <Responsivo className="app-responsive-item" >
            <Link to='/' className="app-link-res" onClick={handleClick} >Empresa</Link>
            <Link to='/' className="app-link-res" onClick={handleClick}>Contato</Link>
            <Link to='/' className="app-link-res" onClick={handleClick}>Dúvidas</Link>
            <Link to='/' className="app-link-res res-login" onClick={handleClick}>Login</Link>
          </Responsivo>}

    <Routes>
      <Route path='/' element={<Home />} />
    </Routes>
  </BrowserRouter>
}

export default App;
