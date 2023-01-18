import React, { useEffect, useState } from "react";
import ReactDOM from 'react-dom';
import image from "./image.jpg"
// import "./index.css"

const Forget = () => {


    return (
        <div>
            <div><div>
                <h1 className='heading'>Forget password</h1>
            </div>
                <div id='first'>
                    <form>
                        <input id="dabba" placeholder="&nbsp;Mobile" name="mobile"  type="text" /><br />
                        
                        <input id="dabba" placeholder="&nbsp;Password" name="password"  type="password" /><br />

                        <input id="dabba" placeholder="&nbsp;Confirm Password" name="confirmpassword"  type="password" /><br />
                        
                    </form><br />
                    <button id='button' >Change Password</button>
                </div>
            </div>
            <div id='image'>
                <img src={image} alt="Logo" />
            </div>
        </div>
    )
}


export default Forget;