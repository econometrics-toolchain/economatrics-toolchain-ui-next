import { Container, makeStyles } from '@material-ui/core';
import { memo, useContext } from 'react';
import { Navigator } from '../other/Navigator';
import { Sidebar } from './Sidebar';
import { Topbar } from '../landing/Topbar';
import { Login } from '../wizard/Login';
import { Register } from '../wizard/Register';
import { WizardContext } from '../../context/WizardContext';

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
        paddingTop: theme.spacing(6),
        width: '100%',
    }
}));

export const Layout = memo(function WrappedLayout({ children }) {
    const classes = useStyles();
    const [, setWizard] = useContext(WizardContext);


    const handleLogin = () => {
        setWizard({
            open: true,
            content: <Login />,
            fullScreen: true,
        })
    }
    const handleRegister = () => {
        setWizard({
            open: true,
            content: <Register />,
            fullScreen: true,

        })
    }

    return (
        <div className={classes.root}>
            <Sidebar />
            <Topbar loginCallback={handleLogin} regCallback={handleRegister} logo='FORUM' searchBar={true}></Topbar>
            <main className={classes.content}>
                <Container maxWidth="lg" className={classes.container}>
                    <div className={classes.routes}>
                        {children}
                    </div>
                </Container>
            </main>
        </div>
    );
})