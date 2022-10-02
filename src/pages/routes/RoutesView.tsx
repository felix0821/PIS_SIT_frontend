import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { Box, SelectChangeEvent } from '@mui/material';
import { matchPath, useLocation, useNavigate } from 'react-router';
import MapView from './Map';
import CustomSelect from './CustomSelect';
import { LatLng } from 'leaflet';
import axios from 'axios';
import { Loading, useDataProvider, useGetList } from 'react-admin';

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

    const [transportCompanyItems, setTransportCompanyItems] = useState<any[]>([])
    const [concesionarioItems, setConcesionarioItems] = useState<any[]>([])


    /*const { data, total, isLoading, error, refetch } = useGetList(
        "concession/dropdown",
    );*/

    const [transportCompany, setTransportCompany] = useState("")
    const [concesionario, setConcesionario] = useState("")
    const [start, setStart] = useState<LatLng>(new LatLng(-16.4141, -71.5433));
    const [end, setEnd] = useState<LatLng>(new LatLng(-16.4184, -71.4950));

    useEffect(() => {
        console.log("ruta"+concesionario)
    }, [concesionario])


    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(()=>{
        if(transportCompanyItems.length == 0){
            /*dataProvider.getTransportCompany('routes')
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
            
            
        }
    }, [])


    const handleChangeConcessionario = async (event: SelectChangeEvent) => {
        setTransportCompany(event.target.value);
        setTransportCompany(event.target.value);
        
        //let dataR = await getRoutes(event.target.value)

        /*let dR: any[] = []
        if(dataR != undefined){
            dR = dataR.data!;
            console.log(dR);
            setConcesionarioItems(dR);
        }  
        console.log(event.target.value+" <--> "+transportCompany)*/
    }

    const handleChangeRuta = (event: SelectChangeEvent) => {
        setConcesionario(event.target.value);
    }

    if(loading) return <Loading />

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
                <CustomSelect items={transportCompanyItems} label="Empresa" value={transportCompany} handleChange={handleChangeConcessionario} />
                <CustomSelect items={concesionarioItems} label="Concesionario(Ruta)" value={concesionario} handleChange={handleChangeRuta} />

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

