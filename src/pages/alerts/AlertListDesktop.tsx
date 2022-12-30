import * as React from 'react';
import {
    Identifier,
    Datagrid,
    DateField,
    TextField,
    BulkDeleteButton,
    NumberField,
    useRecordContext,
} from 'react-admin';

import rowStyle from './rowStyle';

import { Chip, Rating, Typography } from '@mui/material';
import { Alert } from '../../types';

export interface AlertListDesktopProps {
    selectedRow?: Identifier;
}

const ReviewListDesktop = ({ selectedRow }: AlertListDesktopProps) => {

    //const record = useRecordContext<Alert>();
    //console.log(selectedRow);

    return (
        <Datagrid
            //rowClick="show"
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
            <TextField source="gizRoute.name" label="Nombre de ruta"/>
            <DateField source="timestamp" label="Fecha"/>
            <StatusField source="status.id" label="Estado" />
        </Datagrid>
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

export default ReviewListDesktop;
