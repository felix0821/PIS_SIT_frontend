import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import { useEffect, useRef, useState } from 'react';

import List from '@mui/material/List';

import { Badge, Icon, IconButton, ThemeProvider } from '@mui/material';
import Stack from '@mui/material/Stack';
import 'moment-timezone';
import 'moment/locale/es';
import { useDataProvider, useNotify } from 'react-admin';
import { AlertNotification } from '../types';
import { Notification } from './components/Notification';
import { useAlertNotificationWebSocket } from '../custom-hooks';
import React from 'react';
import { Notification2 } from './components/Notification2';

export default function AlertsMenu() {
    const [open, setOpen] = useState(false);
    const anchorRef = useRef<HTMLButtonElement>(null);
    const [notifications, setNotifications] = useState<AlertNotification[]>([{ id: "fef3", image: "fwf", specification: "fewf", title: "Notificación", type: "fer", timestamp: "2022-11-10T14:10:21+00:00" }]);
    const [cantAlerts, setCantAlerts] = useState(0)

    const { connect, newNotifify } = useAlertNotificationWebSocket();

    const dataProvider = useDataProvider();
    const notify = useNotify();

    useEffect(() => {
        dataProvider.getNotifications('alerts')
            .then(({ data }: any) => {
                setNotifications(data.allNotification)
                console.log(data);
                setCantAlerts(data.pending);
                //setLoading(false);

            })
            .catch((error: any) => {
                //setError(error);
                console.log('Error ' + error.status + ': ' + error.body.content);
                
                //setLoading(false);
            })
        connect()

    }, []);

    useEffect(() => {
        if (newNotifify.id == "") return
        setNotifications([newNotifify, ...notifications]);
        setCantAlerts(cantAlerts + 1);

    }, [newNotifify])

    const handleToggle = () => {
        if(cantAlerts > 0){
            dataProvider.notificationsChecked('alerts')
            .then(({ data }: any) => {
                console.log(data);
            })
            .catch((error: any) => {
                console.log('Error ' + error.status + ': ' + error.body.content);
            })
            setCantAlerts(0);
        }
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event: Event | React.SyntheticEvent) => {
        if (
            anchorRef.current &&
            anchorRef.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    function handleListKeyDown(event: React.KeyboardEvent) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setOpen(false);

        } else if (event.key === 'Escape') {
            setOpen(false);
        }
    }

    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        if (open === true) {
            //setCantAlerts(0);
        }
        prevOpen.current = open;
    }, [open]);

    return (
        <Stack direction="row" spacing={2}>
            <div>
                <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                >
                    <Badge badgeContent={cantAlerts} color="primary">
                        <Icon>notifications</Icon>
                    </Badge>
                </IconButton>

                <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper sx={{ width: 320, maxWidth: '100%', bgcolor: 'background.paper', maxHeight: 400, overflow: 'auto' }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <List
                                        aria-labelledby="composition-button"
                                        id="composition-menu"
                                        onKeyDown={handleListKeyDown}
                                    >

                                        {notifications.map((i: AlertNotification) => (
                                            <Notification key={i.id} notification={i} handleClose={handleClose} />
                                        ))}
                                        {/*notifications.map((i: AlertNotification) => (
                                            <Notification2 key={i.id} notification={i} handleClose={handleClose} />
                                        ))*/}

                                    </List>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}