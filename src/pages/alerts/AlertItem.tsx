import * as React from 'react';
import { Fragment } from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Link as MuiLink,
    Box,
    Chip,
} from '@mui/material';
import { Link } from 'react-router-dom';
import {
    useCreatePath,
    ReferenceField,
    FunctionField,
    TextField,
    useRecordContext,
    DateField,
} from 'react-admin';

import { Review, Customer, Alert } from '../../types';

export function AlertItem() {
    const record = useRecordContext<Alert>();
    const createPath = useCreatePath();
    if (!record) {
        return null;
    }
    return (
        <MuiLink
            to={createPath({
                resource: '',
                type: '',
                id: record.id,
            })}
            component={Link}
            underline="none"
            color="inherit"
        >
            <ListItem button>
                <Box display='flex' width='100%'>
                    <ListItemText
                        primary={<Fragment>
                            <TextField
                                source="gizRoute.name"
                                variant="subtitle1" />
                        </Fragment>}
                        secondary={<DateField source="timestamp" label="Fecha"/>}
                        secondaryTypographyProps={{ noWrap: true }} />
                    <ListItemText
                        sx={{ display: 'flex', justifyContent: 'end', marginLeft: 2 }}
                        primary={<Fragment>
                            <StatusField source="status.id" label="EStado"/>
                        </Fragment>}
                        secondaryTypographyProps={{ noWrap: true }} />
                </Box>

            </ListItem>
        </MuiLink>
    );
}

interface StatusFielProps {
    source: any,
    label: any
}

const StatusField = ({ source, label }: StatusFielProps) => {
    const record = useRecordContext();
    return (
        <Chip label={record.status?.name} color={(record.status?.id == "3000001000002")? "success" : "warning"} sx={{height: '20px'}}/>
    ) ;
}