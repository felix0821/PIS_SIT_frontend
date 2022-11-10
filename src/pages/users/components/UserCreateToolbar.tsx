import Toolbar from '@mui/material/Toolbar';
import { Fragment } from 'react';

import {
    SaveButton, ToolbarProps, useNotify,
    useRedirect
} from 'react-admin';

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
