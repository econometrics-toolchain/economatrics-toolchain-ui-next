import { Grid, IconButton, makeStyles, Typography } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 15%',
    },
    spacer: {
        margin: "3rem 0",
    },
    gitBtn: {
        "&:hover": {
            color: "#37ad46",
            transition: "1s",
        }
    }
}));

export const GithubBlock = () => {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.container, classes.spacer)}>
                <Grid alignItems="center" direction="column" container>
                    <Typography component='h1' variant='h4'>
                        Check us out on Github
                    </Typography>
                    <Typography component='p' variant='subtitle1'>
                        You can check our open source library that provides GEST calculations .
                    </Typography>
                    <Grid>
                        <IconButton className={classes.gitBtn}><GitHubIcon /></IconButton>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}