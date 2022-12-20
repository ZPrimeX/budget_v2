import React from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { createEmotionCache } from "../utils/create-emotion-cache";
import { registerChartJs } from "../utils/register-chart-js";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "../redux/store";
import { AuthProvider } from "../../server/providers/AuthProvider";
import { ToastContainer } from "react-toastify";
import { createTheme } from "@mui/material";
import { getDesignTokens } from "../theme";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const theme = createTheme(getDesignTokens("dark"));

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <Head>
          <title>Budget App</title>
          <meta name="viewport" />
        </Head>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <AuthProvider>
            <Component {...pageProps} />
            <ToastContainer />
          </AuthProvider>
        </ThemeProvider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
