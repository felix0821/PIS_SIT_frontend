import { Box, Button, Modal, Typography } from '@mui/material';
import * as React from 'react';
import {
    Identifier,
    Datagrid,
    TextField,
    BulkDeleteButton,
    EditButton,
    DeleteWithConfirmButton,
} from 'react-admin';
import CustomEditButton from './CustomEditButton';

import rowStyle from './rowStyle';

//import BulkAcceptButton from './BulkAcceptButton';
//import BulkRejectButton from './BulkRejectButton';
import { FunctionField } from 'react-admin';

export interface UserListDesktopProps {
    selectedRow?: Identifier;
}

const UserListDesktop = ({ selectedRow }: UserListDesktopProps) => (
    <Datagrid
        optimized
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
        {/*<FunctionField label="Nombre y Apellidos"
            render={
                (record: {
                    name: string;
                    lastnameFather: string;
                    lastnameMother: string
                }
            ) => `${record.name}, ${record.lastnameFather} ${record.lastnameMother}`} />*/}
        <TextField source="name" label="Nombres" />
        <TextField source="lastnameFather" label="Apellido Paterno" />
        <TextField source="lastnameMother" label="Apellido Materno" />
        <TextField source="email" label="Correo Electrónico" overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'/>
        <CustomEditButton id={selectedRow} />
        <DeleteWithConfirmButton/>
    </Datagrid>
);


export default UserListDesktop;
