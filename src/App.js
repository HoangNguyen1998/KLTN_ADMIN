import React from "react";
import { Switch, Link, Route } from "react-router-dom";
import SignIn from "../src/views/SignIn";
import HomePage from "../src/views/HomePage";

const App = props => {
  console.log(props);
  const _goAbout = () => {
    const { history } = props;
    history.push("/about");
  };
  return (
    <React.Fragment>
      <HomePage />
    </React.Fragment>
  );
};

export default App;
