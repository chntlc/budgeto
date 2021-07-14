import React, { useState } from 'react'
import Modal from './Modal'
import '../css/Settings.css'
import { updateUser, toggleSettingsModal } from "../features/globalSlice";
import { connect, useDispatch } from 'react-redux'

function Settings(props) {
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    _id: props.user._id,
    fname: props.user.fname,
    lname: props.user.lname,
    budget: props.user.budget,
    email: props.user.email,
  })

  async function handleSettingChange(event) {
    event.preventDefault();

    const password = document.getElementById("password").value;
    const password2 = document.getElementById("password2").value;

    console.log("password: ", password);
    console.log("password2: ", password2);

    if ( password !== password2) {
      alert("Password do not match!");
    } else {
      const _id = user._id;
      const fname = user.fname;
      const lname = user.lname;
      const budget = user.budget;
      const email = user.email;

      const updatedUser = {
        _id: _id,
        fname: fname,
        lname: lname,
        budget: budget,
        email: email,
        password: password
      };

      await fetch('/users/settings', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedUser),
      })
        .then(res => res.json())
        .then(res => {
          console.log("Updated User: ", res);

          setUser(res);
          dispatch(updateUser({fname, lname, budget, email}));
          alert('Settings Changed!');
        });

    }
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

  const profileForm =
    <form className='signup-form'>
      <label>First Name</label>
      <input type="text" id="fname" value={user.fname} onChange={handleChange}/>
      <label>Last Name</label>
      <input type="text" id="lname" value={user.lname} onChange={handleChange}/>
      <label>Budget</label>
      <input type="number" id="budget" value={user.budget} onChange={handleChange}/>
      <label>Email</label>
      <input type="email" id="email" value={user.email} onChange={handleChange}/>
      <label>Password</label>
      <input type="password" id="password"/>
      <label>Confirm Password</label>
      <input type="password" id="password2"/>
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
