import * as React from 'react';
import { Box, Rating } from '@mui/material';
import Icon from '@mui/icons-material/Stars';

import { FieldProps, useRecordContext } from 'react-admin';

interface OwnProps {
    size?: 'large' | 'small';
}

const StarRatingField2 = ({ size = 'large' }: FieldProps & OwnProps) => {
    const record = useRecordContext();
    if (!record) return null;

    return (
        <Box
            component="span"
            display="flex"
            sx={{
                opacity: 0.87,
                whiteSpace: 'nowrap',
            }}
        >
            <Rating name="read-only" value={record.score} readOnly />
        </Box>
    );
};

StarRatingField2.defaultProps = {
    label: 'resources.reviews.fields.rating',
    source: 'rating',
};

export default StarRatingField2;
