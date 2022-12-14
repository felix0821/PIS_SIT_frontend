import * as React from 'react';
import { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import logo from '../assets/Logo.png'

import {
    Button,
    Card,
    CardActions,
    CircularProgress,
    Theme,
    Typography,
    useMediaQuery,
} from '@mui/material';
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify,
    useTheme
} from 'react-admin';

import Box from '@mui/material/Box';

const Login = () => {
    const [loading, setLoading] = useState(false);
    const translate = useTranslate();

    const notify = useNotify();
    const login = useLogin();
    const location = useLocation();

    const handleSubmit = (auth: FormValues) => {
        setLoading(true);
        login(
            auth,
            location.state ? (location.state as any).nextPathname : '/'
        ).catch((error: Error) => {
            setLoading(false);
            notify(
                typeof error === 'string'
                    ? error
                    : typeof error === 'undefined' || !error.message
                        ? 'ra.auth.sign_in_error'
                        : error.message,
                {
                    type: 'warning',
                    messageArgs: {
                        _:
                            typeof error === 'string'
                                ? error
                                : error && error.message
                                    ? error.message
                                    : undefined,
                    },
                }
            );
        });
    };

    const mdDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: mdDown ? 'column' : 'row',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: mdDown ? 'flex-start' : 'space-evenly',
                    gap: 4
                }}
            >
                {!mdDown && (

                    <Box display='flex' justifyContent='center' maxWidth={600}>
                        <Box

                            component="img"
                            sx={{
                                maxWidth: '100%',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            alt="SIT Logo"
                            src={logo}
                        >
                        </Box>

                    </Box>
                )}


                <Card sx={{ minWidth: mdDown ? 300 : 400, marginTop: '1em'}}>
                    {mdDown ? (
                        <Box
                            component="img"
                            sx={{
                                maxHeight: { xs: 167 },
                                maxWidth: { xs: 317 },
                                margin: '1em',
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                            alt="SIT Logo"
                            src={logo}
                        >
                        </Box>
                    ) : (
                        <Typography variant='h3' display='flex' justifyContent='center' marginY={2}>Iniciar sesi??n</Typography>
                    )}
                    <Box sx={{ padding: '0 1em 1em 1em' }}>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                autoFocus
                                source="username"
                                label={translate('ra.auth.username')}
                                disabled={loading}
                                validate={required()}
                                fullWidth
                            />
                        </Box>
                        <Box sx={{ marginTop: '1em' }}>
                            <TextInput
                                source="password"
                                label={translate('ra.auth.password')}
                                type="password"
                                disabled={loading}
                                validate={required()}
                                fullWidth
                            />
                        </Box>
                    </Box>
                    <CardActions sx={{ padding: '0 1em 1em 1em' }}>
                        <Button
                            variant="contained"
                            type="submit"
                            disabled={loading}
                            fullWidth
                            sx={{ color: '#fff' }}
                        >
                            {loading && (
                                <CircularProgress size={25} thickness={2} />
                            )}
                            {translate('ra.auth.sign_in')}
                        </Button>
                    </CardActions>
                </Card>
            </Box>
        </Form>
    );
};

Login.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

export default Login;

interface FormValues {
    username?: string;
    password?: string;
}
