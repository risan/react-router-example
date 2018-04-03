import React, { Component, createRef } from 'react';
import { Redirect } from 'react-router-dom';
import validate from 'validate.js';
import Field from './field';
import Notification from './notification';
import Auth from '../auth';

class Login extends Component {
  state = {
    isAuthenticated: Auth.check(),
    email: 'john@example.com',
    password: 'secret',
    formError: null,
    formSuccess: null,
    errors: {},
    isLoading: false
  };

  emailInput = createRef();

  static get RULES() {
    return {
      email: {
        presence: {
          allowEmpty: false
        },
        email: true
      },
      password: {
        presence: {
          allowEmpty: false
        }
      }
    };
  }

  componentDidMount() {
    if (this.emailInput.current) {
      this.emailInput.current.focus();
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.history.action === 'REPLACE' &&
      nextProps.location.state &&
      nextProps.location.state.errorMessage
    ) {
      return { formError: nextProps.location.state.errorMessage };
    }

    if (
      nextProps.history.action === 'PUSH' &&
      nextProps.location.state &&
      nextProps.location.state.successMessage
    ) {
      return { formSuccess: nextProps.location.state.successMessage };
    }

    return null;
  }

  handleChange({ target }) {
    const { name, value } = target;
    const errors = validate({ [name]: value }, { [name]: Login.RULES[name] });

    this.setState({
      [name]: value,
      errors: Object.assign(
        {},
        this.state.errors,
        errors ? errors : { [name]: undefined }
      )
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    const { email, password } = this.state;
    const errors = validate({ email, password }, Login.RULES);

    if (errors) {
      return this.setState({ formError: null, formSuccess: null, errors });
    }

    this.setState({ formError: null, formSuccess: null, isLoading: true }, () =>
      Auth.login({ email, password })
        .then(user => this.setState({ isAuthenticated: true }))
        .catch(err =>
          this.setState({
            password: '',
            formError: err.message,
            isLoading: false
          })
        )
    );
  }

  render() {
    if (this.state.isAuthenticated) {
      return <Redirect to="/secure" />;
    }

    return (
      <section className="section">
        <div className="container login-container">
          <div className="box">
            <div className="content">
              <pre>
                Email: john@example.com<br />
                Password: secret
              </pre>
            </div>

            <form onSubmit={e => this.handleSubmit(e)}>
              {this.state.formSuccess ? (
                <Notification
                  type="success"
                  onCloseBtnClick={e => this.setState({ formSuccess: null })}
                >
                  {this.state.formSuccess}
                </Notification>
              ) : null}

              {this.state.formError ? (
                <Notification
                  type="danger"
                  onCloseBtnClick={e => this.setState({ formError: null })}
                >
                  {this.state.formError}
                </Notification>
              ) : null}

              <Field label="Email" errors={this.state.errors.email}>
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  ref={this.emailInput}
                  value={this.state.email}
                  disabled={this.state.isLoading}
                  onChange={e => this.handleChange(e)}
                />
              </Field>
              <Field label="Password" errors={this.state.errors.password}>
                <input
                  name="password"
                  type="password"
                  placeholder="Password"
                  value={this.state.password}
                  disabled={this.state.isLoading}
                  onChange={e => this.handleChange(e)}
                />
              </Field>
              <div className="field">
                <div className="control">
                  <button
                    className={`button is-link ${
                      this.state.isLoading ? 'is-loading' : ''
                    }`}
                    disabled={this.state.isLoading}
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default Login;
