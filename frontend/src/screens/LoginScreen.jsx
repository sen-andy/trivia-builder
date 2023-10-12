import { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginScreen.css'

const LoginScreen = () => {
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='col center'>
            <div id='login-form' className='light-border-bg col gap-1'>
                <h1>Sign In</h1>

                <form className='col gap-1' onSubmit={submitHandler}>
                    <div className='col'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Sign In</button>
                    <div className='row'>
                        <p>New Customer? </p>
                        <Link to="/register">Register</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginScreen;