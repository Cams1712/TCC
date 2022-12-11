import React from 'react';
import CFs from '../assets/css/CadFuncionario.module.css';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import { Col, Row } from 'react-bootstrap';
import { SwitchComponent } from '../components/radix/Switch';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/Firebase';
import { Loading } from '../components/Loading';
import { EditContext } from '../hooks/useEditContext';

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
    disabled: true,
  },
  {
    id: 'senha',
    label: 'Senha',
    type: 'password',
  },
];

export default function EditFuncionario() {
  const { editarDadosFuncionario } = React.useContext(EditContext);

  const [data, setData] = React.useState(null);
  const { id } = useParams();

  // Buscando dados do funcionário no Firebase
  React.useEffect(() => {
    async function fetchData() {
      // Select no Firebase
      const funcionarioCollection = query(
        collection(db, 'Funcionarios'),
        where('Credencial', '==', id),
      );

      const getFuncionario = await getDocs(funcionarioCollection);
      getFuncionario.docs.map((data) => {
        setData({
          nome: data.data().Nome,
          email: data.data().Email,
          credencial: data.data().Credencial,
          senha: data.data().Senha,
          foto: data.data().Foto,
          administrador: data.data().Administrador,
          status: data.data().Status,
        });
      });
    }

    fetchData();
  }, [id]);

  // onChange input Event
  function handleChange({ target }) {
    const { value, id } = target;
    setData({ ...data, [id]: value });
  }

  // Captura as imagens do input e transforma para base64
  function handleFile({ target }) {
    if (target.files.length > 0) {
      let file = target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        return setData({ ...data, foto: reader.result });
      };
    }
  }

  // Envia os dados para o Firebase
  function handleSubmit(e) {
    e.preventDefault();
    editarDadosFuncionario(data);
  }

  if (data === null)
    return (
      <div className={CFs.Loading}>
        <Loading width="58px" height="58px" />
      </div>
    );
  else
    return (
      <div className={CFs.Container}>
        <Row className={CFs.Title}>
          <h3>Editar dados</h3>
          <form onSubmit={handleSubmit}>
            <div className={CFs.Painel}>
              <Row>
                <div>
                  <p className={CFs.Info}>Dados do funcionário</p>
                </div>

                <Col md={6}>
                  {inputField.map(({ id, label, type, disabled }, index) => (
                    <Row key={index}>
                      <div className={CFs.Inputs}>
                        <Input
                          label={label}
                          id={id}
                          type={type}
                          value={data[id]}
                          event={handleChange}
                          disabled={disabled}
                        />
                      </div>
                    </Row>
                  ))}
                </Col>
                <Col md={6}>
                  <div className={CFs.Profile}>
                    <p>Foto de Perfil</p>
                    <div className={CFs.Img}>
                      <img src={data.foto} alt="profile" />
                    </div>
                    <Input
                      type="file"
                      id="foto"
                      label="Editar foto de perfil"
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
                            setData({ ...data, administrador: bool })
                          }
                          checked={data.administrador}
                        />

                        <SwitchComponent
                          label="Status na empresa"
                          id="status"
                          event={(bool) => setData({ ...data, status: bool })}
                          checked={data.status}
                        />
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
            <div className={CFs.Submit}>
              <Button value="Atualizar dados" />
            </div>
          </form>
        </Row>
      </div>
    );
}
