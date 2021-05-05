import Head from "next/head";
import { useContext } from "react";
import { Topbar } from "../../components/landing/Topbar";
import { Login } from "../../components/wizard/Login";
import { Register } from "../../components/wizard/Register";
import { WizardContext } from "../../context/WizardContext";

export default function Forum({ example }) {
    const [, setWizard] = useContext(WizardContext) as Array<any>;

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
            <Head>
                <title>GEST | forum</title>
            </Head>
            <Topbar loginCallback={handleLogin} regCallback={handleRegister}>FORUM</Topbar>
            <div style={{ margin: "80px 0 0 0" }}>
                <p>{example}</p>
            </div>
        </>
    )
}
