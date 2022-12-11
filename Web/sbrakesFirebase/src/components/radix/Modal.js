import React from 'react';
import './Modal.css';
import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { Password } from '../../Password';
import { Email } from '../../services/EmailJs';
import {
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';
import { db } from '../../services/Firebase';

export const ModalPassword = ({ btnText, textStyle, title, description }) => {
  const [credencial, setCredencial] = React.useState('');
  const [error, setError] = React.useState('');
  const password = Password();

  const handleChange = ({ target }) => {
    const { value } = target;
    setCredencial(value);
  };

  // Atualizando a senha no Firebase
  const atualizarFirebase = async (credencial, password) => {
    // Buscando o funcionário de acordo com a credencial
    const userCollection = query(
      collection(db, 'Funcionarios'),
      where('Credencial', '==', credencial),
    );

    // Selecionando o documento do respectivo funcionário
    const dataUser = await getDocs(userCollection);
    const email = dataUser.docs.map((item) => item.data().Email);
    const idUser = dataUser.docs.map((item) => item.id);

    // Se houver documento (ERRO ao trasnformar objeto em String)
    if (idUser.length !== 0) {
      const funcionarioRef = doc(db, 'Funcionarios', idUser.toString());
      await updateDoc(funcionarioRef, {
        Senha: password,
      });

      Email(email, password);
      setError('Email enviado com sucesso');
    }
  };

  const handleClick = () => {
    if (credencial.trim() !== '') {
      atualizarFirebase(credencial, password);
    } else {
      setError('Preencha o campo corretamente');
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button style={textStyle} className="btn-open">
          {btnText}
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {description}
          </Dialog.Description>
          <fieldset className="Fieldset">
            <input
              className="Input"
              id="name"
              placeholder="Credencial"
              value={credencial}
              onChange={handleChange}
            />
          </fieldset>
          <div className="error">{error}</div>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <button className="Button green" onClick={handleClick}>
              Confirmar
            </button>
          </div>
          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <AiOutlineCloseCircle size={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
