import * as React from 'react';
import PropTypes from 'prop-types';
import { List } from '@mui/material';
import { RecordContextProvider, useListContext } from 'react-admin';

import { UserItem } from './UserItem';

const UserListMobile = () => {
    const { data, isLoading, total } = useListContext();
    if (isLoading || Number(total) === 0) {
        return null;
    }
    return (
        <List sx={{ width: '100vw' }}>
            {data.map(user => (
                <RecordContextProvider value={user} key={user.id}>
                    <UserItem />
                </RecordContextProvider>
            ))}
        </List>
    );
};

UserListMobile.propTypes = {
    data: PropTypes.any,
    hasBulkActions: PropTypes.bool.isRequired,
    ids: PropTypes.array,
    onToggleItem: PropTypes.func,
    selectedIds: PropTypes.arrayOf(PropTypes.any).isRequired,
};

UserListMobile.defaultProps = {
    hasBulkActions: false,
    selectedIds: [],
};

export default UserListMobile;
