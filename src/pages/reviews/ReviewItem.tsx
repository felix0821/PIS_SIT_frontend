import * as React from 'react';
import { Fragment } from 'react';
import {
    ListItem,
    ListItemAvatar,
    ListItemText,
    Link as MuiLink,
    Box,
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

import { Review, Customer } from '../../types';
import StarRatingField from './StarRatingField';

export const ReviewItem = () => {
    const record = useRecordContext<Review>();
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
                    primary={
                        <Fragment>
                            <TextField
                                    source="routeName"
                                    variant="subtitle1"
                                />
                        </Fragment>
                    }
                    secondary={record.comment}
                    secondaryTypographyProps={{ noWrap: true }}
                />
                <ListItemText
                sx={
                    { display: 'flex', justifyContent: 'end', marginLeft: 2}
                }
                    primary={
                        <Fragment>
                            <StarRatingField size="small" label="Calificación" />
                            <DateField source='time' label="Fecha y Hora" />
                        </Fragment>
                    }
                    secondaryTypographyProps={{ noWrap: true }}
                />
                </Box>
                
            </ListItem>
        </MuiLink>
    );
};
