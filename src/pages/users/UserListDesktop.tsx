import {
    Datagrid, DeleteWithConfirmButton, Identifier, TextField
} from 'react-admin';
import CustomEditButton from './components/CustomEditButton';
import CustomEditRoleButton from './components/CustomEditRoleButton';

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
        bulkActionButtons={false}
    >
        <TextField source="name" label="Nombres" />
        <TextField source="lastnameFather" label="Apellido Paterno" />
        <TextField source="lastnameMother" label="Apellido Materno" />
        <TextField source="email" label="Correo Electrónico" overflow='hidden' textOverflow='ellipsis' whiteSpace='nowrap'/>
        <CustomEditButton id={selectedRow} />
        <CustomEditRoleButton id={selectedRow} />
        <DeleteWithConfirmButton/>
    </Datagrid>
);


export default UserListDesktop;
