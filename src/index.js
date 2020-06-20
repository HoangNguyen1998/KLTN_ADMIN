import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core/styles";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import "antd/dist/antd.css";

import theme from "helpers/ThemeCustom";
import App from "./App";
import configStore from "../src/helpers/ReduxConfig";
import SignIn from "pages/Screen/SignIn";
import CheckAuthen from "helpers/GetToken";

const store = configStore();

ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
                <SnackbarProvider>
                    {/* <SignIn /> */}
                    <Switch>
                        <Route path="/signin" render={() => <SignIn />} />
                        <Route
                            path="/"
                            render={() =>
                                CheckAuthen() ? (
                                    <App />
                                ) : (
                                    <Redirect to="/signin" />
                                )
                            }
                        />
                    </Switch>
                </SnackbarProvider>
            </ThemeProvider>
        </Provider>
    </BrowserRouter>,
    document.getElementById("root")
);
