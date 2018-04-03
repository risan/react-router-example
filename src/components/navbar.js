import React, { Component } from 'react';
import { Link, NavLink, withRouter } from 'react-router-dom';
import Auth from '../auth';
import privateComponent from './private-component';

const SignoutBtn = withRouter(({ history }) => (
  <NavLink
    to="/logout"
    className="navbar-item"
    activeClassName="is-active"
    onClick={() => {
      Auth.logout().then(() =>
        history.push('/login', {
          successMessage: 'You are logged out successfully.'
        })
      );
    }}
  >
    <i className="fa fa-sign-out-alt" /> Logout
  </NavLink>
));

class Navbar extends Component {
  state = {
    isMenuExpanded: false
  };

  render() {
    return (
      <nav className="navbar is-warning">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" className="navbar-item">
              <h1>
                <span role="img" aria-label="react">
                  ⚛️
                </span>{' '}
                Router Example
              </h1>
            </Link>
            <div
              className={`navbar-burger burger ${
                this.state.isMenuExpanded ? 'is-active' : ''
              }`}
              data-target="navbar-menu-left"
              onClick={() =>
                this.setState({ isMenuExpanded: !this.state.isMenuExpanded })
              }
            >
              <span />
              <span />
              <span />
            </div>
          </div>

          <div
            id="navbar-menu-left"
            className={`navbar-menu ${
              this.state.isMenuExpanded ? 'is-active' : ''
            }`}
          >
            <div className="navbar-start">
              <NavLink
                to="/"
                className="navbar-item"
                activeClassName="is-active"
                exact
              >
                Home
              </NavLink>
              {privateComponent(
                <NavLink
                  to="/secure"
                  className="navbar-item"
                  activeClassName="is-active"
                  exact
                >
                  Secure
                </NavLink>
              )}
            </div>

            <div className="navbar-end">
              {privateComponent(
                <SignoutBtn />,
                <NavLink
                  to="/login"
                  className="navbar-item"
                  activeClassName="is-active"
                >
                  <i className="fa fa-sign-in-alt" /> Login
                </NavLink>
              )}
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Navbar;
