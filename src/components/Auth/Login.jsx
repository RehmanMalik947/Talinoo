import React from 'react'
import "../../assets/css/login.css"
function Login() {
  return (
    <>
    <div className="login-container">
        <div className='login-card'>
            <div className='logo-section'>
                <img src='brand.png'/>
            </div>

            {/* title */}
            <div className='welcome-title'><h1>Welcome Back</h1></div>

            {/* form */}
            <div className='form-container'>
                {/* email */}
                <div className='form-group'>
                    <label className='form-label' htmlFor='email'>Email or UserName</label>
                    <input  className='form-input' id="email" type='text' placeholder='Enter your email or username'/>
                </div>
                {/* email */}
                <div className='form-group'>
                    <label className='form-label' htmlFor='password'>Password</label>
                    <input  className='form-input' id="password" type='password' placeholder='Enter your password'/>
                </div>
            </div>

            {/* RemeberMe Checkbox     */}
            <div className='checkbox-container'>
                

            </div>
        </div>
       

    </div>
    </>
  )
}

export default Login