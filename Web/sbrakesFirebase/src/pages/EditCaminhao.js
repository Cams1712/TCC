import React from 'react';
import CFs from '../assets/css/CadCaminhao.module.css';
import Button from '../components/forms/Button';
import Input from '../components/forms/Input';
import { Col, Row } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/Firebase';
import { EditContext } from '../hooks/useEditContext';
import { Loading } from '../components/Loading';
import Select from '../components/forms/Select';

const inputField = [
  {
    id: 'placa',
    label: 'Placa',
    type: 'text',
    disabled: true,
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

export default function EditCaminhao() {
  const { editarDadosVeiculos } = React.useContext(EditContext);
  const { id } = useParams();

  const [data, setData] = React.useState(null);
  const [funcionarios, setFuncionarios] = React.useState(null);

  React.useEffect(() => {
    // Buscando dados do caminhão
    async function fetchData() {
      const caminhaoCollection = query(
        collection(db, 'Caminhoes'),
        where('Placa', '==', id),
      );

      const getCaminhao = await getDocs(caminhaoCollection).catch((error) =>
        console.log(error),
      );

      getCaminhao.docs.map((data) => {
        setData({
          placa: data.data().Placa,
          modelo: data.data().Modelo,
          marca: data.data().Marca,
          bluetooth: data.data().Bluetooth,
          funcionario: data.data().Funcionario,
        });
      });

      // Buscando todos os funcionários do sistema que passem no requisito
      // não ser adm e não e seu status na empresa ser "true"
      const funcionariosCollection = query(
        collection(db, 'Funcionarios'),
        where('Administrador', '!=', true),
      );

      const getFuncionario = await getDocs(funcionariosCollection).catch((e) =>
        console.log(e),
      );

      setFuncionarios(getFuncionario.docs);
    }

    fetchData();
  }, []);

  function handleChange({ target }) {
    const { value, id } = target;
    setData({ ...data, [id]: value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    editarDadosVeiculos(data);
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
                  <p className={CFs.Info}>Dados do veículo</p>
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
                  <div className={CFs.Inputs}>
                    {funcionarios !== null ? (
                      <Select
                        event={handleChange}
                        valueDisabled="Selecionar Funcionário"
                        label="Funcionário"
                        id="funcionario"
                        options={funcionarios}
                      />
                    ) : null}
                    <p className={CFs.InfoSelect}>
                      Selecione um funcionário responsável pelo veículo
                      cadastrado. Ele será o proprietário deste caminhão.
                    </p>
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
