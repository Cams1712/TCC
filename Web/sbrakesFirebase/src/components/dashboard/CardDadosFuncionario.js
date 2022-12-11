import React from 'react';
import SCardDados from '../../assets/css/CardDados.module.css';
import { ModalExcluir } from '../radix/ModalExcluir';
import { BsThreeDots } from 'react-icons/bs';
import { GrFormClose } from 'react-icons/gr';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../services/Firebase';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';

export const CardDadosFuncionario = ({
  nome,
  credencial,
  admin,
  status,
  foto,
}) => {
  const handleExcluir = async () => {
    const excluirFuncionario = await deleteDoc(
      doc(db, 'Funcionarios', credencial),
    );

    if (excluirFuncionario === undefined) {
      window.location.reload();
    }
  };

  return (
    <div className={SCardDados.Container}>
      <Row className={SCardDados.CardContainer}>
        <Col md={1}>
          <div className={SCardDados.Foto}>
            <img src={foto} alt="foto-perfil" />
          </div>
        </Col>
        <Col md={2} className={SCardDados.Dados}>
          <p>{nome}</p>
        </Col>
        <Col md={2}>
          <p style={{ fontSize: '14px', textAlign: 'center' }}>
            {admin ? 'Administrador' : 'Funcionário'}
          </p>
        </Col>
        <Col md={2}>
          <p style={{ fontSize: '14px', textAlign: 'center' }}>
            {status ? 'Ativo' : 'Inativo'}
          </p>
        </Col>
        <Col md={5}>
          <div className={SCardDados.ButtonContainer}>
            <Link to={credencial} style={{ color: 'black' }}>
              <CardButton icon={<BsThreeDots size={25} />} />
            </Link>
            <ModalExcluir
              title="Excluir Funcionário"
              description="Deseja realmente excluir este funcionário"
              credencial={credencial}
              nome={nome}
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
