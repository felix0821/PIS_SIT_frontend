import { AddCircle, Delete, Save } from '@mui/icons-material'
import { Box, Button, CircularProgress, IconButton, List, ListItem, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin';
import CustomSelect from '../CustomSelect'
import SelectVehicleAutocomplete from './SelectVehicleAutocomplete';

interface DriverFormProps {
    setDriverTransportCompanyRegistered: (newOp: any) => any
    driverTransportCompanyRegistered: boolean
    userId: any
}

interface VehicleItem {
    value: string;
    text: string;
}

interface TransportCompanyItem {
    value: string;
    text: string;
}

export default function DriverForm(props: DriverFormProps) {

    const [transportCompanyItems, setTransportCompanyItems] = useState<TransportCompanyItem[]>([])
    const [vehicleItems, setVehicleItems] = useState<VehicleItem[]>([])

    const [transportCompany, setTransportCompany] = useState<TransportCompanyItem>({ value: '', text: '' })
    const [vehicle, setVehicle] = useState<VehicleItem>({ value: '', text: '' })
    const [vehicleAutomatic, setVehicleAutomatic] = useState<VehicleItem>({ value: '', text: '' })

    const [vehicleRegistered, setVehicleRegistered] = useState(false)

    const [loading, setLoading] = useState(false);



    const dataProvider = useDataProvider();
    const notify = useNotify();

    const setData = async (id: any) => {

        if (id.value == '') {
            notify('Seleccione vehiculo por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }

        //guardar en base de datos
        let vehiUser = await dataProvider.registerUserInVehicle('routes', { data: { vehicleId: vehicle.value, personId: props.userId } })
            .then(({ data }: any) => {
                setVehicleRegistered(true)
                notify('Vehiculo guardado', {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data;
            })
            .catch((error: any) => {
                console.log('Error ' + error.status + ': ' + error.body.content)
                return error;
            })

        if (!(vehiUser.status != 201)) return
    }


    const setData2 = async (id: any) => {

        if (id.value == '') {
            notify('Seleccione vehiculo por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }

        //guardar en base de datos
        let vehiUser = await dataProvider.registerUserInVehicle('routes', { data: { vehicleId: vehicleAutomatic.value, personId: props.userId } })
            .then(({ data }: any) => {
                setVehicleRegistered(true)
                notify('Vehiculo guardado', {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data;
            })
            .catch((error: any) => {
                console.log('Error ' + error.status + ': ' + error.body.content)
                return error;
            })

        if (!(vehiUser.status != 201)) return

    }

    const deleteData = async () => {

        let valueVehicle = (!!vehicleAutomatic.value) ? vehicleAutomatic.value : vehicle.value;
        //guardar en base de datos
        let removeVehicle = await dataProvider.removeUserFromVehicle('routes', { data: { vehicleId: valueVehicle, personId: props.userId } })
            .then(({ data }: any) => {
                setVehicleRegistered(false)
                notify('Vehiculo Eliminado', {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data;
            })
            .catch((error: any) => {
                console.log('Error ' + error.status + ': ' + error.body.content)
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                //setLoading(false);
                return error;
            })

        if (!(removeVehicle.status != 200)) return
    }


    useEffect(() => {

        dataProvider.getTransportCompany('routes')
            .then(({ data }: any) => {
                setTransportCompanyItems(data)
                setTransportCompanyItems(data)
                //setLoading(false);
                console.log(data);
            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
            })

    }, [])


    const handleChangedTransportCompany = async (event: SelectChangeEvent) => {
        if (event.target.value == '') {
            setVehicle({ value: '', text: '' });
        } else {
            for (let e of transportCompanyItems) {
                if (e.value == event.target.value) {
                    setTransportCompany({ value: event.target.value, text: e.text });
                    break
                }
            }
        }

        setVehicle({ value: '', text: '' })

    }

    const handleChangedVehicle = (event: SelectChangeEvent) => {
        if (event.target.value == '') {
            setVehicle({ value: '', text: '' });
        } else {
            for (let e of vehicleItems) {
                if (e.value == event.target.value) {
                    setVehicle({ value: event.target.value, text: e.text });
                    return
                }
            }
        }

    }

    const handleChangedVehicleAutocomplete = (value: any) => {
        //console.log(value)
        if (value == '') {
            setVehicleAutomatic({ value: '', text: '' });
        } else {
            setVehicleAutomatic({ value: value, text: value });
        }
    }


    const updateVehicles = () => {
        setLoading(true);
        dataProvider.getVehicle('routes', { id: transportCompany.value })
            .then(({ data }: any) => {
                setVehicleItems(data)
                setVehicleItems(data)
                //setLoading(false);
                //console.log(data);
                setLoading(false);
            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
                setLoading(false);
            })

        console.log(vehicleItems)
    }

    const handleClickSetTransportCompany = () => {
        if (transportCompany.value == '') {
            notify('Seleccione empresa por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }
        props.setDriverTransportCompanyRegistered(true);
        notify('Empresa guardada', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });

        updateVehicles()


    }

    if (loading) return <Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <CircularProgress sx={{ marginY: 4 }} />
            <Typography variant="h5" component="h5" sx={{ marginY: 2 }}>
                Cargando
            </Typography>
        </Box>
    </Box>

    return (
        <>

            {(!vehicleRegistered) ? (
                <>
                    {props.driverTransportCompanyRegistered ? (
                        <>
                            <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                                Empresa: {transportCompany.text}
                            </Typography>

                            <Typography variant="subtitle1" component="h2">
                                Seleccione Vehiculo:
                            </Typography>
                            <Box display='flex' >
                                <Box sx={{ flex: '1 1 auto' }}>
                                    <CustomSelect items={vehicleItems} label="Vehicle" value={vehicle.value} handleChange={handleChangedVehicle} />
                                </Box>

                                <Button
                                    color='secondary'
                                    size='small'
                                    variant='contained'
                                    sx={{ marginY: 2, marginX: 1 }}
                                    onClick={() => setData(vehicle)}

                                >Guardar</Button>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Typography variant="subtitle1" component="h2">
                                Seleccione Empresa:
                            </Typography>
                            <Box display='flex' width={'100%'}>
                                <Box sx={{ flex: '1 1 auto' }}>
                                    <CustomSelect items={transportCompanyItems} label="Empresa" value={transportCompany.value} handleChange={handleChangedTransportCompany} />
                                </Box>
                                <Button
                                    color='secondary'
                                    size='small'
                                    variant='contained'
                                    sx={{ marginY: 2, marginX: 1 }}
                                    onClick={handleClickSetTransportCompany}

                                >Guardar</Button>
                            </Box>
                        </>
                    )}
                    <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                        O busque el vehiculo por placa:
                    </Typography>

                    <Box display='flex' width={'100%'}>
                        <Box sx={{ flex: '1 1 auto' }}>
                            <SelectVehicleAutocomplete handleChangue={handleChangedVehicleAutocomplete} />
                        </Box>
                        <Button
                            color='secondary'
                            size='small'
                            variant='contained'
                            sx={{ marginY: 2, marginX: 1 }}
                            onClick={() => setData2(vehicleAutomatic)}

                        >Guardar</Button>
                    </Box>
                </>
            ) : (
                <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                    Vehiculo: {(!!vehicle.text) ? vehicle.text : vehicleAutomatic.text}
                    <IconButton
                        size="large"
                        onClick={() => deleteData()}
                    >
                        <Delete sx={{ color: 'red' }} fontSize="inherit" />
                    </IconButton>
                </Typography>
            )
            }



        </>
    )
}
