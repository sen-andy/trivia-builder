import { useState } from 'react';
import { Link } from 'react-router-dom';
import './loginScreen.css'

const RegisterScreen = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPW, setConfirmPW ] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='col center'>
            <div id='login-form' className='light-border-bg col gap-1'>
                <h1>Sign Up</h1>

                <form className='col gap-1' onSubmit={submitHandler}>
                <div className='col'>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            placeholder='Enter Full Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
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
                    <div className='col'>
                        <label htmlFor="password">Confirm Password</label>
                        <input
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPW}
                            onChange={e => setConfirmPW(e.target.value)}
                        />
                    </div>
                    <button type='submit'>Sign Up</button>
                    <div className='row'>
                        <p>Have an account? </p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen;