import {
    EditBase,
    useTranslate,
    TextInput,
    SimpleForm,
    EditProps,
    DateInput
} from 'react-admin';
import { Box, Stack, IconButton, Typography, useTheme, useMediaQuery } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import { User } from '../../../types';
import UserEditToolbar from './UserEditToolbar';


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

const UserRoleEdit = ({ onCancel, ...props }: Props) => {
    const translate = useTranslate();

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));

    return (
        <Box sx={smDown ? styleMobile : mdDown ? styleTablet : /*style*/styleTablet} paddingY={4}>
            Por hacer
        </Box>
    );
};

export default UserRoleEdit;

