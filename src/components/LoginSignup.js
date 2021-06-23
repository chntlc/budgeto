import React from 'react'
import Modal from './Modal'
import '../css/LoginSignup.css'
import { toggleLoginModal } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'

function LoginSignup(props) {
  const dispatch = useDispatch()

  const handleLogin = () => {
    alert('logged in')
  }

  const handleSignup = () => {
    alert('signed up')
  }

  const redirectLogin = () => {
    dispatch(toggleLoginModal('login'))
  }

  const redirectSignup = () => {
    dispatch(toggleLoginModal('signup'))
  }

  const closeLoginModal = () => {
    dispatch(toggleLoginModal(''))
  }

  const loginForm =
    <form className='login-form'>
      <label>Email</label>
      <input />
      <label>Password</label>
      <input type='password' />
      <button className='login-submit-button' onClick={handleLogin}>GO!</button>
    </form>

  const signupForm =
    <form className='signup-form'>
      <label>First Name</label>
      <input />
      <label>Last Name</label>
      <input />
      <label>Email</label>
      <input />
      <label>Password</label>
      <input type='password' />
      <label>Confirm Password</label>
      <input type='password' />
      <button className='login-submit-button' onClick={handleSignup}>SIGN ME UP!</button>
    </form>

  return (
    <Modal
      header={(<React.Fragment>
        <button id='login-header' className={props.showLogin === 'login' ? 'underline-label' : ''} onClick={redirectLogin}>LOGIN</button>
        <span>&nbsp;/&nbsp;</span>
        <button id='signup-header' className={props.showLogin === 'signup' ? 'underline-label' : ''} onClick={redirectSignup}>SIGNUP</button>
      </React.Fragment>)}
      content={props.showLogin === 'login' ? loginForm : signupForm}
      onClose={closeLoginModal}
    >
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    showLogin: state.global.showLoginModal
  }
}

export default connect(mapStateToProps)(LoginSignup);
