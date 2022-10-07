import { AddCircle, Delete } from '@mui/icons-material'
import { Box, Button, IconButton, List, ListItem, ListItemText, SelectChangeEvent, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDataProvider, useNotify } from 'react-admin';
import CustomSelect from '../CustomSelect'

interface OperatorFormProps {
    currentData: any[]
    updateData: (newOp: any) => any
    setTransportCompanyRegistered: (newOp: any) => any
    transportCompanyRegistered: boolean

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

    const [transportCompany, setTransportCompany] = useState<TransportCompanyItem>({value: '',text: ''})
    const [concesionario, setConcesionario] = useState<ConcesionaryItem>({value: '',text: ''})

    


    const dataProvider = useDataProvider();
    const notify = useNotify();

    const addData = (id: any) => {

        if(id.value == ''){
            notify('Seleccione concesionario por favor', {
                type: 'info',
                messageArgs: { smart_count: 1 },
                undoable: false,
            });
            return
        }


        let current = props.currentData

        for (let i = 0; i < current.length; i++) {
            if (id.value == current[i].value) {
                notify('Concesionario ya registrado', {
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

        props.updateData(newData)
        notify('Concesionario agregado', {
            type: 'success',
            messageArgs: { smart_count: 1 },
            undoable: false,
        });
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
        notify('Concesionario eliminado', {
            type: 'info',
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
            })*/


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
        if(event.target.value == ''){
            setConcesionario({value: '', text: ''});
        }else{
            for( let e of transportCompanyItems){
                if(e.value == event.target.value){
                    setTransportCompany({value: event.target.value, text: e.text});
                    setTransportCompany({value: event.target.value, text: e.text});
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

        setConcesionario({value: '',text: ''})

        let concesionaries: ConcesionaryItem[] = [
            { value: "178575", text: "concesionario 1" },
            { value: "78578572", text: "concesionario 2" },
            { value: "27575", text: "concesionario 3" },
            { value: "4578875", text: "concesionario 4" }
        ]

        if (concesionarioItems.length == 0) setConcesionarioItems(concesionaries)
        else {
            concesionaries = [...concesionarioItems, { value: "200" + concesionarioItems.length, text: "concesionario " + concesionarioItems.length }]
            setConcesionarioItems(concesionaries)
        }

        console.log(concesionarioItems)

    }

    const handleChangedConcecionary = (event: SelectChangeEvent) => {
        if(event.target.value == ''){
            setConcesionario({value: '', text: ''});
        }else{
            for( let e of concesionarioItems){
                if(e.value == event.target.value){
                    setConcesionario({value: event.target.value, text: e.text});
                    return
                }
            }
        }
    
    }

    const handleClickSetTransportCompany = () => {
        if(transportCompany.value == ''){
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


    }
    console.log(props.transportCompanyRegistered)



    return (
        <>

            {props.transportCompanyRegistered ? (
                <>
                    <Typography variant="h6" component="h5" sx={{marginY: 2}}>
                        Empresa: {transportCompany.text}
                    </Typography>

                    <Typography variant="subtitle1" component="h2">
                        Seleccione concesionarios:
                    </Typography>
                    <Box display='flex' >
                        <Box sx={{ flex: '1 1 auto' }}>
                            <CustomSelect items={concesionarioItems} label="Concesionario" value={concesionario.value} handleChange={handleChangedConcecionary} />
                        </Box>

                        <IconButton size="large" onClick={() => addData(concesionario)}>
                            <AddCircle color="primary" fontSize="inherit" />
                        </IconButton>
                    </Box>
                    <Typography variant="subtitle1" component="h2">
                        Concesionarios Selecionados:
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
                                <IconButton size="large" onClick={() => deleteData(id)}>
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
