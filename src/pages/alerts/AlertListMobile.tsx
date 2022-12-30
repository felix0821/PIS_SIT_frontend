import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';
import { RecordContextProvider, useListContext } from 'react-admin';

import { AlertItem } from './AlertItem';
import { Review } from '../../types';

const AlertListMobile = () => {
    const { data, isLoading, total } = useListContext<Review>();
    if (isLoading || Number(total) === 0) {
        return null;
    }
    return (
        <List sx={{ width: '100vw' }}>
            {data.map(review => (
                <RecordContextProvider value={review} key={review.id}>
                    <AlertItem />
                </RecordContextProvider>
            ))}
        </List>
    );
};

AlertListMobile.propTypes = {
    data: PropTypes.any,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    onToggleItem: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

AlertListMobile.defaultProps = {
    hasBulkActions: false,
    selectedIds: [],
};

export default AlertListMobile;
