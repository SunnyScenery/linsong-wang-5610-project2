import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Rules from "./routes/rules";
import Play from "./routes/play";
import Homepage from "./routes/homepage";
import InputContextProvider from "./store/input";
import RecordContextProvider from "./store/records";

import { ThemeProvider, createTheme } from "@material-ui/core/styles";

const theme = createTheme({
  palette: {
    mode: "dark", // This will automatically set the text color to be more readable on dark backgrounds
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
  {
    path: "/play",
    element: <Play />,
  },
  {
    path: "/rules",
    element: <Rules />,
  },
]);

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RecordContextProvider>
        <InputContextProvider>
          <RouterProvider router={router} />
        </InputContextProvider>
      </RecordContextProvider>
    </ThemeProvider>
  );
}

export default App;
