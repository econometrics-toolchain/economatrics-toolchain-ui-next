import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import clsx from 'clsx';
import { Topbar } from "./Topbar";

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

export const Hero = ({ loginCallback }) => {
    const classes = useStyles();
    return (
        <>
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
