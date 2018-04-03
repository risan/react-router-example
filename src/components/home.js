import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <section className="section">
    <div className="container">
      <h1 className="title">Home</h1>
      <hr />
      <div className="content">
        <p>
          This is an example of React application with dynamic routing using{' '}
          <a href="https://reacttraining.com/react-router/">React Router</a>{' '}
          library.
        </p>
        <blockquote>
          React Router is a collection of navigational components that compose
          declaratively with your application.
        </blockquote>
        <p>
          This homepage is accessible even if you're not logged in. Try to
          access the{' '}
          <Link to="/secure">
            <code>/secure</code>
          </Link>{' '}
          page while you're not logged in, you will be redirected to the
          <Link to="/login">
            <code>/login</code>
          </Link>{' '}
          page.
        </p>
      </div>
    </div>
  </section>
);

export default Home;
