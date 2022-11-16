import {
    Box,
    Link as MuiLink, ListItem, ListItemText
} from '@mui/material';
import { Fragment } from 'react';
import {
    DeleteWithConfirmButton,
    TextField, useCreatePath, useRecordContext
} from 'react-admin';
import { Link } from 'react-router-dom';
import CustomEditButton from './components/CustomEditButton';


export const UserItem = () => {
    const record = useRecordContext();
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (
        <MuiLink
            to=''
            component={Link}
            underline="none"
            color="inherit"
        >
            <ListItem button>
                <ListItemText
                    primary={
                        <Box display='flex' justifyContent='space-between' alignItems='center'>
                            {record.name + ", " + record.lastnameFather + " " + record.lastnameMother}
                            <Box display='flex' flexDirection='row' alignItems='center'>
                                <CustomEditButton />
                                <DeleteWithConfirmButton />
                            </Box>

                        </Box>
                    }
                    secondary={record.email}
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </ListItem>
        </MuiLink>
    );
};
