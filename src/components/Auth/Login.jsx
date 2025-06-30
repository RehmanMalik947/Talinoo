import React, { useState } from 'react'
import "../../assets/css/login.css"
function Login() {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [RemeberMe,setRemberMe]=useState("false")
    const handleLogin=()=>{
        console.log("login")
    }
  return (
    <>
    <div className="login-container">
        <div className='login-card'>
            <div className='logo-section'>
                <img src='talinoo.svg'/>
            </div>

            {/* title */}
            <div className='welcome-title'><h1>Welcome Back</h1></div>

            {/* form */}
            <div className='form-container'>
                {/* email */}
                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email or UserName</label>
                    <input  className='form-input' id="email" type='text' placeholder='Enter your email or username' onChange={(e)=>setEmail(e.target.value)}/>
                </div>

                {/* email */}
                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input  className='form-input' id="password" type='password' placeholder='Enter your password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
            </div>

            {/* RemeberMe Checkbox     */}
            <div className='checkbox-container'>
                <input
                id='remember-me'
                type='checkbox'
                className='checkbox'
                onChange={(e)=>setRemberMe(e.target.checked)}
                />
                <label htmlFor='remeber-me' className='checkbox-label'>
                    Remember Me
                </label>
            </div>
            <div className='forgot-password'>
                <button className='forgot-link'>
                    Forgot password?
                </button>
            </div>

            {/* login button */}
            <button className='login-button' onClick={handleLogin}>
                Login
            </button>
        </div>
       

    </div>
    </>
  )
}
export default Login