import React from 'react'
import Modal from './Modal'
import '../css/LoginSignup.css';

export default function LoginSignup() {

  // TODO: determine if login or signup
  const isLogin = true;

  const redirectLogin = () => {
    alert('swtich to signup')
  }

  const redirectSignup = () => {
    alert('swtich to login')
  }

  return (
    <Modal
      header={(<React.Fragment>
        <button id='login-header' className={isLogin ? 'underline-label' : ''} onClick={redirectLogin}>LOGIN</button>
        <span>&nbsp;/&nbsp;</span>
        <button id='signup-header' className={isLogin ? '' : 'underline-label'} onClick={redirectSignup}>SIGNUP</button>
      </React.Fragment>)}
      content={(<form className='login-form'>
        <label>Email</label>
        <input />
        <label>Password</label>
        <input type='password' />
        <button className='login-submit-button'>GO!</button>
      </form>)}
    >
    </Modal>
  )
}
