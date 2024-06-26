import { ThemeProvider } from "@mui/material";
import { SnackbarProvider } from "notistack";
import "./App.css";
import THEME from "./theme";
import SkusPage from "./pages/skus";

function App() {
  return (
    <ThemeProvider theme={THEME.LIGHT}>
      <SnackbarProvider>
        <SkusPage />
      </SnackbarProvider>
    </ThemeProvider>
  );
}

export default App;
