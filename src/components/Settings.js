import React from 'react'
import Modal from './Modal'
import '../css/Settings.css'
import { updateUser, updateLocalUser, toggleSettingsModal } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'

function Settings(props) {
  const dispatch = useDispatch()

  const handleSettingChange = (event) => {
    event.preventDefault();

    let id = document.getElementById('id').value
    let fname = document.getElementById('fname').value
    let lname = document.getElementById('lname').value
    let budget = document.getElementById('budget').value
    let email = document.getElementById('email').value

    dispatch(updateUser({id, fname, lname, budget, email}));
    alert('Setting Changed!')
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    dispatch(updateLocalUser({id, value}));
  }

  const closeSettingsModal = () => {
    dispatch(toggleSettingsModal(''))
  }

  const profileForm =
    <form className='signup-form'>
      <label>ID</label>
      <input type="text" id="id" value={props.localUser.id} onChange={handleChange}/>
      <label>First Name</label>
      <input type="text" id="fname" value={props.localUser.fname} onChange={handleChange}/>
      <label>Last Name</label>
      <input type="text" id="lname" value={props.localUser.lname} onChange={handleChange}/>
      <label>Budget</label>
      <input type="number" id="budget" value={props.localUser.budget} onChange={handleChange}/>
      <label>Email</label>
      <input type="email" id="email" value={props.localUser.email} onChange={handleChange}/>
      <label>Password</label>
      <input type="password" />
      <label>Confirm Password</label>
      <input type="password" />
      <button className="setting-submit-button" onClick={handleSettingChange}>Confirm</button>
    </form>

  return (
    <Modal
      content={props.showSettings === "settings" ? profileForm : profileForm}
      onClose={closeSettingsModal}
    >
    </Modal>
  )
}

const mapStateToProps = (state) => {
  return {
    showSettings: state.global.showSettingsModal,
    user: state.global.user,
    localUser: state.global.localUser,
  }
}

export default connect(mapStateToProps)(Settings);
