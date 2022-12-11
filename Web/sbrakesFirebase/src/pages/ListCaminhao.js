import React from 'react';
import SLisFuncionario from '../assets/css/LisCaminhao.module.css';
import { Loading } from '../components/Loading';
import { collection, getDocs, query } from 'firebase/firestore';
import { db } from '../services/Firebase';
import { AiOutlineSearch } from 'react-icons/ai';
import { CardDadosCaminhao } from '../components/dashboard/CardDadosCaminhao';

export const ListCaminhao = () => {
  // Armazena todos os caminhões
  const [caminhoes, setCaminhoes] = React.useState(null);
  // Armazena funcionário pesquisado
  const [search, setSearch] = React.useState('');

  // Listar todos os caminhões
  React.useEffect(() => {
    async function listarFuncionarios() {
      const funcionarioCollection = query(collection(db, 'Caminhoes'));

      const listaFuncionarios = await getDocs(funcionarioCollection);
      setCaminhoes(listaFuncionarios.docs.map((doc) => doc.data()));
    }

    listarFuncionarios();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  if (caminhoes === null)
    return (
      <div className={SLisFuncionario.Loading}>
        <Loading width="58px" height="58px" />
      </div>
    );
  return (
    <div className={SLisFuncionario.Container}>
      <div className={SLisFuncionario.Title}>
        <p>Lista de Veículos</p>
      </div>
      <div>
        <div className={SLisFuncionario.SearchContainer}>
          <AiOutlineSearch
            className={SLisFuncionario.SearchIcon}
            size={20}
            color="gray"
          />
          <input
            type="text"
            placeholder="Pesquisar Funcionário"
            className={SLisFuncionario.Search}
            onChange={handleChange}
          />
        </div>
      </div>

      {caminhoes
        .filter(
          (caminhao) =>
            caminhao.Placa.includes(search) || caminhao.Marca.includes(search),
        )
        .map((caminhao, index) => (
          <CardDadosCaminhao
            placa={caminhao.Placa}
            marca={caminhao.Marca}
            modelo={caminhao.Modelo}
            bluetooth={caminhao.Bluetooth}
            funcionario={caminhao.Funcionario}
            key={index}
          />
        ))}
    </div>
  );
};
