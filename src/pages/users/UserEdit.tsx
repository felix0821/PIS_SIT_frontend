import * as React from 'react';
import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    DateField,
    EditProps,
    DateInput
} from 'react-admin';
import { Box, Grid, Stack, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

//import StarRatingField from './StarRatingField';
import { Review, User } from '../../types';
import UserEditToolbar from './UserEditToolbar';
import DatePickerField from './DatePickerField';


const style = {
    position: "absolute",
    backgroundColor: "#FFF",
    padding: "15px",
    zIndex: "1000",
    borderRadius: ".5em",
    width: "70%",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
};

const styleMobile = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: "90%",
    maxHeight: "80%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
    bgcolor: 'background.paper',
    borderRadius: ".5em",
    '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'orange',
        borderRadius: ".5em"
    },
};

const styleTablet = {
    position: "fixed",
    display: "flex",
    justifyContent: "center",
    top: "50%",
    left: "50%",
    transform: 'translate(-50%, -50%)',
    width: "60%",
    maxHeight: "80%",
    backgroundColor: "rgba(0,0,0, .8)",
    zIndex: "1000",
    overflowY: "auto",
    bgcolor: 'background.paper',
    borderRadius: ".5em",
    '&::-webkit-scrollbar': {
        width: '0.4em',
        height: '0.4em'
    },
    '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'orange',
        borderRadius: ".5em"
    },
};

interface Props extends EditProps<User> {
    onCancel: () => void;
}

const UserEdit = ({ onCancel, ...props }: Props) => {
    const translate = useTranslate();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={smDown ? styleMobile : mdDown ? styleTablet : /*style*/styleTablet} paddingY={4}>
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
                        <Box>
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

                            <DateInput
                                source="birth"
                                maxRows={1}
                                fullWidth
                            />

                            
                            {/*<TextInput
                                source="email"
                                maxRows={1}
                                fullWidth
                            />
                            <TextInput
                                source="dni"
                                maxRows={1}
                                fullWidth
                            />
                            <TextInput
                                source="rol"
                                maxRows={1}
                                fullWidth
    />*/}
                        </Box>

                    </SimpleForm>
                </Box>
            </EditBase>
        </Box>
    );
};

export default UserEdit;

