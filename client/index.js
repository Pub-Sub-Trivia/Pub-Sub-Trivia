import React from "react";
import { render } from "react-dom";
import App from "./App.jsx"
import {GlobalProvider} from './context/GlobalContext.jsx'

render(
  <div>
    <GlobalProvider>
      <App></App>
    </GlobalProvider>
  </div>,
  document.getElementById("root"),
);