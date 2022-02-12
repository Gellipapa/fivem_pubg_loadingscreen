import { StrictMode } from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { NuiProvider } from "react-fivem-hooks";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <NuiProvider>
      <App />
    </NuiProvider>
  </StrictMode>,
  rootElement
);
