import React, { useState } from 'react'
import Modal from './Modal'
import '../css/LoginSignup.css'
import { toggleLoginModal, userLogin, userSignup } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'
import { Link } from "react-router-dom";

function LoginSignup(props) {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    id: '',
    email: '',
    fname: '',
    lname: '',
    budget: 0
  })
  const [loginEmail, setLoginEmail] = useState('')
  const [loginPassword, setLoginPassword] = useState('')

  const [signupEmail, setSignupEmail] = useState('')
  const [signupPassword, setSignupPassword] = useState('')
  const [signupFirstName, setSignupFirstName] = useState('')
  const [signupLastName, setSignupLastName] = useState('')

  const handleLogin = () => {
    const testUser = ({
      id: 'testId',
      fname: signupFirstName,
      lname: signupLastName,
      budget: 200,
      email: loginEmail
    })

    // alert('logged in')
    console.log({ user })
    dispatch(userLogin(testUser))
    dispatch(toggleLoginModal(''))
  }

  const handleSignup = () => {
    const testUser = ({
      id: 'testId',
      fname: signupFirstName,
      lname: signupLastName,
      budget: 200,
      email: signupEmail,
    })
    // alert('signed up')
    dispatch(userSignup(testUser))
    dispatch(toggleLoginModal(''))
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
      <input className='login-email-input' value={loginEmail} onChange={(e) => {
        setLoginEmail(e.target.value)
        console.log(e.target.value, { loginEmail })
      }} />
      <label>Password</label>
      <input type='password' className='login-password-input last-form-input' value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
      <Link to='/dashboard' className='login-submit-link'>
        <button type='button' className='login-submit-button' onClick={handleLogin}>GO!</button>
      </Link>
      {/* <button type='button' className='login-submit-button' onClick={handleLogin}>GO!</button> */}
    </form>

  const signupForm =
    <form className='signup-form'>
      <label>First Name</label>
      <input className='signup-first-name-input' value={signupFirstName} onChange={(e) => setSignupFirstName(e.target.value)} />
      <label>Last Name</label>
      <input className='signup-last-name-input' value={signupLastName} onChange={(e) => setSignupLastName(e.target.value)} />
      <label>Email</label>
      <input className='signup-email-input' value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} />
      <label>Password</label>
      <input type='password' className='signup-password-input' value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} />
      <label>Confirm Password</label>
      <input type='password' className='signup-password-confirm-input' />
      <div className='login-submit-button-wrapper'>
        <Link to='/dashboard' className='login-submit-link'>
          <button className='login-submit-button' onClick={handleSignup}>SIGN ME UP!</button>
        </Link>
      </div>
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
    showLogin: state.global.showLoginModal,
    user: state.global.user,
    isLoggedIn: state.global.isLoggedIn
  }
}

export default connect(mapStateToProps)(LoginSignup);
