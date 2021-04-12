import { Wizard } from '../components/wizard/Wizard'
import { WizardProvider } from '../context/WizardContext'
import React from 'react';
import Head from 'next/head';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../utils/theme';
import '../styles/globals.css'
import { AuthProvider } from '../context/AuthContext';
import 'react-datasheet/lib/react-datasheet.css';

export default function MyApp(props) {
  const { Component, pageProps } = props;

  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (
    <React.Fragment>
      <Head>
        <title>GEST</title>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <WizardProvider>
            <Wizard />
            <Component {...pageProps} />
          </WizardProvider>
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
}