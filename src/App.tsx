import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { ThemeProvider } from "@mui/material";
import THEME from "./theme";

function App() {
  return <ThemeProvider theme={THEME.LIGHT}>App</ThemeProvider>;
}

export default App;
