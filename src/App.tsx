import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, Details } from "./pages";
import { Provider } from "react-redux";
import React from "react";
import store from "./redux/store";

const App = () => {
  return (
    <Provider store={store}>
      <div className="App">
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:type/:id" component={Details} />
            <Route component={Home} />
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
