import * as React from 'react';
import {
    Identifier,
    Datagrid,
    DateField,
    TextField,
    BulkDeleteButton,
} from 'react-admin';


import StarRatingField from './StarRatingField';
import rowStyle from './rowStyle';

import BulkAcceptButton from './BulkAcceptButton';
import BulkRejectButton from './BulkRejectButton';
import { Rating, Typography } from '@mui/material';
import StarRatingField2 from './StarRatingField2';
import Temporal from './Temporal';

export interface ReviewListDesktopProps {
    selectedRow?: Identifier;
}

const ReviewsBulkActionButtons = () => (
    <>
        <BulkAcceptButton />
        <BulkRejectButton />
        <BulkDeleteButton />
    </>
);

const ReviewListDesktop = ({ selectedRow }: ReviewListDesktopProps) => (
    <Datagrid
        rowClick="show"
        rowStyle={rowStyle(selectedRow)}
        optimized
        //bulkActionButtons={<ReviewsBulkActionButtons />}
        bulkActionButtons={false}
        sx={{
            '& .RaDatagrid-thead': {
                borderLeftColor: 'transparent',
                borderLeftWidth: 5,
                borderLeftStyle: 'solid',
            },
            '& .column-comment': {
                maxWidth: '18em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
            },
        }}
    >
        <TextField source="index" label="" />
        <TextField source="routeName" label="Nombre de ruta" />
        
        <StarRatingField2 size="small" label="Calififcación" />
        <Temporal label="Comentario"></Temporal>
        <DateField source='time' label="Fecha y Hora" />
    </Datagrid>
);

export default ReviewListDesktop;
