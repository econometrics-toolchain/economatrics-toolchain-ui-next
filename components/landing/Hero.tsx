import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';

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

export const Hero = ({ loginCallback, regCallback }) => {
    const classes = useStyles();
    return (
        <>
            <Grid alignItems='center' justify='space-between' className={clsx(classes.topbar, classes.container, 'engineer')} container>
                <div className='logo'>
                    <h2>GEST</h2>
                </div>
            </Grid>

            <Grid direction="row" justify="flex-end" alignItems="center" className={clsx(classes.btns, classes.container)} container >
                <Button style={{ margin: '5px' }} variant='outlined' color='inherit' onClick={loginCallback}>
                    Login
                </Button>
                <Button variant='outlined' color='inherit' onClick={regCallback}>
                    Register
                </Button>
            </Grid>
            <div className={clsx(classes.hero, 'engineer', classes.container)}>
                <Grid direction='column' spacing={3} container>
                    <Grid item>
                        <Typography component='h1' variant='h2'>
                            Fast and simple
                        </Typography>
                        <Typography component='p' variant='subtitle1'>
                            Online environment for econometric analysis
                        </Typography>
                    </Grid>
                    <Grid spacing={2} container item>
                        <Grid item>
                            <Button variant='contained' color='secondary' onClick={loginCallback}>
                                Start now
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button variant='text' color='secondary' onClick={loginCallback}>
                                Learn more
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
