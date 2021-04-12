import Head from 'next/head'
import { useContext, useEffect } from 'react';
import { Hero } from '../components/landing/Hero';
import { Landing } from '../components/landing/Landing';
import { LandingContent } from '../components/landing/LandingContent';
import { Topbar } from '../components/landing/Topbar';
import { Login } from '../components/wizard/Login';
import { Register } from '../components/wizard/Register';
import { SupportedToolsProvider } from '../context/ToolsContext';
import { SplashScreen } from '../components/other/loaders';
import { useAuth } from '../hooks/useAuth';
// import { Members } from '../components/members/Members';
import { useRouter } from 'next/router';

export default function Home() {
  const { isPending, isAuthenticated } = useAuth();
  const router = useRouter()

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/app');
    }
  }, [isAuthenticated])

  if (isPending) {
    return (<SplashScreen />)
  }
  return (
    <>
      <SupportedToolsProvider>
        {/* {isAuthenticated === true ? <Members /> : <Landing />} */}
        <Landing />
      </SupportedToolsProvider>
    </>
  )

}
