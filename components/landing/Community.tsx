import { Button, Grid, makeStyles, Typography } from '@material-ui/core';
import clsx from 'clsx';
import Link from 'next/link';

const useStyles = makeStyles((theme) => ({
    container: {
        padding: '0 15%',
    },
    footer: {
        backgroundColor: theme.palette.primary.main,
        height: '180px',
        display: 'flex',
        alignItems: 'center',
        color: '#ffffff',
    },
    spacer: {
        margin: "3rem 0",
    },

}));

export const Community = () => {
    const classes = useStyles();
    return (
        <>
            <div className={clsx(classes.footer, 'engineer', classes.container, classes.spacer)}>
                <Grid direction='column' container>
                    <Typography component='h1' variant='h2'>
                        Join our community
                    </Typography>
                    <Typography component='p' variant='subtitle1'>
                        Feel free to ask questions and share your knowledge.
                    </Typography>
                    <Grid>
                        <Link href="/forum">
                            <Button variant='contained' color='secondary'>
                                Join us
                        </Button>
                        </Link>
                    </Grid>
                </Grid>
            </div>
        </>
    )
}
