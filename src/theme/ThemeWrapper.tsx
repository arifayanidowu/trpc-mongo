import React from "react";
import { ThemeProvider } from "@mui/material";
import useMode from "@/hooks/useMode";
import Layout from "@/components/Layout";

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
});

const ThemeWrapper = ({ children }: { children: React.ReactNode }) => {
  const { colorMode, memoizedTheme } = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={memoizedTheme}>
        <Layout>{children}</Layout>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default ThemeWrapper;
