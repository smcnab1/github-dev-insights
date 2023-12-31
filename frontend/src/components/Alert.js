import React from 'react';

const Alert = ({ type, message }) => (
  <div className={`alert alert-${type}`} role="alert">
    {message}
  </div>
);

export default Alert;
