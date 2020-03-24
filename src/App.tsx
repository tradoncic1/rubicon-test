import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, MovieDetails, ShowDetails } from "./pages";
import React from "react";
import "./App.scss";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/movie/:id" component={MovieDetails} />
          <Route exact path="/show/:id" component={ShowDetails} />
        </Switch>
      </Router>
    </div>
  );
};

export default App;
