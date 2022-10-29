import * as React from 'react';
import { useCallback } from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@mui/material';
import {
    ExportButton,
    FilterButton,
    FilterForm,
    FilterContext,
    InputProps,
    ListBase,
    NumberInput,
    Pagination,
    ReferenceInput,
    SearchInput,
    SelectInput,
    SortButton,
    Title,
    TopToolbar,
    useTranslate,
    useGetResourceLabel,
    List,
} from 'react-admin';
import { matchPath, useLocation, useNavigate } from 'react-router';
import UserListDesktop from './UserListDesktop';
import CustomCreateButton from './components/CustomCreateButton';
import UserListMobile from './UserListMobile';


const UserList = () => {
    const isXSmall = useMediaQuery<Theme>(theme =>
        theme.breakpoints.down('sm')
    );
    const location = useLocation();
    const navigate = useNavigate();

    const match = matchPath('/users/:id', location.pathname);
    return (
        <Box display="flex">
            
            <List
            actions={<ListActions></ListActions>}
                sx={{
                    flexGrow: 1,
                    transition: (theme: any) =>
                        theme.transitions.create(['all'], {
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                    marginRight: !!match ? '400px' : 0,
                }}
                //filters={reviewFilters}
                perPage={10}
                //sort={{ field: 'date', order: 'DESC' }}
            >
                

                {isXSmall ? (
                    <UserListMobile />
                ) : (
                    <UserListDesktop />
                )}


            </List>
           
        </Box>
    );
};



const ListActions = () => (
    <TopToolbar sx={{ minHeight: { sm: 56 }, alignItems: 'center', justifyContent: 'start'} }>
       
        <CustomCreateButton></CustomCreateButton>
        <ExportButton size='medium' label="Exportar"/>
    </TopToolbar>
);

export default UserList;
