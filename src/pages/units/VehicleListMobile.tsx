import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';
import { RecordContextProvider, useListContext } from 'react-admin';

import { VehicleItem } from './VehicleItem';
import { Vehicle } from '../../types';

const VehicleListMobile = () => {
    const { data, isLoading, total } = useListContext<Vehicle>();
    if (isLoading || Number(total) === 0) {
        return null;
    }
    return (
        <List sx={{ width: '100vw' }}>
            {data.map(vehicle => (
                <RecordContextProvider value={vehicle} key={vehicle.id}>
                    <VehicleItem />
                </RecordContextProvider>
            ))}
        </List>
    );
};

VehicleListMobile.propTypes = {
    data: PropTypes.any,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    onToggleItem: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

VehicleListMobile.defaultProps = {
    hasBulkActions: false,
    selectedIds: [],
};

export default VehicleListMobile;
