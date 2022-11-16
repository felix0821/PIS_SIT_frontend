import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import UserEdit from './UserEdit';
import { useNavigate } from 'react-router';
import { AnySoaRecord } from 'dns';
import { useRecordContext } from 'react-admin';
import { User } from '../../../types';
import UserRoleEdit from './UserRoleEdit';
import { AdminPanelSettings, RollerSkatingTwoTone } from '@mui/icons-material';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  //width: 400,
  bgcolor: 'background.paper',
  //border: '2px solid #000',
  boxShadow: 24,
  //p: 4,
};


export default function CustomEditRoleButton(id: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const navigate = useNavigate();
  const record = useRecordContext<User>();
  //console.log(record)

  const handleCloseM = React.useCallback(() => {
    navigate('/users');
    handleClose()
}, [navigate]);

  return (
    <div>
      <Button onClick={handleOpen} color='secondary' startIcon={<AdminPanelSettings/>}>Roles</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div>
        <UserRoleEdit
          id={record.id}
          onCancel={handleCloseM}
          />
        </div>
      </Modal>
    </div>
  );
}