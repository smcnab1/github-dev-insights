import React from 'react';

const Button = ({ label, onClick, type }) => (
  <button type={type} className="btn" onClick={onClick}>
    {label}
  </button>
);

export default Button;
