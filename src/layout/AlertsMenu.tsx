import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import WorkIcon from '@mui/icons-material/Work';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import ReportIcon from '@mui/icons-material/Report';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ListItemButton from '@mui/material/ListItemButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import Stack from '@mui/material/Stack';
import moment from 'moment';
import {over} from 'stompjs';
import SockJS from 'sockjs-client';
import { Badge, Icon, IconButton } from '@mui/material';


var stompClient:any =null;

export default function AlertsMenu() {
    const [open, setOpen] = React.useState(false);
    const anchorRef = React.useRef<HTMLButtonElement>(null);
    var notificationCount = 0;
    const [messages, setMessages] = React.useState<any[]>([]);
    const [cantAlerts, setCantAlerts] = React.useState(notificationCount)
    const [alerts, setAlerts] = React.useState<any[]>([])

    React.useEffect(() => {
      connect()
    }, []);

    // WebSocket
    const connect =()=>{
    let Sock = new SockJS('https://sit-backend.herokuapp.com/ws');
    stompClient = over(Sock);
    stompClient.connect({},onConnected, onError);
    }
    const onConnected = () => {
            stompClient.subscribe('/route/'+'55569'+'/private', onPrivateMessage);
            //userJoin();
    }
    const onPrivateMessage = (payload:any)=>{
            console.log(payload);
            var payloadData = JSON.parse(payload.body);
            setMessages([...messages,payloadData]);
            setCantAlerts(cantAlerts+1);
    }
    const onError = (err:any) => {
           console.log(err);      
    }

    // Management Alert

    const handleToggle = () => {
        notificationCount = 3;
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

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(open);
    React.useEffect(() => {
        if (prevOpen.current === true && open === false) {
            anchorRef.current!.focus();
        }
        if(open === true) {
            setCantAlerts(0);
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
                            <Paper sx={{ width: 320, maxWidth: '100%', bgcolor: 'background.paper' }}>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <List 
                                        aria-labelledby="composition-button"
                                        id="composition-menu"
                                        onKeyDown={handleListKeyDown}
                                    >
                                    {messages.map((i:any)=>(
                                        <ListItem
                                            key={i.sessionId} 
                                            secondaryAction={
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
                                            }
                                            disablePadding
                                        >
                                            <ListItemButton onClick={handleClose}>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        <WorkIcon />
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText
                                                    primary={"Ruta "+i.gizRoute}
                                                    secondary={
                                                        <React.Fragment>
                                                            <Typography
                                                                sx={{ display: 'inline' }}
                                                                component="span"
                                                                variant="body2"
                                                                color="text.primary"
                                                            >
                                                                {" "} 
                                                            </Typography>
                                                            {"Momento ("+moment(i.sessionTimestamp).format('LLLL')+")"+
                                                            new Date(i.sessionTimestamp).getUTCHours()}
                                                        </React.Fragment>
                                                    }
                                                />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
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