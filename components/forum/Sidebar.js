import React, { useState, useContext } from 'react';
import { CssBaseline, ListItem, ListItemText, Drawer, List, Divider, Button, ListItemIcon, IconButton, Menu, MenuItem, colors } from '@material-ui/core';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/styles';
import DashboardIcon from '@material-ui/icons/DashboardOutlined';
import AssignmentIcon from '@material-ui/icons/Assignment';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import ForumRoundedIcon from '@material-ui/icons/ForumRounded';
import { useAuth } from '../../hooks/useAuth';
import { WizardContext } from '../../context/WizardContext';
import Link from 'next/link';

const PrimaryListItems = ({ classes }) => (
    <>
        <Link className="default-link" href="/forum">
            <ListItem button>
                <ListItemText className={classes.item} primary="Home" />
            </ListItem>
        </Link>
        <Link className="default-link" href="/forum">
            <ListItem button>
                <ListItemText className={classes.item} primary="Questions" />
            </ListItem>
        </Link>
    </>
);

const SecondaryListItems = ({ classes, isAuthenticated }) => {
    return (
        <>
            {isAuthenticated &&
                <>
                    <Link className="default-link" href="/">
                        <ListItem button>
                            <ListItemIcon>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" />
                        </ListItem>
                    </Link>
                    <ListItem button>
                        <ListItemIcon>
                            <AssignmentIcon />
                        </ListItemIcon>
                        <ListItemText primary="My sheets" />
                    </ListItem>
                </>
            }
            <ListItem button>
                <ListItemIcon>
                    <HelpOutlineRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="FAQ" />
            </ListItem>
        </ >
    )
}
const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({

    root: {
        display: 'flex',
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        fontFamily: 'Montserrat',
        ...theme.mixins.toolbar,
    },
    drawerPaper: {
        zIndex: 1,
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        border: 'none',
        backgroundColor: '#ececec',
        // color: '#656565',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%',
    },
    item: {
        textAlign: 'end',
    },
    divider: {
        border: '2px solid white'
    }
}));


const CustomDivider = ({ classes }) => {
    return <hr className={classes.divider} />;
}
const SettingsMenu = ({ anchorEl, anchorElCallback }) => {
    const { logout } = useAuth();

    const handleClose = () => {
        anchorElCallback(null);
    };
    const handleLogout = async () => {
        await logout();
    }
    return (
        <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
        >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={handleClose}>My account</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
    )
}

export const Sidebar = React.memo(function WrappedSidebar() {
    const classes = useStyles();
    const [, setWizard] = useContext(WizardContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const { isAuthenticated } = useAuth();

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    return (
        <>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper),
                }}
                open={true}>
                <div className={classes.wrapper}>
                    <div className='content'>
                        <div className={classes.toolbarIcon}></div>
                        <List>
                            <PrimaryListItems classes={classes} />
                            <CustomDivider classes={classes} />
                            <SecondaryListItems classes={classes} isAuthenticated={isAuthenticated} />
                        </List>
                    </div>
                    <div>
                        <ListItem aria-haspopup="true" onClick={handleClick} button>
                            <ListItemIcon>
                                <SettingsIcon />
                            </ListItemIcon>
                            <ListItemText primary="Settings" />
                        </ListItem>
                        <SettingsMenu anchorEl={anchorEl} anchorElCallback={(value) => setAnchorEl(value)} />
                    </div>
                </div>
            </Drawer>
        </>
    )
})