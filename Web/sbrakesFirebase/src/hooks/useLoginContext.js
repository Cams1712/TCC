import React from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../services/Firebase';
import { useLocalStorage } from './useLocalStorage';

// Contexto para validação do login do usuário
export const LoginContext = React.createContext();

export const LoginProvider = ({ children }) => {
  // Armazena se o usuário está logado ou não no localStorage
  const [local, setLocal] = useLocalStorage('statusLogin', '');
  // Objeto que será enviado ao localStorage com alguns dados dos funcionários
  const [usuarioLocal, setUsuarioLocal] = useLocalStorage('dadosUsuario', '');
  // Armazena erros de entrada de dados...
  const [error, setError] = React.useState('');

  // Verifica a entrada de dados e realiza a conexão com o banco de dados
  const validacaoLogin = async (credencial, senha) => {
    if (credencial.trim() === '') {
      setError('Credencial inválida');
    } else if (senha.trim() === '') {
      setError('Senha inválida');
    } else {
      // Select no Firebase
      const loginCollection = query(
        collection(db, 'Funcionarios'),
        where('Credencial', '==', credencial),
      );

      // Buscando dados do usuário
      const loginData = await getDocs(loginCollection).catch((e) =>
        console.log(e),
      );

      if (loginData.empty) {
        setError('Usuário não encontrado');
      } else {
        loginData.docs.map((item) => {
          if (item.data() !== null) {
            if (
              item.data().Administrador === true &&
              item.data().Status === true
            ) {
              if (
                item.data().Credencial === credencial &&
                item.data().Senha === senha
              ) {
                setLocal(true);
                setUsuarioLocal(
                  JSON.stringify({
                    nome: item.data().Nome,
                    foto: item.data().Foto,
                    credencial: item.data().Credencial,
                  }),
                );
              }
            } else {
              setError('Você não possui permissão para acessar esta área');
            }
          }
        });
      }
    }
  };

  // Encerrando sessão do usuário
  const Logout = () => {
    setLocal('');
    setUsuarioLocal('');
    window.location.reload();
  };

  return (
    <LoginContext.Provider
      value={{
        local,
        Logout,
        validacaoLogin,
        error,
        usuarioLocal,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};
