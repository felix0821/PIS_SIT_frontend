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
import { User } from '../../types';
interface Props extends ToolbarProps {
    onFinish: () => void;
}


const UserEditToolbar = ({ onFinish, ...props }: Props) => {
    const { resource } = props;
    const redirect = useRedirect();
    const notify = useNotify();

    const record = useRecordContext<User>(props);

    if (!record) return null;
    return (
        <Toolbar
            sx={{
                backgroundColor: 'background.paper',
                display: 'flex',
                justifyContent: 'space-between',
                minHeight: { sm: 0 },
                marginBottom: "40px"
            }}
        >
            {record.status === 'pending' ? (
                <Fragment>
                    <AcceptButton />
                    <RejectButton />
                </Fragment>
            ) : (
                <Fragment>
                    <SaveButton
                        mutationOptions={{
                            onSuccess: (data, vars, g) => {
                                notify('Proceso exitoso', {
                                    type: 'info',
                                    messageArgs: { smart_count: 1 },
                                    undoable: true,
                                });
                                console.log(g)
                                //redirect('list', 'users');
                                onFinish()
                            },
                        }}
                        type="button"
                        sx={{marginBottom: 4}}
                    />
                    <DeleteWithConfirmButton record={record} resource={resource} sx={{marginBottom: 4}}/>
                </Fragment>
            )}
        </Toolbar>
    );
};

export default UserEditToolbar;
