import * as React from 'react';
import { Box, Card, CardActions, Button, Typography } from '@mui/material';
import { useTranslate } from 'react-admin';

import publishArticleImage from './welcome_illustration.svg';

const Welcome = () => {
    const translate = useTranslate();

    return (
        <Card
            sx={{
                background: theme => theme.palette.primary.main,
                color: '#fff',
                padding: '20px',
                marginTop: 2,
                marginBottom: '1em',
            }}
        >
            <Box display="flex">
                <Box flex="1">
                    <Typography variant="h5" component="h2" gutterBottom>
                        {translate('system.name')}
                    </Typography>
                    <CardActions
                        sx={{
                            padding: { xs: 0, xl: null },
                            flexWrap: { xs: 'wrap', xl: null },
                            '& a': {
                                marginTop: { xs: '1em', xl: null },
                                marginLeft: { xs: '0!important', xl: null },
                                marginRight: { xs: '1em', xl: null },
                            },
                        }}
                    >
                    </CardActions>
                </Box>
            </Box>
        </Card>
    );
};

export default Welcome;
