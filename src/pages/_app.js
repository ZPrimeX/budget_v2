import React, { useState } from "react";
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
import "react-toastify/dist/ReactToastify.css";
import { getDesignTokens } from "../theme";

registerChartJs();

const clientSideEmotionCache = createEmotionCache();

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const App = (props) => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  const [mode, setMode] = useState("dark");

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
      },
    }),
    []
  );

  const theme = createTheme(getDesignTokens(mode));

  return (
    <CacheProvider value={emotionCache}>
      <ReduxProvider store={store}>
        <Head>
          <title>Budget App</title>
          <meta name="viewport" />
        </Head>
        <ColorModeContext.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <AuthProvider>
              <Component {...pageProps} />
              <ToastContainer />
            </AuthProvider>
          </ThemeProvider>
        </ColorModeContext.Provider>
      </ReduxProvider>
    </CacheProvider>
  );
};

export default App;
