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
import BasicModal from './BasicModal';

import rowStyle from './rowStyle';

//import BulkAcceptButton from './BulkAcceptButton';
//import BulkRejectButton from './BulkRejectButton';
import { FunctionField } from 'react-admin';

export interface UserListDesktopProps {
    selectedRow?: Identifier;
}

/*const UsersBulkActionButtons = () => (
    <>
        <BulkAcceptButton />
        <BulkRejectButton />
        <BulkDeleteButton />
    </>
);*/

const UserListDesktop = ({ selectedRow }: UserListDesktopProps) => (
    <Datagrid
        //rowClick="edit"
        rowStyle={rowStyle(selectedRow)}
        optimized
        //bulkActionButtons={<UsersBulkActionButtons />}
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
        <FunctionField label="Nombre y Apellidos" 
        render={
            (record: { 
                name: string;
                lastnameFather: string;
                lastnameMother: string }
            ) => `${record.name}, ${record.lastnameFather} ${record.lastnameMother}`} />
        <TextField source="email" label="Correo Electrónico"/>
        {/*<DateField source="date" />
        <CustomerReferenceField link={false} />
        <ProductReferenceField link={false} />
    <StarRatingField size="small" />*/}
        {/*<TextField source="username" />
        {/*<TextField source="email" />
        <TextField source="phone" />
        <TextField source="password" />*/}
        <BasicModal id={selectedRow}/>
        <DeleteWithConfirmButton label='Eliminar' />
    </Datagrid>
);


export default UserListDesktop;
