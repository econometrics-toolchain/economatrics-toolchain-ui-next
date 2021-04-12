import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { useAuth } from "../../hooks/useAuth";
import Link from 'next/link'

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
        zIndex: 1,
    },
    btns: {
        position: "fixed",
        top: 10,
        color: '#ffffff',
        zIndex: 1,
    },
}));

export const Topbar = ({ loginCallback, regCallback, children }) => {
    const { isAuthenticated } = useAuth();

    const classes = useStyles();
    return (
        <>
            <Grid alignItems="center" className={clsx(classes.topbar, classes.container, 'engineer')} container>
                <Grid alignItems="flex-end" container>
                    <div>
                        <h2 className='logo'>
                            <Link href="/">GEST</Link>
                        </h2>
                    </div>
                    <h5 className="logo" style={{ fontSize: '13px', fontStyle: 'italic', }}>{children}</h5>
                </Grid>

            </Grid>
            {
                isAuthenticated ?
                    <></>
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
