import { AddCircle, Delete, Update } from '@mui/icons-material'
import { Box, Button, IconButton, List, ListItem, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin';
import CustomSelect from '../CustomSelect'

interface OperatorFormProps {
    currentData: any[]
    updateData: (newOp: any) => any
    setTransportCompanyRegistered: (newOp: any) => any
    transportCompanyRegistered: boolean
    userId: any

}

interface ConcesionaryItem {
    value: string;
    text: string;
}

interface TransportCompanyItem {
    value: string;
    text: string;
}

export default function OperatorForm(props: OperatorFormProps) {

    const [transportCompanyItems, setTransportCompanyItems] = useState<TransportCompanyItem[]>([])
    const [concesionarioItems, setConcesionarioItems] = useState<ConcesionaryItem[]>([])

    const [transportCompany, setTransportCompany] = useState<TransportCompanyItem>({ value: '', text: '' })
    const [concesionario, setConcesionario] = useState<ConcesionaryItem>({ value: '', text: '' })




    const dataProvider = useDataProvider();
    const notify = useNotify();

    const addData = async (id: any) => {

        if (id.value == '') {
            notify('Seleccione ruta por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }


        let current = props.currentData

        for (let i = 0; i < current.length; i++) {
            if (id.value == current[i].value) {
                notify('Ruta ya registrada', {
                    type: 'info',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return
            }
        }


        let newData = [...current, {
            value: id.value,
            text: id.text
        }];

        let assignConcession = await dataProvider.registerUserInConcesionary('routes', { data: { routeId: id.value, personId: props.userId } })
            .then(({ data }: any) => {
                notify('Code ' + data.status + ': ' + '' + data.message, {
                    type: 'success',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return data
            })
            .catch((error: any) => {
                //setError(error)
                //setLoading(false);
                notify('Error ' + error.status + ': ' + error.body.content, {
                    type: 'warning',
                    messageArgs: { smart_count: 1 },
                    undoable: false,
                });
                return {
                    status: error.status,
                    message: error.body.content
                }
            })
        if (assignConcession.status != 201) return


        props.updateData(newData)

        /*notify('Ruta agregada', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });*/
    }

    const deleteData = (id: any) => {
        let current = props.currentData
        let newData: any[] = [];

        for (let i = 0; i < current.length; i++) {
            if (id.value != current[i].value) {
                newData = [...newData, current[i]]
            }
        }

        props.updateData(newData)
        notify('Ruta eliminada', {
            type: 'info',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });
    }


    useEffect(() => {

        dataProvider.getTransportCompany('routes')
            .then(({ data }: any) => {
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
            setConcesionario({ value: '', text: '' });
        } else {
            for (let e of transportCompanyItems) {
                if (e.value == event.target.value) {
                    setTransportCompany({ value: event.target.value, text: e.text });
                    setTransportCompany({ value: event.target.value, text: e.text });
                    break
                }
            }
        }

        setConcesionario({ value: '', text: '' })

    }

    const handleChangedConcecionary = (event: SelectChangeEvent) => {
        if (event.target.value == '') {
            setConcesionario({ value: '', text: '' });
        } else {
            for (let e of concesionarioItems) {
                if (e.value == event.target.value) {
                    setConcesionario({ value: event.target.value, text: e.text });
                    return
                }
            }
        }

    }

    const updateConcesionaries = () => {
        dataProvider.getConcesionary('routes', { id: transportCompany.value })
            .then(({ data }: any) => {
                setConcesionarioItems(data)
                setConcesionarioItems(data)
                //setLoading(false);
                console.log(data);
            })
            .catch((error: any) => {
                //setError(error);
                console.log(error)
                //setLoading(false);
            })
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
        props.setTransportCompanyRegistered(true);
        notify('Empresa guardada', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });

        updateConcesionaries()
    }

    return (
        <>

            {props.transportCompanyRegistered ? (
                <>
                    <Typography variant="h6" component="h5" sx={{ marginY: 2 }}>
                        Empresa: {transportCompany.text}
                    </Typography>

                    <Typography variant="subtitle1" component="h2">
                        Seleccione rutas:
                    </Typography>
                    <Box display='flex' >
                        <Box sx={{ flex: '1 1 auto' }}>
                            <CustomSelect items={concesionarioItems} label="Ruta" value={concesionario.value} handleChange={handleChangedConcecionary} />
                        </Box>

                        <IconButton size="large" onClick={() => addData(concesionario)}>
                            <AddCircle color="primary" fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle1" component="h2">
                        Rutas Selecionadas:
                    </Typography>
                    <List>
                        {props.currentData.map(id => (
                            <Box display='flex'>
                                <Box sx={{ flex: '1 1 auto' }}>
                                    <ListItem key={id.value}>
                                        <ListItemText
                                            primary={id.text}
                                        />
                                    </ListItem>

                                </Box>
                                <IconButton
                                    size="large"
                                    onClick={ () => {
                                        notify('Función no implementada', {
                                            type: 'info',
                                            messageArgs: { smart_count: 1 },
                                            undoable: false,
                                        });
                                    }
                                        /*() => deleteData(id)*/}
                                >
                                    <Delete sx={{ color: 'red' }} fontSize="inherit" />
                                </IconButton>
                            </Box>
                        ))}

                    </List>
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
