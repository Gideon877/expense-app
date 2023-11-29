import React, { useContext, useState } from 'react'
import { styled, useTheme } from '@mui/material/styles';
import { Grid, Box, Toolbar, IconButton, List, ListItemText, CssBaseline, Typography, Divider, ListItem, ListItemButton, ListItemIcon, Avatar, Button, Badge, Fab } from '@mui/material';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { AuthContext } from '../context/AuthContext';
import { auth } from '../firebase'
import { signOut } from 'firebase/auth';

import HomeIcon from '@mui/icons-material/HomeOutlined';
import GroupOutlined from '@mui/icons-material/GroupOutlined';
import PlaylistAddCheckOutlinedIcon from '@mui/icons-material/PlaylistAddCheckOutlined';
import SettingsIcon from '@mui/icons-material/SettingsOutlined';
import AddIcon from '@mui/icons-material/Add';


import LogoutIcon from '@mui/icons-material/LogoutOutlined';
import ManageAccountsIcon from '@mui/icons-material/ManageAccountsOutlined';
import ListMenuIcon from '../components/ListMenuIcon';
// import Settings from '../components/account/Settings';
// import Account from '../components/account/Account';

import ExpenseTracker from '../components/ExpenseTracker';
import Summary from '../components/Summary';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);


const dashboard = [
    {
        text: 'Dashboard', icon: <HomeIcon color='success' />,
    },
    {
        text: 'Category', icon: <GroupOutlined color='success' />,
    },
    // {
    //     text: 'Bookings', icon: <Badge badgeContent={4} color="primary">
    //         <PlaylistAddCheckOutlinedIcon color="success" />
    //     </Badge>
    //     ,
    // }
];

const account = [
    {
        text: 'Settings', icon: <SettingsIcon color='primary' />,
    },
    {
        text: 'Account', icon: <ManageAccountsIcon color='primary' />,
    },

];

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: 30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = useState(true);
    const [addIconOpen, setAddIconOpen] = useState(true);
    const { currentUser } = useContext(AuthContext);
    const [active, setActive] = useState('Dashboard');


    const handleLogout = () => {
        signOut(auth);
    };
    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={open}>
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{
                            marginRight: 5,
                            ...(open && { display: 'none' }),
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    {/* <StyledFab color="secondary" aria-label="add">
                        <AddIcon />
                    </StyledFab> */}
                    <Typography variant="h6" noWrap component="div">
                        Craft Masters Hub
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer variant="permanent" open={open}>
                <DrawerHeader>

                    <Avatar src={currentUser.photoURL} alt={currentUser.displayName} />
                    <Box
                        display='inline'
                        padding={1}
                    >
                        <Typography variant="subtitle1">{currentUser.displayName}</Typography>
                        <Typography variant="caption">{currentUser.email}</Typography>
                    </Box>

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <ListMenuIcon setActive={setActive} list={dashboard} active={active} open={open} />
                <Divider />
                {/* <ListMenuIcon setActive={setActive} list={account} active={active} open={open} /> */}
                <Divider />
                <ListItem key='logout' onClick={handleLogout} disablePadding sx={{ display: 'block' }}>
                    <ListItemButton
                        sx={{
                            minHeight: 48,
                            justifyContent: open ? 'initial' : 'center',
                            px: 2.5,
                            color: 'warning'
                        }}

                    >
                        <ListItemIcon
                            sx={{
                                minWidth: 0,
                                mr: open ? 3 : 'auto',
                                justifyContent: 'center',
                            }}
                        >
                            <LogoutIcon color='warning' />
                        </ListItemIcon>
                        <ListItemText primary={'Logout'} sx={{ opacity: open ? 1 : 0 }} />
                    </ListItemButton>
                </ListItem>
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                <DrawerHeader />
                <Grid container spacing={2}>
                    {active === 'Dashboard' && <ExpenseTracker />}
                    {active === 'Category' && <Summary />}
                    {/* {active === 'Bookings' && <Bookings />}
                    {active === 'Settings' && <Settings />}
                    {active === 'Account' && <Account />} */}

                </Grid>
            </Box>
        </Box>
    );
}
