import {
    Identifier,
    Datagrid,
    TextField,
} from 'react-admin';

import rowStyle from './rowStyle';
export interface VehicleListDesktopProps {
    selectedRow?: Identifier;
}

const VehicleListDesktop = ({ selectedRow }: VehicleListDesktopProps) => (
    <Datagrid
        rowStyle={rowStyle(selectedRow)}
        optimized
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
        <TextField source="value" label="ID" />
        <TextField source="text" label="Nombre de vehículo" />
        <TextField source="conductor" label="Nombre de conductor" />
    </Datagrid>
);

export default VehicleListDesktop;
