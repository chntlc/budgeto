import React, { useState } from 'react';
import '../css/Modal.css';

function Modal({ header, content }) {

  const [show, setShow] = useState(true)
  const display = show ? { display: 'block' } : {}

  const closeModal = () => {
    setShow(false)
  }

  return (
    <div className="modal" style={display}>
      <div className='modal-content'>
        <div className='modal-header'>
          <button className='close-button' onClick={closeModal}>x</button>
          {header}
        </div>
        {content}
      </div>
    </div>
  );
}

export default Modal;
