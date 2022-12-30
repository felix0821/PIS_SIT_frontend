import {
    Identifier,
    Datagrid,
    TextField,
    DateField,
    useRecordContext,
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
        <TextField source="plate" label="Placa" />
        <TextField source="codeSoat" label="Código de SOAT" />
        <DateField source="register" label="Fecha de registro" />
        
    </Datagrid>
);


interface DriverFieldProps {
    source: any,
    label: any
}

const DriverField = ({ source, label }: DriverFieldProps) => {
    const record = useRecordContext();
    //<Chip label={record.status?.name} color={(record.status?.id == "3000001000002")? "success" : "warning"} sx={{height: '20px'}}/>
    return (
        <p>{record.driver}</p>
    ) ;
}


export default VehicleListDesktop;
