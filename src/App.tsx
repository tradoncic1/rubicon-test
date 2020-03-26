import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, MovieDetails, ShowDetails, Details } from "./pages";
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
            {/* <Route exact path="/movie/:id" component={MovieDetails} />
            <Route exact path="/show/:id" component={ShowDetails} /> */}
          </Switch>
        </Router>
      </div>
    </Provider>
  );
};

export default App;
