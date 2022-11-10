import ThumbUp from '@mui/icons-material/ThumbUp';
import Button from '@mui/material/Button';
import PropTypes from 'prop-types';
import {
    useNotify, useRecordContext, useRedirect, useTranslate,
    useUpdate
} from 'react-admin';

/**
 * This custom button demonstrate using useUpdate to update data
 */
const AcceptButton = () => {
    const translate = useTranslate();
    const notify = useNotify();
    const redirectTo = useRedirect();
    const record = useRecordContext();

    const [approve, { isLoading }] = useUpdate(
        'users',
        { id: record.id, data: { status: 'accepted' }, previousData: record },
        {
            mutationMode: 'undoable',
            onSuccess: () => {
                notify('resources.reviews.notification.approved_success', {
                    type: 'info',
                    undoable: true,
                });
                redirectTo('/reviews');
            },
            onError: () => {
                notify('resources.reviews.notification.approved_error', {
                    type: 'warning',
                });
            },
        }
    );
    return record && record.status === 'pending' ? (
        <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={() => approve()}
            startIcon={<ThumbUp sx={{ color: 'green' }} />}
            disabled={isLoading}
        >
            {translate('resources.reviews.action.accept')}
        </Button>
    ) : (
        <span />
    );
};

AcceptButton.propTypes = {
    record: PropTypes.any,
};

export default AcceptButton;
