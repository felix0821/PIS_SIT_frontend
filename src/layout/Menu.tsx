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
    useTheme,
} from 'react-admin';


import alerts from '../pages/alerts';
import units from '../pages/units';
import users from '.././pages/users';
import routes from '.././pages/routes';
import reviews from '.././pages/reviews';

import SubMenu from './SubMenu';

type MenuName = 'menuSit';

const Menu = ({ dense = false }: MenuProps) => {
    const [state, setState] = useState({
        menuSit: true,
    });
    const translate = useTranslate();
    const [open] = useSidebarState();

    const handleToggle = (menu: MenuName) => {
        setState(state => ({ ...state, [menu]: !state[menu] }));
    };

    const [theme] = useTheme();

    return (
        <Box
            sx={{
                width: open ? 200 : 50,
                height: '100%',
                bgcolor: theme.palette?.background?.paper,
                transition: theme =>
                    theme.transitions.create('width', {
                        easing: theme.transitions.easing.sharp,
                        duration: theme.transitions.duration.leavingScreen,
                    }),
                
            }}
        >
            <Box
            sx={{
                paddingTop: 1,
                paddingBottom: 1,
            }}
            >
                <DashboardMenuItem />
                <MenuItemLink
                    to="/users"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.users.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<users.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/alerts"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.alerts.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<alerts.icon />}
                    dense={dense}
                />
                <MenuItemLink
                    to="/reviews"
                    state={{ _scrollToTop: true }}
                    primaryText={translate(`resources.reviews.name`, {
                        smart_count: 2,
                    })}
                    leftIcon={<reviews.icon />}
                    dense={dense}
                />
                <SubMenu
                    handleToggle={() => handleToggle('menuSit')}
                    isOpen={state.menuSit}
                    name={`resources.manageSIT.name`}
                    icon={<ManageAccountsIcon />}
                    dense={dense}
                >
                    <MenuItemLink
                        to="/units"
                        state={{ _scrollToTop: true }}
                        primaryText={translate(`resources.manageSIT.units.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<units.icon />}
                        dense={dense}
                    />
                    <MenuItemLink
                        to="/routes"
                        state={{ _scrollToTop: true }}
                        primaryText={translate(`resources.manageSIT.routes.name`, {
                            smart_count: 2,
                        })}
                        leftIcon={<routes.icon />}
                        dense={dense}
                    />
                </SubMenu>
                
            </Box>
        </Box>
    );
};

export default Menu;
