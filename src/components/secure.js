import React from 'react';
import { Link } from 'react-router-dom';

const Secure = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">
        <span role="img" aria-label="lock">
          🔐
        </span>{' '}
        Secure Page
      </h1>
      <hr />
      <div className="content">
        <p>
          This page is only accessible if you're logged in. Try to access the{' '}
          <Link to="/login">
            <code>/login</code>
          </Link>{' '}
          page while you're logged in, you will be redirected back to this
          <Link to="/secure">
            <code>/secure</code>
          </Link>{' '}
          page.
        </p>
      </div>
    </div>
  </section>
);

export default Secure;
