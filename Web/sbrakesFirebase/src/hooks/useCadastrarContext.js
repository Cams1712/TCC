import React from 'react';
import { db } from '../services/Firebase';
import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import Regex from '../Regex';

export const CadastrarContext = React.createContext();

export const CadastrarProvider = ({ children }) => {
  const validacaoCadastroFuncionario = async (dadosCadastro) => {
    const { nome, email, senha, foto, credencial } = dadosCadastro;

    // Verificar se já está cadastrado no banco
    const cadastrarCollection = query(
      collection(db, 'Funcionarios'),
      where('Credencial', '==', credencial),
    );

    const verificarExistencia = await getDocs(cadastrarCollection);

    if (verificarExistencia.empty) {
      if (
        nome.trim() !== '' &&
        senha.trim() !== '' &&
        Regex.email(email) &&
        foto.trim() !== '' &&
        credencial.trim() !== ''
      ) {
        try {
          await setDoc(doc(db, 'Funcionarios', credencial), {
            Administrador: dadosCadastro.adm,
            Credencial: credencial,
            Email: email,
            Foto: foto,
            Nome: nome,
            Senha: senha,
            Status: dadosCadastro.status,
          });

          alert('Cadastrado com sucesso');
          window.location.reload();
        } catch (error) {
          console.log('Error', error);
        }
      } else {
        alert('Preencha os dados corretamente');
      }
    } else {
      alert('Usuário já está cadastrado');
    }
  };

  const validacaoCadastroCaminhao = async (dadosCadastro) => {
    const { placa, modelo, marca, bluetooth, funcionario } = dadosCadastro;

    // Verificar se já está cadastrado no banco
    const cadastrarCollection = query(
      collection(db, 'Caminhoes'),
      where('Placa', '==', placa),
    );

    const verificarExistencia = await getDocs(cadastrarCollection);

    if (verificarExistencia.empty) {
      if (
        placa.trim() !== '' &&
        modelo.trim() !== '' &&
        marca.trim() !== '' &&
        bluetooth.trim() !== ''
      ) {
        try {
          await setDoc(doc(db, 'Caminhoes', placa), {
            Placa: placa,
            Modelo: modelo,
            Marca: marca,
            Funcionario: funcionario,
            Bluetooth: bluetooth,
          });

          alert('Cadastrado com sucesso');
          window.location.reload();
        } catch (error) {
          console.log('Error', error);
        }
      } else {
        alert('Preencha os dados corretamente');
      }
    } else {
      alert('Veículo já está cadastrado');
    }
  };

  return (
    <CadastrarContext.Provider
      value={{ validacaoCadastroFuncionario, validacaoCadastroCaminhao }}
    >
      {children}
    </CadastrarContext.Provider>
  );
};
