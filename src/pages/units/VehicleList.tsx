import * as React from 'react';
import { useCallback } from 'react';
import { List } from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';
import { Box, Drawer, useMediaQuery, Theme } from '@mui/material';

import VehicleListMobile from './VehicleListMobile';
import VehicleListDesktop from './VehicleListDesktop';

const VehicleList = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const location = useLocation();

    const match = matchPath('/reviews/:id', location.pathname);

    return (
        <Box display="flex" sx={{ margin: 4 }}>
            <List
                actions={false}
                sx={{
                    flexGrow: 1,
                }}
                perPage={10}
                sort={{ field: 'id', order: 'DESC' }}
                

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

export default VehicleList;
