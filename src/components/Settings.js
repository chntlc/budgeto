import React from 'react'
import Modal from './Modal'
import '../css/LoginSignup.css'
import { toggleSettingsModal } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'

function Settings(props) {
  const dispatch = useDispatch()

  const handleSettingChange = () => {
    alert('Setting has been changed!')
  }

  const closeSettingsModal = () => {
    dispatch(toggleSettingsModal(''))
  }

  const profileForm =
    <form className='signup-form'>
      <label>First Name</label>
      <input />
      <label>Last Name</label>
      <input />
      <label>Budget</label>
      <input />
      <label>Email</label>
      <input />
      <label>Password</label>
      <input type='password' />
      <label>Confirm Password</label>
      <input type='password' />
      <button className='setting-submit-button' onClick={handleSettingChange}>Confirm</button>
    </form>

  return (
    <Modal
      content={props.showSettings === 'settings' ? profileForm : profileForm}
      onClose={closeSettingsModal}
    >
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    showSettings: state.global.showSettingsModal,
    user: state.global.user
  }
}

export default connect(mapStateToProps)(Settings);
