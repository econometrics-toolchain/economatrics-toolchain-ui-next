import Head from 'next/head'
import { useContext } from 'react';
import { WizardContext } from '../../context/WizardContext';
import { Login } from '../wizard/Login';
import { Register } from '../wizard/Register';
import { Hero } from './Hero';
import { LandingContent } from './LandingContent';
import { Topbar } from './Topbar';


export const Landing = () => {
    const [wizard, setWizard] = useContext(WizardContext) as Array<any>;

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
        <>
            <Topbar loginCallback={handleLogin} regCallback={handleRegister} logo=''><></></Topbar>
            <Hero loginCallback={handleLogin} />
            <LandingContent regCallback={handleRegister} />
        </>
    )
}
