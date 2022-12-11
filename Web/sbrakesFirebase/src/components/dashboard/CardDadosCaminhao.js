import React from 'react';
import SCardDados from '../../assets/css/CardDados.module.css';
import { ModalExcluir } from '../radix/ModalExcluir';
import { BsThreeDots } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const CardDadosCaminhao = ({
  placa,
  marca,
  modelo,
  bluetooth,
  funcionario,
}) => {
  const handleExcluir = async () => {
    const excluirFuncionario = await deleteDoc(doc(db, 'Caminhoes', placa));

    if (excluirFuncionario === undefined) {
      window.location.reload();
    }
  };

  return (
    <div className={SCardDados.Container}>
      <Row className={SCardDados.CardContainer}>
        <Col md={2}>
          <div className={SCardDados.Dados}>
            <p>{marca}</p>
          </div>
        </Col>
        <Col md={1} className={SCardDados.DadosAl}>
          <p>{placa}</p>
        </Col>
        <Col md={2} className={SCardDados.DadosAl}>
          <p>{modelo}</p>
        </Col>
        <Col md={2} className={SCardDados.DadosAl}>
          <p className={SCardDados.Funcionarios}>
            {funcionario !== '' ? funcionario : 'Nenhum funcionário'}
          </p>
        </Col>

        <Col md={5}>
          <div className={SCardDados.ButtonContainer}>
            <Link to={placa} style={{ color: 'black' }}>
              <CardButton icon={<BsThreeDots size={25} />} />
            </Link>
            <ModalExcluir
              title="Excluir Caminhão"
              description="Deseja realmente excluir este veículo?"
              credencial={placa}
              nome={placa}
              event={handleExcluir}
              Component={
                <div className="btn-open">
                  <CardButton icon={<GrFormClose size={25} />} />
                </div>
              }
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export const CardButton = ({ icon }) => {
  return <div className={SCardDados.Button}>{icon}</div>;
};
