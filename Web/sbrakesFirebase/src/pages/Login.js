import React from 'react';
import Ls from '../assets/css/Login.module.css';
import { ComponentContext } from '../hooks/useComponentContext';
import { Col, Row } from 'react-bootstrap';
import Saudacao from '../Saudacao';
import Input from '../components/forms/Input';
import { LoginContext } from '../hooks/useLoginContext';
import { Navigate } from 'react-router-dom';
import { ModalPassword } from '../components/radix/Modal';

const inputField = [
  {
    id: 'credencial',
    type: 'text',
    label: 'Credencial',
  },
  {
    id: 'senha',
    type: 'password',
    label: 'Senha',
  },
];

export default function Login() {
  const { setDisplay } = React.useContext(ComponentContext);
  const { error, validacaoLogin, local } = React.useContext(LoginContext);

  const [login, setLogin] = React.useState({
    credencial: '',
    senha: '',
  });

  React.useEffect(() => {
    setDisplay(true);
  }, [setDisplay]);

  function handleChange({ target }) {
    const { id, value } = target;
    setLogin({ ...login, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    validacaoLogin(login.credencial, login.senha);
  }

  return (
    <div className={Ls.Container}>
      <div className={Ls.Login}>
        <Row>
          <Col>
            <form className={Ls.Form} onSubmit={handleSubmit}>
              <div className={Ls.Title}>
                <h3>{Saudacao()}!</h3>
                <p>Faça login para continuar</p>
              </div>
              <div className={Ls.Inputs}>
                {inputField.map((input, index) => (
                  <div className={Ls.Input} key={index}>
                    <Input
                      id={input.id}
                      label={input.label}
                      type={input.type}
                      value={login[input.id]}
                      event={handleChange}
                    />
                  </div>
                ))}

                <div className={Ls.Input}>
                  <Input
                    type="submit"
                    id="btn-enviar"
                    value="Entrar"
                    classe={Ls.Button}
                  />
                  <p className={Ls.Esqueceu}>
                    <ModalPassword
                      btnText="Esqueceu sua senha?"
                      title="Esqueceu sua senha"
                      description="Digite sua credencial. Enviaremos um email para o email cadastrado. Verifique sua caixa de entrada"
                    />
                  </p>
                </div>
              </div>
              <p className={Ls.Error}>{error}</p>
            </form>
          </Col>
          <Col>
            <div className={Ls.ImgLogin}></div>
          </Col>
        </Row>
        {local && <Navigate to="/dashboard" />}
      </div>
    </div>
  );
}
