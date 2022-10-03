import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import LabelIcon from '@mui/icons-material/Label';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';

import {
    useTranslate,
    DashboardMenuItem,
    MenuItemLink,
    MenuProps,
    useSidebarState,
} from 'react-admin';


import alerts from '../pages/alerts';
import units from '../units';
import users from '.././pages/users';
import routes from '.././pages/routes';
import reviews from '.././pages/reviews';

import SubMenu from './SubMenu';

type MenuName =  'menuSit';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuSit: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                marginTop: 1,
                marginBottom: 1,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
            }}
        >
            <DashboardMenuItem/>
            <MenuItemLink
                to="/users"
                state={{ _scrollToTop: true }}
                primaryText={translate(`Personas`, {
                    smart_count: 2,
                })}
                leftIcon={<users.icon />}
                dense={dense}
            />
                        <MenuItemLink
                to="/alerts"
                state={{ _scrollToTop: true }}
                primaryText={translate(`Alertas`, {
                    smart_count: 2,
                })}
                leftIcon={<alerts.icon />}
                dense={dense}
            />
            <MenuItemLink
                to="/reviews"
                state={{ _scrollToTop: true }}
                primaryText={translate(`Calificaciones`, {
                    smart_count: 2,
                })}
                leftIcon={<reviews.icon />}
                dense={dense}
            />
            <SubMenu
                handleToggle={() => handleToggle('menuSit')}
                isOpen={state.menuSit}
                name="Gestion SIT"
                icon= {<ManageAccountsIcon /> }
                dense={dense}
            >
                <MenuItemLink
                    to="/units"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`Unidades`, {
                        smart_count: 2,
                    })}
                    leftIcon={<units.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/routes"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`Rutas`, {
                        smart_count: 2,
                    })}
                    leftIcon={<routes.icon />}
                    dense={dense}
                />
            </SubMenu>
        </Box>
    );
};

export default Menu;
