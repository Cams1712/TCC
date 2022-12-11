import * as Dialog from '@radix-ui/react-dialog';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import './Modal.css';

export const ModalExcluir = ({
  Component,
  nome,
  event,
  title,
  description,
}) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>{Component}</Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="DialogOverlay" />
        <Dialog.Content className="DialogContent">
          <Dialog.Title className="DialogTitle">{title}</Dialog.Title>
          <Dialog.Description className="DialogDescription">
            {description}
            <span style={{ display: 'block', width: '100%' }}>{nome}</span>
          </Dialog.Description>
          <div
            style={{
              display: 'flex',
              marginTop: 25,
              justifyContent: 'flex-end',
            }}
          >
            <Dialog.Close asChild>
              <button className="Button ">Cancelar</button>
            </Dialog.Close>

            <Dialog.Close asChild>
              <button className="Button green" onClick={event}>
                Excluir
              </button>
            </Dialog.Close>
          </div>

          <Dialog.Close asChild>
            <button className="IconButton" aria-label="Close">
              <AiOutlineCloseCircle />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
