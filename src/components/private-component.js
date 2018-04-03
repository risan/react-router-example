import Auth from '../auth';

const privateComponent = (Component, fallbackComponent = null) =>
  Auth.check() ? Component : fallbackComponent;

export default privateComponent;
