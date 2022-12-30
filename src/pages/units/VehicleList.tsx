import * as React from 'react';
import { useCallback, useState, useEffect } from 'react';
import { ExportButton, List, TopToolbar, useDataProvider } from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, useMediaQuery, Theme, SelectChangeEvent, Typography, Divider } from '@mui/material';

import VehicleListMobile from './VehicleListMobile';
import VehicleListDesktop from './VehicleListDesktop';
import CustomSelect from './CustomSelect';

const VehicleList = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const location = useLocation();

    const match = matchPath('/reviews/:id', location.pathname);

    const [transportCompanyItems, setTransportCompanyItems] = useState<any[]>([]);
    const [transportCompany, setTransportCompany] = useState("");

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
    }

    return (
        <Box display="flex" sx={{ margin: 4 }}>
            <List
                sx={{
                    flexGrow: 1,
                }}
                perPage={10}
                sort={{ field: 'id', order: 'DESC' }}
                queryOptions={{
                    meta: {
                        transportCompany: transportCompany
                    }
                }}
                actions={<ListActions 
                    handleChangeTransportCompany={handleChangeTransportCompany}
                    transportCompany={transportCompany}
                    transportCompanyItems={transportCompanyItems} 
                    />}

            >
                {isXSmall ? (
                    <VehicleListMobile />
                ) : (
                    <VehicleListDesktop
                        selectedRow={
                            !!match
                                ? parseInt((match as any).params.id, 10)
                                : undefined
                        }
                    />
                )}
            </List>
        </Box>
    );
};

interface ListActionsProps {
    transportCompanyItems: any,
    transportCompany: any,
    handleChangeTransportCompany: any
}


const ListActions = ({handleChangeTransportCompany, transportCompany, transportCompanyItems}: ListActionsProps) => (
    <TopToolbar sx={{ minHeight: { sm: 56 }, alignItems: 'center', justifyContent: 'start' }}>

        <Typography>
            Filtrar por ruta de transporte:
        </Typography>
        <CustomSelect items={transportCompanyItems} label="Empresa" value={transportCompany} handleChange={handleChangeTransportCompany} />
        <Divider orientation="vertical" variant="middle" flexItem />
        <ExportButton size='medium' label="Exportar" />
    </TopToolbar>
);


export default VehicleList;
