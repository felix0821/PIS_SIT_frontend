import { ListItem, ButtonGroup, IconButton, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, Modal, Box, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Moment from 'react-moment';
import WorkIcon from '@mui/icons-material/Work';
import { AlertNotification } from '../../types';
import { useDataProvider, useNotify } from 'react-admin';

interface NotificationProps {
    notification: AlertNotification,
    handleClose: (event: Event | React.SyntheticEvent) => void
}

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export const Notification = ({ notification, handleClose }: NotificationProps) => {

    const [open, setOpen] = useState(false);
    const [plate, setPlate] = useState("");
    const handleOpenModal = () => setOpen(true);
    const handleCloseModal = () => setOpen(false);
    const [notifyDetail, setNotifyDetail] = useState({id: ""});

    const dataProvider = useDataProvider();
    const notify = useNotify();


    useEffect(() => {
        dataProvider.getOneAlert('alerts', {alertId: notification.reference})
            .then(({ data }: any) => {
                console.log(data)
                setNotifyDetail(data);
                //setLoading(false);

            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
            })
    }, [])


    /*useEffect(() => {
        if(notifyDetail.id =="") return

        dataProvider.getVehicle('routes', { id: notifyDetail. })
            .then(({ data }: any) => {
                //setVehicleItems(data);
                //console.log(data);
            })
            .catch((error: any) => {
                console.log('Error ' + error.status + ': ' + error.body.content)
            })

    }, [notifyDetail]);*/


    const handleClickValidate = () => {
        dataProvider.validateAlert('alerts', {placa: 'X1Z-967', id: notification.reference})
            .then(({ data }: any) => {
                console.log(data)
                //setLoading(false);

            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
            })
        handleCloseModal();
    }


    return (
        <>
            <ListItem
            onClick={handleOpenModal}
                /*secondaryAction={
                    /*<ButtonGroup
                        orientation="vertical"
                    >
                        <IconButton
                            edge="end"
                            aria-label="comment"
                        >
                            <CheckCircleIcon />
                        </IconButton>
                        <IconButton
                            edge="end"
                            aria-label="comment"
                        >
                            <ReportIcon />
                        </IconButton>
                    </ButtonGroup>
                    <Button
                        color='secondary'
                        size='small'
                        variant='contained'
                        sx={{ marginY: 2, marginX: 1 }}
                        onClick={handleOpenModal}

                    >Ver</Button>
                }*/
                disablePadding
            >
                <ListItemButton /*onClick={handleClose}*/>
                    <ListItemAvatar>
                        <Avatar>
                            <WorkIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={"Ruta " + notification.title}
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: 'inline' }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    {" "}
                                </Typography>
                                <Moment format="LLLL" locale="es" withTitle>
                                    {notification.timestamp}
                                </Moment>
                            </React.Fragment>
                        }
                    />
                </ListItemButton>
            </ListItem>
            <div>
                <Modal
                    open={open}
                    onClose={handleCloseModal}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style} display='flex' flexDirection='column'>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {notification.title}
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            Detalles de Alerta:<br/>
                            
                            {JSON.stringify(notifyDetail)}<br/>
                            <TextField id="outlined-basic" label="Vehículo" variant="outlined" onChange={(value: any)=>{
                                console.log(value.target.value);
                                setPlate(value.target.value);
                            }}/>
                            <Box>
                                <ButtonGroup
                                    orientation="horizontal"
                                >
                                    <Button
                                        color='secondary'
                                        size='small'
                                        variant='contained'
                                        sx={{ marginY: 2, marginX: 1 }}
                                        onClick={handleClickValidate}

                                    >Validar</Button>
                                    <Button
                                        color='error'
                                        size='small'
                                        variant='contained'
                                        sx={{ marginY: 2, marginX: 1 }}
                                        onClick={handleCloseModal}

                                    >Cancelar</Button>
                                </ButtonGroup>
                            </Box>
                        </Typography>
                    </Box>
                </Modal>
            </div>
        </>
    )
}
