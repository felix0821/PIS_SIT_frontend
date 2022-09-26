import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    Labeled,
    Toolbar,
    SaveButton,
    useNotify,
    DateInput,
    PasswordInput,
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//import StarRatingField from './StarRatingField';
import { Review, User } from '../types';
import UserEditToolbar from './UserEditToolbar';

interface Props extends EditProps<User> {
    onCancel: () => void;
}

const UserEdit = ({ onCancel, ...props }: Props) => {
    const translate = useTranslate();
    return (
        <EditBase {...props}>
            <Box /*pt={5}*/ width={{ xs: '100vW', sm: 400 }} mt={{ xs: 2, sm: 1 }}>
                <Stack direction="row" p={2}>
                    <Typography variant="h6" flex="1">
                        {"Editar persona"}
                    </Typography>
                    <IconButton onClick={onCancel} size="small">
                        <CloseIcon />
                    </IconButton>
                </Stack>
                <SimpleForm
                    sx={{ pt: 0, pb: 0 }}
                    toolbar={<UserEditToolbar onFinish={onCancel} />}
                >
                    <TextInput
                        source="name"
                        maxRows={1}
                        fullWidth
                    />
                    <TextInput
                        source="lastnameFather"
                        maxRows={1}
                        fullWidth
                    />
                    <TextInput
                        source="lastnameMother"
                        maxRows={1}
                        fullWidth
                    />
                    <TextInput
                        source="birth"
                        maxRows={1}
                        fullWidth
                    />

                </SimpleForm>
            </Box>
        </EditBase>
    );
};

export default UserEdit;

