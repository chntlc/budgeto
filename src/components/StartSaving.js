import React from 'react';
import '../css/Home.css';
import LoginSignup from './LoginSignup';
import { connect, useDispatch } from 'react-redux';
import { toggleLoginModal } from '../features/globalSlice';

function StartSaving(props) {
  const dispatch = useDispatch()

  const handleLoginSignup = () => {
    dispatch(toggleLoginModal('signup'))
  }
  return (
    <React.Fragment>
      {props.showLoginModal && <LoginSignup />}
      <div className="see-more">
        <button className='start-saving' onClick={handleLoginSignup}>Start Saving</button>
        {/* <NavLink className="start-saving" to="/login">Start Saving</NavLink> */}
      </div>
    </React.Fragment>
  );
}

const mapStateToProps = (state) => {
  return {
    showLoginModal: state.showLoginModal
  }
}

export default connect(mapStateToProps)(StartSaving);
