import { ListItem, ButtonGroup, IconButton, ListItemButton, ListItemAvatar, Avatar, ListItemText, Typography } from '@mui/material'
import React from 'react'
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Moment from 'react-moment';
import WorkIcon from '@mui/icons-material/Work';
import { AlertNotification } from '../../types';
import { Info, MedicalInformation } from '@mui/icons-material';

interface NotificationProps {
    notification: AlertNotification,
    handleClose: (event: Event | React.SyntheticEvent) => void
}

export const Notification2 = ({notification, handleClose}: NotificationProps) => {

    return (
        <ListItem
            /*secondaryAction={
                <ButtonGroup
                    orientation="vertical"
                >
                    <IconButton
                        edge="end"
                        aria-label="comment"
                    >
                        <CheckCircleIcon />
                    </IconButton>
                    <IconButton
                        edge="end"
                        aria-label="comment"
                    >
                        <ReportIcon />
                    </IconButton>
                </ButtonGroup>
            }*/
            disablePadding
        >
            <ListItemButton onClick={handleClose}>
                <ListItemAvatar>
                    <Avatar>
                        <Info />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText
                    primary={"Información " + notification.title}
                    secondary={
                        <>
                            <Typography
                                sx={{ display: 'inline' }}
                                component="span"
                                variant="body2"
                                color="text.primary"
                            >
                                {" "}
                            </Typography>
                            <Moment format="LLLL" locale="es" withTitle>
                                {notification.timestamp}
                            </Moment>
                        </>
                    }
                />
            </ListItemButton>
        </ListItem>
    )
}
