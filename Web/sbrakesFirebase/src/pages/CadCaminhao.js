import React from 'react';
import CFs from '../assets/css/CadCaminhao.module.css';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import { Col, Row } from 'react-bootstrap';
import { CadastrarContext } from '../hooks/useCadastrarContext';

const inputField = [
  {
    id: 'placa',
    label: 'Placa',
    type: 'text',
  },
  {
    id: 'modelo',
    label: 'Modelo',
    type: 'text',
  },
  {
    id: 'marca',
    label: 'Marca',
    type: 'text',
  },
  {
    id: 'bluetooth',
    label: 'Bluetooth',
    type: 'text',
  },
];

export default function CadCaminhao() {
  const { validacaoCadastroCaminhao } = React.useContext(CadastrarContext);

  const [cadastro, setCadastro] = React.useState({
    placa: '',
    modelo: '',
    marca: '',
    bluetooth: '',
    funcionario: '',
  });

  function handleChange({ target }) {
    const { value, id } = target;
    setCadastro({ ...cadastro, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    validacaoCadastroCaminhao(cadastro);
  }

  return (
    <div className={CFs.Container}>
      <Row className={CFs.Title}>
        <h3>Cadastrar Caminhão</h3>
        <form onSubmit={handleSubmit}>
          <div className={CFs.Painel}>
            <Row>
              <div>
                <p className={CFs.Info}>Informações básicas</p>
              </div>

              <Col md={6}>
                {inputField.map(({ id, label, type }, index) => (
                  <Row key={index}>
                    <div className={CFs.Inputs}>
                      <Input
                        label={label}
                        id={id}
                        type={type}
                        value={cadastro[id]}
                        event={handleChange}
                      />
                    </div>
                  </Row>
                ))}
              </Col>
            </Row>
          </div>
          <div className={CFs.Submit}>
            <Button value="Cadastrar" />
          </div>
        </form>
      </Row>
    </div>
  );
}
