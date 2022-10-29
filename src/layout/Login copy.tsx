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
} from '@mui/material';
import {
    Form,
    required,
    TextInput,
    useTranslate,
    useLogin,
    useNotify
} from 'react-admin';

import Box from '@mui/material/Box';

const Login2 = () => {
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

    return (
        <Form onSubmit={handleSubmit} noValidate>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '100vh',
                    alignItems: 'center',
                    justifyContent: 'flex-start',
                }}
            >
                <Card sx={{ minWidth: 300, marginTop: '1em' }}>
                    <Box
                        component="img"
                        sx={{
                            maxHeight: { xs: 167, md: 525 },
                            maxWidth: { xs: 317, md: 850 },
                            margin: '1em',
                            display: 'flex',
                            justifyContent: 'center',
                        }}
                        alt="SIT Logo"
                        src= {logo}
                    >
                    </Box>
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
                            sx= {{color: '#fff'}}
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

Login2.propTypes = {
    authProvider: PropTypes.func,
    previousRoute: PropTypes.string,
};

export default Login2;

interface FormValues {
    username?: string;
    password?: string;
}
