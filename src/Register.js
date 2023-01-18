import React, { useEffect, useState } from "react";
import image from "./image.jpg"
import swal from 'sweetalert'
import axios from 'axios';

const Register = () => {

  const [username, setusername] = useState('');
  const [password, setpassword] = useState('');
  const [mobile, setmobile] = useState('');
  const [email, setemail] = useState('');
  const [confirmpassword, setconfirmpassword] = useState('');
  const [mobileisvalid, setmobileisvalid] = useState(true);
  const [userisvalid, setuserisvalid] = useState(true);
  const [passisvalid, setpassisvalid] = useState(true);
  const [emailisvalid, setemailisvalid] = useState(true);
  const [confirmisvalid, setconfirmisvalid] = useState(true);

  const userchange = (e) => {
    setusername(e.target.value);
    setuserisvalid(true);
  }
  const passchange = (e) => {
    setpassword(e.target.value);
    setpassisvalid(true);
  }

  const mobilechange = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      setmobile(e.target.value);
      setmobileisvalid(true);
    }

  }
  const emailchange = (e) => {
    setemail(e.target.value);
    setemailisvalid(true);
  }
  const confirmchange = (e) => {
    setconfirmpassword(e.target.value);
    setconfirmisvalid(true);
  }


  const number = (e) => {
    const re = /^[0-9\b]+$/;
    if (e.target.value === '' || re.test(e.target.value)) {
      this.setState({ [e.target.name]: e.target.value })
    }
  }

  const submithandler = () => {
    setuserisvalid(username.trim() !== '');
    setmobileisvalid(mobile.trim() !== '');
    setemailisvalid(email.trim() !== '');
    setconfirmisvalid(confirmpassword.trim() !== '');
    setpassisvalid(password.trim() !== '');
    register();
  }

  const register = () => {
    axios.post('http://localhost:2000/register', {
      username: username,
      password: password,
      mobile: mobile,
      email: email
    }).then((res) => {
      swal({
        text: res.data.title,
        icon: "success",
        type: "success"
      });
      window.location.href = '/';
    }).catch((err) => {
      swal({
        text: err.response.data.errorMessage,
        icon: "error",
        type: "error"
      });
    });
  }
  return (<div>
    <div>
      <h1 className='heading'>Create Account</h1>
    </div>
    <div id='first'>
      <form>
        <input id="dabba" onChange={userchange} value={username} name="username" placeholder="&nbsp;Username" type="text" /><br />
        {!userisvalid && <span id="err">Please enter Username</span>}
        <input id="dabba" onChange={emailchange} value={email} name="email" placeholder="&nbsp;Email" type="email" /><br />
        {!emailisvalid && <span id="err">Please enter Email</span>}
        <input id="dabba" onChange={mobilechange} value={mobile} name="mobile" placeholder="&nbsp;Mobile Number" type="text" /><br />
        {!mobileisvalid && <span id="err">Please enter Mobile Number</span>}
        <input id="dabba" onChange={passchange} value={password} name="password" placeholder="&nbsp;Password" type="password" /><br />
        {!passisvalid && <span id="err">Please enter Password</span>}
        <input id="dabba" onChange={confirmchange} value={confirmpassword} name="confirmpassword" placeholder="&nbsp;Confirm Password" type="password" />
        {!confirmisvalid && <span id="err">Please confirm your Password</span>}
      </form>
      <button onClick={submithandler} id='button'>Sign Up</button>
      <p id='signupnew' >Already have an account?&nbsp;&nbsp;<a href='/'>Login</a></p>
    </div>
    <div id='image'>
      <img src={image} alt="Logo" />
    </div>
  </div>)
}

export default Register;