import React, { useState } from 'react'
import Modal from './Modal'
import '../css/LoginSignup.css'

export default function LoginSignup() {

  const [showLogin, setLogin] = useState(true);
  console.log({ showLogin })

  const handleLogin = () => {
    alert('logged in')
  }

  const handleSignup = () => {
    alert('signed up')
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

  const redirectLogin = () => {
    setLogin(true)
  }

  const redirectSignup = () => {
    setLogin(false)
  }


  return (
    <Modal
      header={(<React.Fragment>
        <button id='login-header' className={showLogin ? 'underline-label' : ''} onClick={redirectLogin}>LOGIN</button>
        <span>&nbsp;/&nbsp;</span>
        <button id='signup-header' className={showLogin ? '' : 'underline-label'} onClick={redirectSignup}>SIGNUP</button>
      </React.Fragment>)}
      content={showLogin ? loginForm : signupForm}
    >
    </Modal>
  )
}
