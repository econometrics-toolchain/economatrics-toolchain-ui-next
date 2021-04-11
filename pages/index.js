import Head from 'next/head'
import { useContext } from 'react';
import { Hero } from '../components/landing/Hero';
import { LandingContent } from '../components/landing/LandingContent';
import { Login } from '../components/wizard/Login';
import { Register } from '../components/wizard/Register';
import { SupportedToolsProvider } from '../context/ToolsContext';
import { WizardContext } from '../context/WizardContext';

export default function Landing() {
  const [wizard, setWizard] = useContext(WizardContext);

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
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero loginCallback={handleLogin} regCallback={handleRegister}/>
      <SupportedToolsProvider>
        <LandingContent regCallback={handleRegister}/>
      </SupportedToolsProvider>
    </>
  )
}
