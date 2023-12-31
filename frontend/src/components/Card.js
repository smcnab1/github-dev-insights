import React from 'react';

const Card = ({ title, content }) => (
  <div className="card">
    <div className="card-header">{title}</div>
    <div className="card-body">{content}</div>
  </div>
);

export default Card;
