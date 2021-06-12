import { Avatar, Button, Divider, Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { useAuth } from "../../hooks/useAuth";
import Link from 'next/link'
import CustomizedInputBase from '../forum/InputBar';
import AddIcon from '@material-ui/icons/Add';
const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 15%',
    },
    hero: {
        backgroundColor: theme.palette.primary.main,
        height: '350px',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
        margin: "0 0 25px 0",
    },
    topbar: {
        position: "fixed",
        top: 0,
        color: '#ffffff',
        backgroundColor: theme.palette.primary.main,
        zIndex: 2,
    },
    btns: {
        position: "fixed",
        top: 10,
        color: '#ffffff',
        zIndex: 2,
    },
}));

export const Topbar = ({ loginCallback, regCallback, logo, searchBar = false, children }) => {
    const { state, isAuthenticated } = useAuth();


    const classes = useStyles();
    return (
        <>
            <Grid alignContent='space-between' alignItems='center' className={clsx(classes.topbar, classes.container, 'engineer')} container>
                <Grid alignItems="flex-end" container xs={4} item>
                    <h2 className='logo'>
                        <Link href="/">GEST</Link>
                    </h2>
                    <h5 className="logo" style={{ fontSize: '13px', fontStyle: 'italic', }}>{logo}</h5>
                </Grid>
                {searchBar &&
                    <Grid xs={8} item >
                        <CustomizedInputBase />
                    </Grid>
                }
            </Grid>
            {
                isAuthenticated ?
                    <Grid direction="row" justify="flex-end" alignItems="center" className={clsx(classes.btns, classes.container)} container >
                        <Avatar style={{ marginRight: '15px' }} />
                        <p>{state.user.username}</p>
                        <div style={{
                            width: '1px',
                            height: '40px',
                            backgroundColor: '#593fb7',
                            margin: '0 3px 0 20px',
                        }}></div>
                        <Link href="/forum/newPost">
                            <IconButton color="secondary">
                                <AddIcon />
                            </IconButton>
                        </Link>
                        <div style={{
                            width: '1px',
                            height: '40px',
                            backgroundColor: '#593fb7',
                            margin: '0 3px',
                        }}></div>
                    </Grid>
                    :
                    <Grid direction="row" justify="flex-end" alignItems="center" className={clsx(classes.btns, classes.container)} container >
                        <Button style={{ margin: '5px' }} variant='outlined' color='inherit' onClick={loginCallback}>
                            Login
                         </Button>
                        <Button variant='outlined' color='inherit' onClick={regCallback}>
                            Register
                        </Button>
                    </Grid>
            }
        </>
    )
}
