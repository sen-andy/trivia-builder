import { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
    const [ name, setName ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ confirmPW, setConfirmPW ] = useState("");

    const submitHandler = async (e) => {
        e.preventDefault();
    }

    return (
        <div className='container mx-auto flex justify-center items-center'>
            <div className='light-border-bg col gap-4 w-full max-w-lg'>
                <h1>Sign Up</h1>

                <form className='col gap-4 [&>div]:gap-2' onSubmit={submitHandler}>
                    <div className='col'>
                        <label htmlFor="name">Full Name</label>
                        <input
                            className='input'
                            type="text"
                            placeholder='Enter Full Name'
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor="email">Email Address</label>
                        <input
                            className='input'
                            type="email"
                            placeholder='Enter Email'
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor="password">Password</label>
                        <input
                            className='input'
                            type="password"
                            placeholder='Enter Password'
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div className='col'>
                        <label htmlFor="confirmPW">Confirm Password</label>
                        <input
                            className='input'
                            type="password"
                            placeholder='Confirm Password'
                            value={confirmPW}
                            onChange={e => setConfirmPW(e.target.value)}
                        />
                    </div>
                    <button className='btn-blue' type='submit'>Sign Up</button>
                    <div className='flex'>
                        <p>Have an account?</p>
                        <Link to="/login">Login</Link>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default RegisterScreen;