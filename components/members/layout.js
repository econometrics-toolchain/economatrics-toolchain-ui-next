import { Container, makeStyles } from '@material-ui/core';
import { memo } from 'react';
import { Navigator } from '../other/Navigator';
import { Sidebar } from '../sidebar/SIdebar';


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    content: {
        height: '100vh',
        overflow: 'auto',
        width: '100%',
    },
    container: {
        paddingTop: theme.spacing(2),
        width: '100%',
    },
    routes: {
        paddingTop: theme.spacing(4),
        width: '100%',
    }
}));

export const Layout = memo(function WrappedLayout({ children }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Sidebar />
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <Navigator />
                    <div className={classes.routes}>
                        {children}
                    </div>
                </Container>
            </main>
        </div>
    );
})