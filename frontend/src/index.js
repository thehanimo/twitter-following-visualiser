import React from "react";
import ReactDOM from "react-dom/client";
import './index.css'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./Components/Home";
import Login from "./Components/Login";
import TwitterRedirect from "./Components/TwitterRedirect";

const isAuthenticated = () => {
  return false
  // const jwt = localStorage.getItem("jwt");
  // try {
  //   decode(jwt);
  //   return true;
  // } catch (error) {
  //   localStorage.removeItem("jwt");
  //   document.cookie = "jwt=; Max-Age=-99999999;";
  //   return false;
  // }
};

function PrivateRoute({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
            }}
          />
        )
      }
    />
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Router>
      <Switch>
        {/* <PrivateRoute path="/" exact component={Home} /> */}
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/twitter-redirect">
          <TwitterRedirect />
        </Route>
        <Redirect to="/login" />
      </Switch>
    </Router>
  </React.StrictMode>
);

