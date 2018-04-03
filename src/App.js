import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import Navbar from './components/navbar';
import Home from './components/home';
import Login from './components/login';
import Secure from './components/secure';
import Auth from './auth';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      Auth.check() ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/login',
            state: { errorMessage: 'Please login first.' }
          }}
        />
      )
    }
  />
);

class App extends Component {
  render() {
    return (
      <Router basename={process.env.PUBLIC_URL}>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route path="/login" component={Login} />
          <PrivateRoute exact path="/secure" component={Secure} />
        </div>
      </Router>
    );
  }
}

export default App;
