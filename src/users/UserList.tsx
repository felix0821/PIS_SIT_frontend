import * as React from 'react';
import { useCallback } from 'react';
import { Box, Chip, useMediaQuery, Theme } from '@mui/material';
import {
    CreateButton,
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
import BasicModal from './BasicModalCreate';
import BasicModalCreate from './BasicModalCreate';


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
                <UserListDesktop
                        selectedRow={
                            !!match
                                ? parseInt((match as any).params.id, 10)
                                : undefined
                        }
                    />
            </List>
           
        </Box>
    );
};

const QuickFilter = ({ label }: InputProps) => {
    const translate = useTranslate();
    return <Chip sx={{ mb: 1 }} label={translate(label as string)} />;
};



const ListActions = () => (
    <TopToolbar sx={{ minHeight: { sm: 56 }, }}>
       
       <BasicModalCreate></BasicModalCreate>
        <ExportButton label="Exportar" sx={{margin: 0, padding: 0}}/>
    </TopToolbar>
);

export default UserList;
