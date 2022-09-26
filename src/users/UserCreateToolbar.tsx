import * as React from 'react';
import { Fragment } from 'react';
import Toolbar from '@mui/material/Toolbar';

import {
    SaveButton,
    DeleteButton,
    ToolbarProps,
    useRecordContext,
    useNotify,
    useRedirect,
    DeleteWithConfirmButton,
} from 'react-admin';
import AcceptButton from './AcceptButton';
import RejectButton from './RejectButton';
import { User } from '../types';
interface Props extends ToolbarProps {
    onFinish: () => void;
}


const UserCreateToolbar = ({ onFinish, ...props }: Props) => {
    const { resource } = props;
    const redirect = useRedirect();
    const notify = useNotify();

    return (
        <Toolbar
            sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: { sm: 0 },
            }}
        >
            <Fragment>
                <SaveButton
                    mutationOptions={{
                        onSuccess: () => {
                            notify('ra.notification.created', {
                                type: 'info',
                                messageArgs: { smart_count: 1 },
                                undoable: true,
                            });
                            //redirect('list', 'users');
                            onFinish()
                        },
                    }}
                    type="button"
                />
            </Fragment>
        </Toolbar>
    );
};

export default UserCreateToolbar;
