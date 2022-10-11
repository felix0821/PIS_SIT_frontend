import * as React from 'react';
import { AppBar, Logout, UserMenu, useTranslate } from 'react-admin';
import { Link } from 'react-router-dom';
import {
    Box,
    MenuItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useMediaQuery,
    Theme,
    Icon,
    IconButton,
    Button,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import AlertsMenu from './AlertsMenu';

const Perfil = React.forwardRef((props, ref) => {
    const translate = useTranslate();
    return (
        <MenuItem
            component={Link}
            // @ts-ignore
            ref={ref}
            {...props}
            to="/perfil"
        >
            <ListItemIcon>
                <PersonIcon />
                <PersonIcon />
            </ListItemIcon>
            <ListItemText>{translate('Perfil')}</ListItemText>
        </MenuItem>
    );
});
const CustomUserMenu = () => (
    <UserMenu>
        <Perfil />
        <Logout />
    </UserMenu>
);

const CustomAppBar = (props: any) => {
    const isLargeEnough = useMediaQuery<Theme>(theme =>
        theme.breakpoints.up('sm')
    );
    return (
        <AppBar
            {...props}
            color="secondary"
            elevation={1}
            userMenu={<CustomUserMenu />}
        >
            <Typography
                variant="h6"
                color="inherit"
                sx={{
                    flex: 5,
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                        
                }}
                id="react-admin-title"
            />
            <Box sx={{flex: 1, display: 'flex',justifyContent: 'end'}}>
            <AlertsMenu />
            </Box>
            
            
           
            {isLargeEnough && <Box component="span" sx={{ flex: 0 }} />}
        </AppBar>
    );
};

export default CustomAppBar;
