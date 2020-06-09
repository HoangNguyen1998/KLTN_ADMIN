import React from "react";
import { Switch, Link, Route, withRouter } from "react-router-dom";
import HomePage from 'pages/Screen/Home';

const App = props => {
  const _goAbout = () => {
    const { history } = props;
    history.push("/about");
  };
  const _goTopic = () => {
    const { history } = props;
    history.push("/topic");
  };
  return (
    <React.Fragment>
      <HomePage />
      {/* <h1>HomePage</h1>
      {/* <Main /> */}
      {/* <button onClick={() => _goAbout()}>go to about page</button>
      <button onClick={() => _goTopic()}>go to topic page</button>
      <Switch>
        <Route path="/about" component={About} />
        <Route path="/topic" component={Topic} />
        <Route path="/" render={() => <h2>This is Main</h2>} />
      </Switch> */}{" "}
    </React.Fragment>
  );
};

export default App;
