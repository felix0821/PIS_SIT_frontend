import {
    ListItem,
    ListItemText,
    Link as MuiLink,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    useCreatePath,
    TextField,
    useRecordContext,
} from 'react-admin';

import { Vehicle } from '../../types';

export const VehicleItem = () => {
    const record = useRecordContext<Vehicle>();
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (
        <MuiLink
            to={createPath({
                resource: 'units',
                type: 'show',
                id: record.id,
            })}
            component={Link}
            underline="none"
            color="inherit"
        >
            <ListItem button>
                <ListItemText
                    primary={
                        <>
                            <TextField
                                source="value"
                                variant="subtitle1"
                            />
                            <TextField
                                source="text"
                                variant="subtitle1"
                            />
                        </>
                    }
                    secondary={record.value}
                    secondaryTypographyProps={{ noWrap: true }}
                />
            </ListItem>
        </MuiLink>
    );
};
