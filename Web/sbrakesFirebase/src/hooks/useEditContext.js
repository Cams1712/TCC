import { doc, updateDoc } from 'firebase/firestore';
import React from 'react';
import { db } from '../services/Firebase';

export const EditContext = React.createContext();

export const EditProvider = ({ children }) => {
  const editarDadosFuncionario = async (dadosFuncionario) => {
    const { nome, email, senha, credencial, administrador, status, foto } =
      dadosFuncionario;

    if (
      nome.trim() !== '' &&
      email.trim() !== '' &&
      senha.trim() !== '' &&
      foto.trim() !== ''
    ) {
      try {
        const updateCollection = doc(db, 'Funcionarios', credencial);

        await updateDoc(updateCollection, {
          Administrador: administrador,
          Credencial: credencial,
          Email: email,
          Foto: foto,
          Nome: nome,
          Senha: senha,
          Status: status,
        }).catch((e) => console.log(e));

        alert('Dados atualizados com sucesso');
        window.location.reload();
      } catch (error) {
        console.log('Error', error);
      }
    } else {
      alert('Preencha os dados corretamente');
    }
  };

  const editarDadosVeiculos = async (dadosVeiculo) => {
    const { placa, modelo, marca, bluetooth, funcionario } = dadosVeiculo;

    if (
      placa.trim() !== '' &&
      modelo.trim() !== '' &&
      marca.trim() !== '' &&
      bluetooth.trim() !== ''
    ) {
      try {
        const updateCollection = doc(db, 'Caminhoes', placa);

        await updateDoc(updateCollection, {
          Placa: placa,
          Modelo: modelo,
          Marca: marca,
          Bluetooth: bluetooth,
          Funcionario: funcionario,
        }).catch((e) => console.log(e));

        alert('Dados atualizados com sucesso');
        window.location.reload();
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('Preencha os dados corretamente');
    }
  };

  return (
    <EditContext.Provider
      value={{ editarDadosFuncionario, editarDadosVeiculos }}
    >
      {children}
    </EditContext.Provider>
  );
};
