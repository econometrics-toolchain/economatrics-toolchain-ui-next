import { Wizard } from '../components/wizard/Wizard'
import { WizardProvider } from '../context/WizardContext'
import React from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from '../utils/theme';
import { AuthProvider } from '../context/AuthContext';
import { SupportedToolsProvider } from '../context/ToolsContext';
import { ProtectRoute } from '../components/other/ProtectRoute';
import NextNprogress from 'nextjs-progressbar';
import '../styles/globals.css'
import 'react-datasheet/lib/react-datasheet.css';
import { red } from '@material-ui/core/colors';


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
            <SupportedToolsProvider>
              <ProtectRoute>
                <NextNprogress
                  color={red[400]}
                  startPosition={0.3}
                  height={2}
                />
                <Component {...pageProps} />
              </ProtectRoute>
            </SupportedToolsProvider>
          </WizardProvider>
        </ThemeProvider>
      </AuthProvider>
    </React.Fragment>
  );
}