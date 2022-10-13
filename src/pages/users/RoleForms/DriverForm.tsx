import { AddCircle, Delete, Save } from '@mui/icons-material'
import { Box, Button, IconButton, List, ListItem, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin';
import CustomSelect from '../CustomSelect'
import SelectVehicleAutocomplete from './components/SelectVehicleAutocomplete';

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

    const [vehicleRegistered, setVehicleRegistered] = useState(false)




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
                setTransportCompanyItems(data)
                setTransportCompanyItems(data)
                //setLoading(false);
                //console.log(data);
                setVehicleRegistered(true)
                notify('Vehiculo guardado', {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
            })

        if (!(vehiUser.status != 201)) return

        //setVehicleRegistered(true)
        //end save
        /*notify('Vehiculo guardado', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });*/
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
                    setTransportCompany({ value: event.target.value, text: e.text });
                    break
                }
            }
        }
        //setTransportCompany(event.target.value);

        //let dataR = await getRoutes(event.target.value)

        /*let dR: any[] = []
        if(dataR != undefined){
            dR = dataR.data!;
            console.log(dR);
            setConcesionarioItems(dR);
        }  

        */

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

    const updateVehicles = () => {

        dataProvider.getVehicle('routes', { id: transportCompany.value })
            .then(({ data }: any) => {
                setVehicleItems(data)
                setVehicleItems(data)
                //setLoading(false);
                //console.log(data);
            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
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



    return (
        <>

            {props.driverTransportCompanyRegistered ? (
                <>
                    <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                        Empresa: {transportCompany.text}
                    </Typography>

                    {vehicleRegistered ? (
                        <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                            Vehiculo: {vehicle.text}
                        </Typography>
                    ) : (
                        <>

                            <Typography variant="subtitle1" component="h2">
                                Seleccione Vehiculo:
                            </Typography>
                            <Box display='flex' >
                                <Box sx={{ flex: '1 1 auto' }}>
                                    <CustomSelect items={vehicleItems} label="Vehicle" value={vehicle.value} handleChange={handleChangedVehicle} />
                                </Box>

                                <IconButton size="large" onClick={() => setData(vehicle)}>
                                    <Save color="primary" fontSize="inherit" />
                                </IconButton>
                            </Box>
                        </>
                    )
                    }


                </>
            ) : (
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
            )}

            <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                O busque el vehiculo por placa:
            </Typography>
            
            <Box display='flex' width={'100%'}>
                    <Box sx={{ flex: '1 1 auto' }}>
                        <SelectVehicleAutocomplete />
                    </Box>
                    <Button
                        color='secondary'
                        size='small'
                        variant='contained'
                        sx={{ marginY: 2, marginX: 1 }}
                        onClick={ () => {
                            notify('Función no implementada', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: false,
                            });
                        }
                            /*() => deleteData(id)*/}

                    >Guardar</Button>
                </Box>

        </>
    )
}
