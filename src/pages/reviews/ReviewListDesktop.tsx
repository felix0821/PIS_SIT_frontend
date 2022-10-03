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
        rowClick="edit"
        rowStyle={rowStyle(selectedRow)}
        optimized
        bulkActionButtons={<ReviewsBulkActionButtons />}
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
        <TextField source="routeName" label="Nombre de ruta"/>
        <TextField source="score" label="Puntuación"/>
        <TextField source="time" label="Fecha y Hora"/>
    </Datagrid>
);

export default ReviewListDesktop;
