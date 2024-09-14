import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { SetupWorkerApi } from "msw/browser";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

// initialize custom style theme
const theme = createTheme({
  typography: {
    fontFamily: "Poppins",
    h5: {
      fontWeight: "600",
    },
    subtitle1: {
      fontWeight: "600",
    },
  },
});

if (process.env.NODE_ENV === "development") {
  const { worker }: { worker: SetupWorkerApi } = require("./mocks/browser");
  worker.start({ onUnhandledRequest: "bypass" });
}

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
