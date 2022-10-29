import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useNavigate } from 'react-router';
import UserCreate from './UserCreate';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  //bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  //p: 4,
};


export default function CustomCreateButton() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  //const record = useRecordContext<User>();
  //console.log(record)

  const handleCloseM = React.useCallback(() => {
    navigate('/users');
    handleClose()
}, [navigate]);

  return (
    <div>
      <Button onClick={handleOpen}>Agregar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
          <UserCreate
          onCancel={handleCloseM}
          ></UserCreate>
          </div>
      </Modal>
    </div>
  );
}