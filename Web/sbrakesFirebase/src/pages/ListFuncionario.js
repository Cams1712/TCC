import React from 'react';
import SLisFuncionario from '../assets/css/LisFuncionario.module.css';
import { CardDadosFuncionario } from '../components/dashboard/CardDadosFuncionario';
import { Loading } from '../components/Loading';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/Firebase';
import { AiOutlineSearch } from 'react-icons/ai';

export const ListFuncionario = () => {
  // Armazena todos os funcionários
  const [funcionarios, setFuncionarios] = React.useState(null);
  // Armazena funcionário pesquisado
  const [search, setSearch] = React.useState('');

  // Listar todos os funcionários exceto o usuário logado
  React.useEffect(() => {
    const credencial = JSON.parse(localStorage.getItem('dadosUsuario'));

    async function listarFuncionarios() {
      const funcionarioCollection = query(
        collection(db, 'Funcionarios'),
        where('Credencial', '!=', credencial.credencial),
      );

      const listaFuncionarios = await getDocs(funcionarioCollection);
      setFuncionarios(listaFuncionarios.docs.map((doc) => doc.data()));
    }

    listarFuncionarios();
  }, []);

  const handleChange = ({ target }) => {
    setSearch(target.value);
  };

  if (funcionarios === null)
    return (
      <div className={SLisFuncionario.Loading}>
        <Loading width="58px" height="58px" />
      </div>
    );
  return (
    <div className={SLisFuncionario.Container}>
      <div className={SLisFuncionario.Title}>
        <p>Lista de Funcionários</p>
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

      {funcionarios
        .filter(
          (funcionario) =>
            funcionario.Credencial.includes(search) ||
            funcionario.Nome.includes(search),
        )
        .map((funcionario, index) => (
          <CardDadosFuncionario
            nome={funcionario.Nome}
            foto={funcionario.Foto}
            admin={funcionario.Administrador}
            status={funcionario.Status}
            credencial={funcionario.Credencial}
            key={index}
          />
        ))}
    </div>
  );
};
