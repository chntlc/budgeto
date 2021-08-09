import React from "react";
import "../css/Modal.css";

function Modal({ header, content, onClose }) {
  return (
    <div className="modal" style={{ display: "block" }}>
      <div className="modal-content">
        <div className="modal-header">
          <button className="close-button" onClick={onClose}>
            x
          </button>
          {header}
        </div>
        {content}
      </div>
    </div>
  );
}

export default Modal;
