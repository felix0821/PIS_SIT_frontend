import { AddCircle, Delete, Save } from '@mui/icons-material'
import { Box, Button, IconButton, List, ListItem, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin';
import CustomSelect from '../CustomSelect'

interface DriverFormProps {
    setDriverTransportCompanyRegistered: (newOp: any) => any
    driverTransportCompanyRegistered: boolean

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

    const setData = (id: any) => {

        if (id.value == '') {
            notify('Seleccione vehiculo por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }

        //guardar en base de datos
        setVehicleRegistered(true)
        //end save
        notify('Vehiculo guardado', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });
    }


    useEffect(() => {

        const companies = [
            { value: "1655665", text: "empresa 1" },
            { value: "286686", text: "empresa 2" },
            { value: "254132132", text: "empresa 3" },
            { value: "448546531123", text: "empresa 4" }
        ]


        /*dataProvider.getTransportCompany('routes')
            .then(({ data }: any) => {
                //setTransportCompanyItems(data)
                //setLoading(false);
                console.log(data);
            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content)
                //setLoading(false);
            })
*/

        /*dataProvider.getConcesionary('routes', 'otro valoe')
        .then(({ data }: any) => {
            //setTransportCompanyItems(data)
            //setLoading(false);
            console.log(data);
        })
        .catch((error: any) => {
            setError(error);
            console.log(error)
            //setLoading(false);
        })*/


        setTransportCompanyItems(companies)
        //setLoading(false)

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

        let vehiclesPlane: VehicleItem[] = [
            { value: "178575", text: "vehicle 1" },
            { value: "78578572", text: "vehicle 2" },
            { value: "27575", text: "vehicle 3" },
            { value: "4578875", text: "vehicle 4" }
        ]

        if (vehicleItems.length == 0) setVehicleItems(vehiclesPlane)
        else {
            setVehicleItems(vehiclesPlane)
        }

        console.log(vehicleItems)

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


    }
    console.log(props.driverTransportCompanyRegistered)



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

        </>
    )
}
