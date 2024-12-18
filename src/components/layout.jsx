import React from "react";
import Footer from "./footer";
import { useDarkMode } from "./DarkModeContext";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Button, CssBaseline, Paper, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";

const Layout = ({ children }) => {
  const { darkMode, toggleDarkMode } = useDarkMode();

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Paper
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center", padding: 18
        }}
      >
        <Typography  style={{
         fontSize: 28,
        }} variant="h1">
          Where in the world?
        </Typography>
        <Button onClick={toggleDarkMode} variant="contained" color="primary">
          <FontAwesomeIcon icon={faMoon} size="lg" />
          Dark Mode
        </Button>
      </Paper>
      {children}
      <Footer />
    </ThemeProvider>
  );
};

export default Layout;
