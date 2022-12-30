import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { List, useDataProvider } from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, useMediaQuery, Theme, SelectChangeEvent, Button, Typography } from '@mui/material';

import AlertListDesktop from './AlertListDesktop';
import AlertListMobile from './AlertListMobile';
import CustomSelect from './CustomSelect';

const AlertList = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );

    //Items para el dropdown
    const [transportCompanyItems, setTransportCompanyItems] = useState<any[]>([]);
    const [routeItems, setRouteItems] = useState<any[]>([]);

    const [transportCompany, setTransportCompany] = useState("");
    const [route, setRoute] = useState("");

    useEffect(() => {
        console.log("ruta: " + route)
    }, [route])


    const dataProvider = useDataProvider();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();


    useEffect(() => {
        if (transportCompanyItems.length == 0) {
            dataProvider.getTransportCompany('routes')
                .then(({ data }: any) => {
                    setTransportCompanyItems(data)
                    setLoading(false);
                    console.log(data);
                })
                .catch((error: any) => {
                    setError(error);
                    console.log(error)
                    ///setLoading(false);
                })
        }
    }, [])


    const handleChangeTransportCompany = async (event: SelectChangeEvent) => {
        setTransportCompany(event.target.value);
        dataProvider.getConcesionary('routes', { id: event.target.value })
            .then(({ data }: any) => {
                setRouteItems(data)
                //setLoading(false);
                console.log(data);
            })
            .catch((error: any) => {
                setError(error);
                console.log(error)
                //setLoading(false);
            })
    }

    const handleChangeRuta = (event: SelectChangeEvent) => {
        setRoute(event.target.value);
    }

    const handleClearFields = (e: any) => {
        if (route != "")
            setRoute("");
        setTransportCompany("");
    }

    return (
        <Box display="flex" flexDirection='column'>

            <Box width='100%' flex={1}
                sx={{
                    width: '100%',
                    justifyContent: 'space-around',
                    paddingTop: 4,
                    paddingLeft: 2
                }}>
                <Typography>
                    Filtrar por ruta de transporte:
                </Typography>
                <CustomSelect items={transportCompanyItems} label="Empresa" value={transportCompany} handleChange={handleChangeTransportCompany} />
                <CustomSelect items={routeItems} label="Ruta" value={route} handleChange={handleChangeRuta} />
                <Box>
                    <Button onClick={handleClearFields}>Limpiar Campos</Button>
                </Box>
            </Box>
            <Box width='100%' flex={1}>
                <List
                    sx={{
                        //flexGrow: 1,
                    }}
                    //filters={false}
                    queryOptions={{
                        meta: {
                            route: route
                        }
                    }}
                    perPage={10}
                    sort={{ field: 'timestamp', order: 'DESC' }}
                >
                    {isXSmall ? (
                        <AlertListMobile />
                    ) : (
                        <AlertListDesktop
                            selectedRow={undefined}
                        />
                    )}
                </List>
            </Box>
        </Box>
    );
};

export default AlertList;
