import React from 'react';

const Modal = ({ title, content, onClose }) => (
  <div className="modal">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title">{title}</h5>
        <button type="button" className="close" onClick={onClose}>
          <span>&times;</span>
        </button>
      </div>
      <div className="modal-body">{content}</div>
    </div>
  </div>
);

export default Modal;
