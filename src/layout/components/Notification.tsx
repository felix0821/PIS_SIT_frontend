import { ListItem, ButtonGroup, IconButton, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography, Button, Modal, Box, TextField, CardContent, CircularProgress, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Moment from 'react-moment';
import WorkIcon from '@mui/icons-material/Work';
import { AlertNotification } from '../../types';
import { useDataProvider, useNotify } from 'react-admin';
import { Close } from '@mui/icons-material';
import SelectVehicleInRouteAutocomplete from './SelectVehicleAutocomplete';

interface NotificationProps {
    notification: AlertNotification,
    handleClose: (event: Event | React.SyntheticEvent) => void
}

const style = {
    position: 'absolute' as 'absolute',

    width: 400,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,

    backgroundColor: "#FFF",
    padding: "15px",
    zIndex: "1000",
    borderRadius: ".5em",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
};

interface VehicleItem {
    value: string;
    text: string;
}

interface NotificationDetail {
    id: string,
    gizRoute?: {
        id: string,
        name: string
    },
    timestamp?: string,
    status?: {
        id: string,
        name: string
    },
    gizVehicle?: any
}

export const Notification = ({ notification, handleClose }: NotificationProps) => {

    const [open, setOpen] = useState(false);
    const [plate, setPlate] = useState("");
    const [vehicle, setVehicle] = useState<VehicleItem>({ value: '', text: '' })
    const [loading, SetLoading] = useState(true);


    const handleOpenModal = () => {
        dataProvider.getOneAlert('alerts', { alertId: notification.reference })
            .then(({ data }: any) => {
                console.log(data)
                setNotifyDetail(data);
                SetLoading(false);

            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content);
                SetLoading(false);
            })
        setOpen(true);
    }
    const handleCloseModal = () => setOpen(false);
    const [notifyDetail, setNotifyDetail] = useState<NotificationDetail>({ id: "" });

    const dataProvider = useDataProvider();
    const notify = useNotify();


    /*useEffect(() => {
        dataProvider.getOneAlert('alerts', { alertId: notification.reference })
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
    }, [])*/

    const handleClickValidate = () => {
        if (vehicle.value == '') {
            notify('Seleccione un vehículo por favor', {
                type: 'warning',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return;
        }
        dataProvider.validateAlert('alerts', { placa: vehicle.value, id: notification.reference })
            .then(({ data }: any) => {
                console.log(data)
                notify(data.message, {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });


            })
            .catch((error: any) => {
                notify(error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
            })
        handleCloseModal();
    }

    const handleChangedVehicleInRouteAutocomplete = (value: any) => {
        //console.log(value)
        if (value == '') {
            setVehicle({ value: '', text: '' });
        } else {
            setVehicle({ value: value, text: value });
        }
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
                                <Moment format="LLLL" locale="es" withTitle add={{hours: 5}}>
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
                        <IconButton
                            sx={{
                                position: "fixed",
                                top: 1,
                                right: 0
                            }}
                            onClick={() => { setOpen(false) }}
                        >
                            <Close />
                        </IconButton>

                        {loading ? (
                            <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                                <CircularProgress sx={{ marginY: 4 }} />
                                <Typography variant="h5" component="h5" sx={{ marginY: 2 }}>
                                    Cargando
                                </Typography>
                            </Box>
                        ) : (
                            <CardContent sx={{ margin: 2 }}>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {notification.title}
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Detalles de Alerta:<br />

                                    Estado : {"  "}
                                    <Chip label={notifyDetail.status?.name} color={(notifyDetail.status?.id == "3000001000002")? "success" : "warning"} sx={{height: '20px'}}/>
                                    <br />
                                    Ruta : {notifyDetail.gizRoute?.name} <br />
                                    Timestamp : {notifyDetail.timestamp} <br />
                                    Vehículo : {notifyDetail.gizVehicle} <br />

                                    {/*<TextField id="outlined-basic" label="Vehículo" variant="outlined" onChange={(value: any) => {
                                    console.log(value.target.value);
                                    setPlate(value.target.value);
                                }} />*/}
                                    <br />



                                    {(notifyDetail.status?.id != '3000001000002') ? (

                                        <Box>
                                            {'Digite la placa del vehículo:'}

                                            <SelectVehicleInRouteAutocomplete handleChangue={handleChangedVehicleInRouteAutocomplete} route={notifyDetail.gizRoute?.id} />
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
                                    ) : (<Button
                                        color='success'
                                        size='small'
                                        variant='contained'
                                        sx={{ marginY: 2, marginX: 1 }}
                                        onClick={handleCloseModal}

                                    >Ok</Button>)}

                                </Typography>
                            </CardContent>
                        )

                        }


                    </Box>
                </Modal>
            </div>
        </>
    )
}
