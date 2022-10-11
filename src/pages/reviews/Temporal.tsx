import * as React from 'react';
import { Box, Rating, Typography } from '@mui/material';
import Icon from '@mui/icons-material/Stars';

import { FieldProps, useRecordContext } from 'react-admin';

interface OwnProps {
    size?: 'large' | 'small';
}

const Temporal = ({ size = 'large' }: FieldProps & OwnProps) => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Box
            component="span"
            display="flex"
            sx={{
                opacity: 0.87,
                whiteSpace: 'nowrap',
                maxWidth: '18em',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
            }}
        >
            <Typography variant="caption" display="block" gutterBottom>
            {record.comment}
            </Typography>
        </Box>
    );
};

Temporal.defaultProps = {
    label: 'resources.reviews.fields.rating',
    source: 'rating',
};

export default Temporal;
