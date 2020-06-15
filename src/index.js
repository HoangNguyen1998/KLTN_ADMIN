import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";

import 'antd/dist/antd.css';
import theme from "../src/styles";
import configStore from "../src/helpers/ReduxConfig";

const store = configStore();

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
