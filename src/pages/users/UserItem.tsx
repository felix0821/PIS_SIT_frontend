import {
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
            to={createPath({
                resource: 'users',
                type: 'edit',
                id: record.id,
            })}
            component={Link}
            underline="none"
            color="inherit"
        >
            <ListItem button>
                <ListItemText
                    primary={
                        <Fragment>
                            <TextField source="name" label="Nombres" />
                            <TextField source="lastnameFather" label="Apellido Paterno" />
                            <TextField source="lastnameMother" label="Apellido Materno" />
                            <DeleteWithConfirmButton />
                        </Fragment>
                    }
                    secondary={record.email}
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </ListItem>
        </MuiLink>
    );
};
