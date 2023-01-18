import { useState } from "react";
// import "./index.css"
import { useContext } from "react";
import userContext from "./userContext";
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom';
import { store } from "./index";
import { loginApi } from '././Api/route'
import image from "./image.jpg"
import { FormControl, InputLabel, OutlinedInput, TextField } from "@mui/material";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';


const Login = (props) => {
    const ctx = useContext(userContext);
    const [username, setusername] = useState('');
    const [password, setpassword] = useState('');
    const [userisvalid, setuserisvalid] = useState(true);
    const [passisvalid, setpassisvalid] = useState(true);
    // const [user,setUser]
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const navigate = useNavigate();
    const userchange = (e) => {
        setusername(e.target.value);
        setuserisvalid(true);
    }
    const passchange = (e) => {
        setpassword(e.target.value);
        setpassisvalid(true);
    }

    const submithandler = async () => {
        setuserisvalid(username.trim() !== '');
        setpassisvalid(password.trim() !== '');
        login();
    }


    const login = async () => {
        const out = await loginApi({ username: username, password: password })
        console.log(out);
        if (out.statusCode == 200) {
            store.dispatch({
                type: 'SETDETAILS',
                payload: {
                    username: out.nameuser,
                    id: out.id
                }
            });
            console.log(out)
            if (out.userRole == "admin") {
                navigate('/admin/home');
            }
            else {
                if (out.contains) {
                    navigate('/listing');
                }
                else {
                    navigate('/products');
                }
            }
        }
        else if (out.response.data.statusCode == 400) {
            swal({
                text: out.response.data.message,
                icon: "error",
                type: "error"
            });
        }
    }

    store.getState();
    const logifn = () => {
        console.log('login fn');
        //const res = await 
        // axios.post('http://localhost:2000/login', {
        //     username: username,
        //     password: password,
        // }).then((res) => {
        //     store.dispatch({
        //         type: 'SETDETAILS',
        //         payload: {
        //             username: res.data.nameuser,
        //             id: res.data.id
        //         }
        //     });
        // localStorage.setItem('token', res.data.token);
        // localStorage.setItem('user_id', res.data.id);
        // localStorage.setItem('username', res.data.nameuser)
        // if (res.data.contains) {
        //     // const name = res.data.products[0].productname;
        //     // window.location.href = '/listing/';
        //     navigate('/listing');
        // }
        // else {
        //     // window.location.href = '/products';
        //     navigate('/products');
        // }
        // }).catch((err) => {
        //     if (err.response && err.response.data && err.response.data.errorMessage) {
        //         swal({
        //             text: err.response.data.errorMessage,
        //             icon: "error",
        //             type: "error"
        //         });
        //     }
        // });
    }



    return (<div>
        <div>
            <h1 className='heading'>Welcome Back</h1>
        </div>
        <div id='first'>
            <form>
                <input id="dabba" placeholder="&nbsp;Username" name="username" value={username} onChange={userchange} type="text" /><br />
                {!userisvalid && <span id="err">Please enter Username</span>}
                <input id="dabba" placeholder="&nbsp;Password" name="password" value={password} onChange={passchange} type="password" /><br />
                {!passisvalid && <span id="err">Please enter Password</span>}
                
            </form><br />
            <a href='/forget' id='forget'>Forget Password?</a>
            <button id='button' onClick={submithandler}>Log In</button>
            <p id='signupnew' >Don't have an account?&nbsp;&nbsp;<a href='/Register'>Sign Up</a></p>
        </div>
        <div id='image'>
            <img src={image} alt="Logo" />
        </div>
    </div>)
}

export default Login;