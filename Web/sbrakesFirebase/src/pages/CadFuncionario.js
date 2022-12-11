import React from 'react';
import CFs from '../assets/css/CadFuncionario.module.css';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import { Col, Row } from 'react-bootstrap';
import { CadastrarContext } from '../hooks/useCadastrarContext';
import DefaultImg from '../assets/img/default.png';
import { SwitchComponent } from '../components/radix/Switch';

const inputField = [
  {
    id: 'nome',
    label: 'Nome do funcionário',
    type: 'text',
  },
  {
    id: 'email',
    label: 'Email do funcionário',
    type: 'text',
  },
  {
    id: 'credencial',
    label: 'Credencial',
    type: 'text',
  },
  {
    id: 'senha',
    label: 'Senha',
    type: 'password',
  },
];

export default function CadFuncionario() {
  const { validacaoCadastroFuncionario } = React.useContext(CadastrarContext);

  const [cadastro, setCadastro] = React.useState({
    nome: '',
    email: '',
    credencial: '',
    senha: '',
    adm: false,
    status: false,
    foto: DefaultImg,
  });

  function handleChange({ target }) {
    const { value, id } = target;
    setCadastro({ ...cadastro, [id]: value });
  }

  // Captura as imagens do input e transforma para base64
  function handleFile({ target }) {
    if (target.files.length > 0) {
      let file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return setCadastro({ ...cadastro, foto: reader.result });
      };
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    validacaoCadastroFuncionario(cadastro);
  }

  return (
    <div className={CFs.Container}>
      <Row className={CFs.Title}>
        <h3>Cadastrar Funcionário</h3>
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
              <Col md={6}>
                <div className={CFs.Profile}>
                  <p>Foto de Perfil</p>
                  <div className={CFs.Img}>
                    <img src={cadastro['foto']} alt="profile" />
                  </div>
                  <Input
                    type="file"
                    id="foto"
                    label="Escolher foto de perfil"
                    classe={CFs.None}
                    event={handleFile}
                    accept="image/*"
                  />
                </div>
                <div>
                  <div className={CFs.Permissoes}>
                    <p>Permissões administrativas</p>
                    <div className={CFs.PermissoesInput}>
                      <SwitchComponent
                        label="Administrador"
                        id="adm"
                        event={(bool) =>
                          setCadastro({ ...cadastro, adm: bool })
                        }
                      />

                      <SwitchComponent
                        label="Status na empresa"
                        id="status"
                        event={(bool) =>
                          setCadastro({ ...cadastro, status: bool })
                        }
                      />
                    </div>
                  </div>
                </div>
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
