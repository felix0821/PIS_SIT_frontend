import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router';
import MapView from './Map';
import CustomSelect from './CustomSelect';
import { LatLng } from 'leaflet';
import axios from 'axios';
import { useGetList } from 'react-admin';
import getRoutes from '../api/api';

const RouteView = () => {

    const location = useLocation();

    const items = [
        {
            value: 101,
            text: "Diez"
        },
        {
            value: 201,
            text: "Diez"
        },
        {
            value: 301,
            text: "Diez"
        }

    ];

    const [concesionarioItems, setConcesionarioItems] = useState<any[]>([])
    const [rutaItems, setRutaItems] = useState<any[]>([])


    /*const { data, total, isLoading, error, refetch } = useGetList(
        "concession/dropdown",
    );*/

    const [concesionario, setConcesionario] = useState("")
    const [ruta, setRuta] = useState("")
    const [start, setStart] = useState<LatLng>(new LatLng(-16.4141, -71.5433));
    const [end, setEnd] = useState<LatLng>(new LatLng(-16.4184, -71.4950));

    useEffect(() => {
        console.log("ruta"+ruta)
    }, [ruta])

    const { data, total, isLoading, error, refetch } = useGetList(
        "transport-company/dropdown",
    );

    
    

    useEffect(()=>{
        if(concesionarioItems.length == 0 && data != undefined){
            console.log(data);
            setConcesionarioItems(data!)
        }
    }, [isLoading])


    const handleChangeConcessionario = async (event: SelectChangeEvent) => {
        setConcesionario(event.target.value);
        setConcesionario(event.target.value);
        
        let dataR = await getRoutes(event.target.value)

        let dR: any[] = []
        if(dataR != undefined){
            dR = dataR.data!;
            console.log(dR);
            setRutaItems(dR);
        }  
        console.log(event.target.value+" <--> "+concesionario)
    }

    const handleChangeRuta = (event: SelectChangeEvent) => {
        setRuta(event.target.value);
    }

    return (
        <Box 
            sx={{
                display: 'flex',
                flexDirection: 'column'
            }}
        >
                <Box 
                    display="flex"
                    sx={{
                        width: '100%',
                        justifyContent: 'space-around',
                        padding: '16px'
                    }}    
                >
                <CustomSelect items={concesionarioItems} label="Concesionario" value={concesionario} handleChange={handleChangeConcessionario} />
                <CustomSelect items={rutaItems} label="Ruta" value={ruta} handleChange={handleChangeRuta} />

                </Box>

                <Box
                display="flex"
                sx={{
                    width: '100%',
                    height: '80%',
                    justifyContent: 'center',
                    padding: '16px'
                }} 
                >
                    <MapView
                        start={start}
                        setStart={setStart}
                        end={end}
                        setEnd={setEnd}
                    />
                </Box>

            

        </Box>
    );
};

export default RouteView;

