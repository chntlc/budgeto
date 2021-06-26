import React, { useState } from 'react'
import Modal from './Modal'
import '../css/Settings.css'
import { updateUser, toggleSettingsModal } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'

function Settings(props) {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    id: props.user.id,
    fname: props.user.fname,
    lname: props.user.lname,
    budget: props.user.budget,
    email: props.user.email,
  })

  const handleSettingChange = (event) => {
    event.preventDefault();

    let id = user.id;
    let fname = user.fname;
    let lname = user.lname;
    let budget = user.budget;
    let email = user.email;

    dispatch(updateUser({id, fname, lname, budget, email}));
    alert('Setting Changed!')
  }

  const handleChange = (event) => {
    const { id, value } = event.target;

    setUser(prevUser => {
      return {
        ...prevUser,
        [id]: value
      };
    });
  }

  const closeSettingsModal = () => {
    dispatch(toggleSettingsModal(''))
  }

  // props.localUser.id
  const profileForm =
    <form className='signup-form'>
      <label>ID</label>
      <input type="text" id="id" value={user.id} onChange={handleChange}/>
      <label>First Name</label>
      <input type="text" id="fname" value={user.fname} onChange={handleChange}/>
      <label>Last Name</label>
      <input type="text" id="lname" value={user.lname} onChange={handleChange}/>
      <label>Budget</label>
      <input type="number" id="budget" value={user.budget} onChange={handleChange}/>
      <label>Email</label>
      <input type="email" id="email" value={user.email} onChange={handleChange}/>
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
    user: state.global.user
  }
}

export default connect(mapStateToProps)(Settings);
